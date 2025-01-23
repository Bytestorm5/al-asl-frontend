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
    audienceId: "95ee5756-438e-4cbc-b985-913056e03827",
  });
}
