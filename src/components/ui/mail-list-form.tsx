"use client";

import { cn } from "@/lib/utils";
import { mailListFormSchema, MailListFormValues } from "@/types/maillist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { addToMailList } from "@/actions/email";
import { useState } from "react";

interface Props {
  className?: string;
}

export function MailingListForm({ className }: Props) {
  const form = useForm<MailListFormValues>({
    resolver: zodResolver(mailListFormSchema),
  });

  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState("Sign up!");

  const onSubmit = async (values: MailListFormValues) => {
    if (submitted) return;
    setButtonText("Signing up...");

    await addToMailList(values);

    setSubmitted(true);
    setButtonText("Thank you!");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-row items-center space-x-8", className)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First Name"
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Last Name"
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          disabled={submitted}
          className={cn(
            "inline-flex items-center justify-center rounded-md border px-6 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
            {
              "animate-shimmer border-gray-300 bg-[linear-gradient(110deg,#ffffff,45%,#f0f0f0,55%,#ffffff)] bg-[length:200%_100%] text-gray-700 focus:ring-gray-400 focus:ring-offset-white":
                !submitted,
              "cursor-not-allowed border-gray-200 bg-gray-200 text-gray-400":
                submitted,
            },
          )}
        >
          {buttonText}
        </button>
      </form>
    </Form>
  );
}
