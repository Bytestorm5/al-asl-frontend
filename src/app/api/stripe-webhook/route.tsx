import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import WelcomeEmail from "../../../../emails/welcome";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return new Response("No signature", {
      status: 400,
    });
  }

  const bodyString = await request.text();

  const stripeEvent = stripe.webhooks.constructEvent(
    bodyString,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  switch (stripeEvent.type) {
    case "payment_intent.succeeded": {
      const eventData = stripeEvent.data.object;

      const registrationId = eventData.metadata.registrationId!;

      const registration = await prisma.registrations.findFirst({
        where: {
          id: registrationId,
        },
      });

      if (!registration) {
        return new Response("Registration not found", {
          status: 404,
        });
      }

      await prisma.registrations.update({
        where: {
          id: registrationId,
        },
        data: {
          paymentStatus: "complete",
        },
      });

      const { error } = await resend.emails.send({
        from: "Azharul Jannah <mail@updates.azharuljannah.com>",
        to: registration.email,
        subject: "Azharul Jannah Registration",
        react: <WelcomeEmail />,
      });

      if (error) console.log(error);

      break;
    }
    default: {
      console.log("Unhandled event", stripeEvent.type);
    }
  }

  return new NextResponse("", {
    status: 200,
  });
}
