import Link from "next/link";

interface Props {
  label: string;
  routes: Array<{ label: string; path: string }>;
}

export default function FooterSection({ label, routes }: Props) {
  return (
    <div className="flex flex-col items-start gap-4">
      <span className="text-sm font-medium text-white">{label}</span>
      <div className="flex flex-col items-start gap-2">
        {routes.map(({ label, path }, idx) => (
          <Link
            className="text-sm font-light text-primary underline"
            key={idx}
            href={path}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
