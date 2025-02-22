"use client";

import Social from "@/components/ui/social";
import socials from "@/constants/socials";
import Link from "next/link";
import DonationButton from "../ui/donation-button";
import routes from "@/constants/routes";
import { cn } from "@/lib/cn";
import MenuBarToggle from "../ui/menubar-toggle";
import { useLanguage } from "@/components/ui/LanguageContext";

type Language = "EN" | "UR";

export default function Header() {
  const { currentLanguage: lang, setCurrentLanguage } = useLanguage();

  // Translations for the header component
  const T: Record<Language, {
    switchLanguage: string;
    openCourses: string;
    courseCatalog: string;
  }> = {
    EN: {
      switchLanguage: "اردو",
      openCourses: "Open Courses",
      courseCatalog: "Course Catalog",
    },
    UR: {
      switchLanguage: "English",
      openCourses: "کھلے کورسز",
      courseCatalog: "کورس کیٹلاگ",
    },
  };

  const toggleLanguage = () => {
    setCurrentLanguage(lang === "EN" ? "UR" : "EN");
  };

  return (
    <header className="flex flex-row items-center justify-between px-16 py-4">
      <Link href="/">
        <img
          className="max-h-20 w-auto max-w-full"
          src="/images/header-banner.png"
          alt="Header Banner"
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
                <Link
                  className="text-nowrap text-secondary-dark"
                  href="/courses/list"
                >
                  {T[lang].openCourses}
                </Link>
                <Link
                  className="text-nowrap text-secondary-dark"
                  href="/courses/catalog"
                >
                  {T[lang].courseCatalog}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hidden flex-row items-center gap-4 md:flex">
        {socials.map((social) => (
          <Social key={social.name} {...social} />
        ))}
        <button
          onClick={toggleLanguage}
          className="ml-4 rounded border border-secondary px-3 py-1 text-sm text-secondary hover:bg-secondary hover:text-white"
        >
          {T[lang].switchLanguage}
        </button>
        <DonationButton className="ml-3 hidden md:block" />
      </div>
      <MenuBarToggle />
    </header>
  );
}
