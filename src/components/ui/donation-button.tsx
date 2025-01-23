"use client";

import { ButtonHTMLAttributes } from "react";
import PrimaryButton from "./primary-button";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function DonationButton({ className, ...props }: Props) {
  return (
    <PrimaryButton
      name="donation"
      onClick={() => open("https://donorbox.org/mathaniyy-2024")}
      className={cn(
        className,
        "font-semibold uppercase tracking-widest",
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:bg-secondary-dark hover:text-white hover:shadow-lg",
      )}
      {...props}
    >
      Donation
    </PrimaryButton>
  );
}
