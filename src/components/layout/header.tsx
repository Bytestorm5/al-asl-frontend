import Social from "@/components/ui/social";
import socials from "@/constants/socials";
import useInterfaceStore from "@/store/interface";
import Link from "next/link";
import DonationButton from "../ui/donation-button";
import routes from "@/constants/routes";
import { cn } from "@/lib/cn";
import MenuBarToggle from "../ui/menubar-toggle";

const courses = [
  { name: "Courses for Women", href: "/courses/women" },
  { name: "Courses for Kids", href: "/courses/kids" },
];

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between px-16 py-12">
      <Link href="/">
        <img
          className="max-h-12 w-auto max-w-full"
          src="/images/header-banner.png"
        />
      </Link>
      <div className="hidden flex-row flex-wrap items-center justify-center gap-5 md:flex">
        {routes.map(({ name, href }, idx) => (
          <div key={idx} className="group/courses relative inline-block">
            <Link href={href} className="font-light text-secondary">
              {name}
            </Link>
            {name === "Courses" && (
              <div className="absolute z-10 hidden flex-col gap-1 rounded-sm bg-primary px-2 group-hover/courses:flex">
                {courses.map(({ name, href }, idx) => (
                  <Link
                    className="text-nowrap text-secondary-dark"
                    key={idx}
                    href={href}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hidden flex-row items-center gap-4 md:flex">
        {socials.map((social) => (
          <Social key={social.name} {...social} />
        ))}
        <DonationButton className="ml-3 hidden md:block" />
      </div>
      <MenuBarToggle />
    </header>
  );
}
