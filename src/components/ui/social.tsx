import type { Social } from "@/types/social";
import { cn } from "@/lib/cn";

type Props = Social & {
  className?: string;
};

export default function Social({ name, url, icon, className }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      className={cn("text-base text-secondary-dark", className)}
      aria-label={name}
    >
      {icon}
    </a>
  );
}
