import prisma from "@/lib/db";
import { registerFormSchema } from "@/types/register";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PaymentEmail from "../../../../emails/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  const body = registerFormSchema.parse(await request.json());

  const courseId = request.headers.get("x-course-id");
  const classId = request.headers.get("x-class-id");

  if (!courseId || !classId) {
    return new Response("Missing course or class ID", {
      status: 400,
    });
  }

  const cls = await prisma.classes.findFirst({
    where: {
      id: classId,
    },
  });

  if (!cls) {
    return new Response("Class not found", {
      status: 404,
    });
  }

  const course = cls.courses.find((course) => course.id === courseId);

  if (!course) {
    return new Response("Course not found", {
      status: 404,
    });
  }

  if (!course.registrationOpen) {
    return new Response("Registration is closed", {
      status: 423,
    });
  }

  const exists = await prisma.registrations.findFirst({
    where: {
      email: body.email,
      classId,
    },
  });

  if (exists) {
    return new Response(
      "Already registered. Check email to complete registration.",
      {
        status: 409,
      },
    );
  }

  const registration = await prisma.registrations.create({
    data: {
      ...body,
      classId,
      courseId,
      paymentStatus: "pending",
    },
  });

  try {
    await resend.contacts.create({
      email: body.email,
      firstName: body.name.split(" ")[0],
      unsubscribed: false,
      audienceId: "95ee5756-438e-4cbc-b985-913056e03827",
    });
  } catch (error) {
    console.log(error);
  }

  if (body.paymentType === "payNow" && course.price > 0) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        registrationId: registration.id,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.name,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],

      customer_email: body.email,
      success_url: `${request.headers.get(
        "origin",
      )}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    });

    const { error } = await resend.emails.send({
      from: "Azharul Jannah <mail@updates.azharuljannah.com>",
      to: body.email,
      subject: "Azharul Jannah Registration",
      react: <PaymentEmail paymentMethod="payNow" paymentUrl={session.url!} />,
    });

    if (error) console.log(error);

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: session.url,
      }),
      {
        status: 201,
      },
    );
  } else if (body.paymentType === "contactForPayment") {
    const { error } = await resend.emails.send({
      from: "Azharul Jannah <mail@updates.azharuljannah.com>",
      to: body.email,
      subject: "Azharul Jannah Registration",
      react: <PaymentEmail paymentMethod="contactForPayment" />,
    });

    if (error) console.log(error);
  }

  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      status: 201,
    },
  );
}

export async function GET(req: NextRequest) {
  const sessionId: string = req.url.split("?session_id=")[1];

  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent"],
      });

    return new Response(JSON.stringify(checkoutSession));
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
    });
  }
}
