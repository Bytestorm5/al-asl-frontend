import { cn } from "@/lib/cn";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: boolean;
  href?: string;
};

export default function PrimaryButton({
  asLink,
  href,
  children,
  className,
  ...props
}: Props) {
  return asLink && href ? (
    <Link
      href={href}
      className={cn(
        "rounded-md bg-secondary px-6 py-4 text-sm text-white",
        className,
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      className={cn(
        "rounded-md bg-secondary px-6 py-4 text-sm text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
