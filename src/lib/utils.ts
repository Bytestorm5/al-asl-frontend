import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function targetNameToWord(target: "W" | "K", capitalize = false) {
  return capitalize
    ? target === "W"
      ? "Women"
      : "Kids"
    : target === "W"
      ? "women"
      : "kids";
}

export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
