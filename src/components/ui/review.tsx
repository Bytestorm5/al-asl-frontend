import type { Review } from "@/types/review";

export default function Review({ name, content }: Review) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="max-w-72 text-center text-base text-secondary-dark">
        {content}
      </span>
      <span className="text-sm font-light text-secondary-dark">{name}</span>
    </div>
  );
}
