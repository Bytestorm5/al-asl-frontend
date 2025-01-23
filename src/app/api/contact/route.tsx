import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/types/contact";
import ContactEmail from "../../../../emails/contact";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    const { error } = await resend.emails.send({
      from: "Azharul Jannah Contact <contact@updates.azharuljannah.com>",
      to: "info@azharuljannah.com",
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      react: ContactEmail(validatedData),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
