"use client";

import routes from "@/constants/routes";
import socials from "@/constants/socials";
import useInterfaceStore from "@/store/interface";
import { cn } from "@/lib/cn";
import Link from "next/link";
import Social from "./social";
import DonationButton from "./donation-button";

export default function MenuOverlay() {
  const { menuBarOpen, setMenuBarOpen } = useInterfaceStore();

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-10 flex h-screen w-full transform bg-primary px-10 pt-24 transition-all delay-100 duration-300",
        {
          "translate-x-0 opacity-100": menuBarOpen,
          "-translate-x-full opacity-0": !menuBarOpen,
        },
      )}
    >
      <ul className="flex flex-col gap-2">
        {routes.map(({ name, href }, idx) => (
          <li key={idx}>
            <Link
              className="text-nowrap text-2xl text-secondary-dark underline"
              href={href}
              onClick={() => setMenuBarOpen(false)}
            >
              {name}
            </Link>
          </li>
        ))}
        <div className="mt-4 flex flex-row items-center gap-3">
          <DonationButton />
          {socials.map((social) => (
            <Social key={social.name} {...social} />
          ))}
        </div>
      </ul>
    </nav>
  );
}
