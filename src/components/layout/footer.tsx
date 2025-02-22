"use client";

import socials from "@/constants/socials";
import Image from "next/image";
import Social from "@/components/ui/social";
import FooterSection from "../ui/footer-section";
import { useLanguage, translations, Language } from "../ui/LanguageContext";

export default function Footer() {
  const { currentLanguage: lang, setCurrentLanguage } = useLanguage();
  const T: Record<Language, {
    openCourses: string;
    courseCatalog: string;
    quickLinks: string;
    moreInfo: string;
  }> = {
    EN: {
      openCourses: "Open Courses",
      courseCatalog: "Course Catalog",
      quickLinks: "Quick Links",
      moreInfo: "More Info"
    },
    UR: {
      openCourses: "کھلے کورسز",
      courseCatalog: "کورس کیٹلاگ",
      quickLinks: "فوری روابط",
      moreInfo: "مزید معلومات"
    },
  };
  
  return (
    <footer className="flex flex-row justify-between bg-secondary-dark p-12">
      <div className="flex flex-col">
        <Image
          src="/images/logo-transparent.png"
          height={66}
          width={66}
          alt="Logo"
        />
        <div className="mt-4 flex flex-row items-center gap-4">
          {socials.map((social) => (
            <Social
              className="text-lg text-white"
              key={social.name}
              {...social}
            />
          ))}
        </div>
        <span className="mt-20 text-sm font-light text-white">
          © {new Date().getFullYear()} {lang === "EN" ? "Al-Asl, All Rights Reserved" : "العسل، جملہ حقوق محفوظ ہیں۔"}
        </span>
      </div>
      <div className="flex flex-row gap-20">
        <FooterSection
          label={T[lang].quickLinks}
          routes={[
            { label: translations[lang]["Home"], path: "/" },
            { label: translations[lang]["About"], path: "/about" },
            { label: T[lang].openCourses, path: "/courses/list" },
            { label: T[lang].courseCatalog, path: "/courses/catalog" },
          ]}
        />
        <FooterSection
          label={T[lang].moreInfo}
          routes={[
            { label: translations[lang]["Contact"], path: "/contact" },
            { label: translations[lang]["Terms of Use"], path: "/terms-of-use" },
            { label: translations[lang]["Privacy Policy"], path: "/privacy-policy" },
          ]}
        />
      </div>
    </footer>
  );
}
