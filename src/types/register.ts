import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  number: z.string().min(1),
  nationality: z
    .string({
      required_error: "Please select a nationality.",
    })
    .min(1),
  country: z.string().min(1),
  firstTime: z.boolean().default(true),
  paymentType: z.enum(["payNow", "contactForPayment"]),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
