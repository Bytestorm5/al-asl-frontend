"use client"

import { ContactForm } from "@/components/ui/contact-form";
import { Language, useLanguage } from "@/components/ui/LanguageContext";
import PrimaryButton from "@/components/ui/primary-button";

export default function ContactPage() {
  const { currentLanguage: lang } = useLanguage();
  const T: Record<Language, {
    title: string;
    blurb: string;
    button: string;
  }> = {
    EN: {
      title: "Contact Us",
      blurb: "You can join our WhatsApp channel below:",
      button: "Join WhatsApp",
    },
    UR: {
      title: "ہم سے رابطہ کریں",
      blurb: "آپ نیچے موجود ہمارے WhatsApp چینل میں شامل ہو سکتے ہیں:",
      button: "WhatsApp میں شامل ہوں",
    },
  };  
  return (
    <main className="flex min-h-screen flex-col items-center px-8 py-12">
      <h1 className="mb-8 text-4xl font-bold text-secondary-dark">
        {T[lang].title}
      </h1>
      <p className="mb-8 max-w-2xl text-center text-lg text-secondary">
        {T[lang].blurb}
      </p>
      <PrimaryButton
        asLink
        className="z-10 rounded-md asl-gradient px-6 py-4 text-sm text-white font-semibold"
        href="https://www.whatsapp.com/channel/0029Vb32vMx6xCSGjYpIvq1B"
      >
          {T[lang].button}
      </PrimaryButton>
    </main>
  );
}
