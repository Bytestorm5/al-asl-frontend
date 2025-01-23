"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { countries } from "@/constants/countries";
import { cn } from "@/lib/utils";
import { registerFormSchema, RegisterFormValues } from "@/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassesCourses } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import PrimaryButton from "./primary-button";
import { RadioGroup, RadioGroupItem } from "./radio-group";

interface Props {
  className?: string;
  classId: string;
  course: ClassesCourses;
  buttonText?: string;
}

export default function RegistrationDialog({
  buttonText,
  classId,
  course,
}: Props) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstTime: true,
    },
  });

  const [pending, setPending] = useState(false);

  const onSubmit = async (values: RegisterFormValues) => {
    setPending(true);

    const res = await fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-course-id": course.id,
        "x-class-id": classId,
      },
    });

    if (res.ok) {
      const { paymentUrl } = await res.json();

      if (values.paymentType === "payNow") {
        window.location.href = paymentUrl;
      } else {
        alert("Registration successful");
      }
    } else {
      alert("Failed to register");
    }

    setPending(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="mt-2 rounded-md bg-secondary px-4 py-2 text-center text-sm font-medium text-white">
        {buttonText || `Register for ${course.name}`}
      </DialogTrigger>
      <DialogContent className="bg-primary">
        <DialogTitle>Register for {course.name}</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Email" id="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Name" id="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="number">Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter WhatsApp Number (With Country Code)"
                      id="number"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="nationality">Nationality</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="ml-4 w-[200px] justify-between"
                        >
                          {field.value
                            ? countries.find(
                                (country) => country === field.value,
                              )
                            : "Select nationality"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search nationality..." />
                        <CommandList>
                          <CommandEmpty>No nationality found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country, idx) => (
                              <CommandItem
                                value={country}
                                key={idx}
                                onSelect={() => {
                                  form.setValue("nationality", country);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {country}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="country">Country of Residence</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="ml-4 w-[200px] justify-between"
                        >
                          {field.value
                            ? countries.find(
                                (country) => country === field.value,
                              )
                            : "Select country"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country, idx) => (
                              <CommandItem
                                value={country}
                                key={idx}
                                onSelect={() => {
                                  form.setValue("country", country);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {country}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstTime">
                    Is this your first time participating in {course.name}?
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="firstTime"
                      className="ml-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="paymentType">Choice of Payment</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="payNow" />
                        </FormControl>
                        <FormLabel className="font-normal">Pay Now</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="contactForPayment" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Contact for Payment
                        </FormLabel>
                        <FormDescription>
                          We will contact you for payment details.
                        </FormDescription>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <PrimaryButton type="submit" disabled={pending}>
                {pending ? "Submitting..." : "Submit"}
              </PrimaryButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
