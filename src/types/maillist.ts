import { z } from "zod";

export const mailListFormSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
});

export type MailListFormValues = z.infer<typeof mailListFormSchema>;
