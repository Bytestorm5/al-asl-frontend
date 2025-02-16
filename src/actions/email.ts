"use server";

import { MailListFormValues } from "@/types/maillist";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function addToMailList({
  firstName,
  lastName,
  email,
}: MailListFormValues) {
  return await resend.contacts.create({
    email,
    firstName,
    lastName,
    unsubscribed: false,
    audienceId: "67c53857-bd80-4978-8319-74e8adcd1c0f",
  });
}
