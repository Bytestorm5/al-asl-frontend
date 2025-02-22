"use client";

import React, { useState, useEffect } from "react";
import { getOpenClasses } from "@/actions/db";
import PrimaryButton from "@/components/ui/primary-button";
import { MailingListForm } from "@/components/ui/mail-list-form";
import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useLanguage } from "@/components/ui/LanguageContext";
import { Course } from "@/actions/moodleTypes";
import { Noto_Nastaliq_Urdu } from "next/font/google";

const nastaliq = Noto_Nastaliq_Urdu({subsets: ["arabic"]})

export default function Home() {
  
  const { currentLanguage: lang } = useLanguage();
  // currentLanguage is already typed as "EN" | "UR"
  const [openClasses, setOpenClasses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchClasses() {
      const classes = await getOpenClasses();
      setOpenClasses(classes || []);
    }
    fetchClasses();
  }, []);

  // Define the translations object for static text
  const T: Record<"EN" | "UR", {
    verseArabic: string;
    verseTrans: string;
    viewCourses: string;
    welcome: string;
    welcomeParagraph: string;
    learnMore: string;
    coursesHeader: string;
    courses: string[];
    courseCatalogTitle: string;
    courseCatalogDescription: string;
    joinForUpdates: string;
    joinForUpdatesParagraph: string;
  }> = {
    EN: {
      verseArabic:
        "أَلَمْ تَرَ كَيْفَ ضَرَبَ ٱللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِى ٱلسَّمَآءِ ٢٤",
      verseTrans:
        '"Do you not see how Allah compares a good word to a good tree? Its root is firm and its branches reach the sky," (14:24)',
      viewCourses: "View Courses",
      welcome: "Welcome",
      welcomeParagraph:
        'ألأصل is an institute dedicated to rediscovering the roots of our faith and culture through the language of Urdu. Inspired by the profound message in Surah Ibrahim (14:24), where a "good word" is likened to a tree with firm roots and flourishing branches, ألأصل aims to nurture a deep and lasting connection to the Quran and Islamic teachings.',
      learnMore: "Learn more",
      coursesHeader:
        "We have courses in a variety of different topics, from foundation basics to advanced content.",
      courses: [
        "Tajweed",
        "Qira'at",
        "Tasweeb",
        "Adaab",
        "Arabic Language",
        "Hadith",
        "Matun",
        "Youth Topics",
      ],
      courseCatalogTitle: "Course Catalog",
      courseCatalogDescription: "View our full list of courses here:",
      joinForUpdates: "Join for Updates!",
      joinForUpdatesParagraph:
        "Sign up with your name and email address to learn when course registration opens and receive notifications for monthly lectures to inspire you.",
    },
    UR: {
      verseArabic:
        "أَلَمْ تَرَ كَيْفَ ضَرَبَ ٱللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِى ٱلسَّمَآءِ ٢٤",
      verseTrans: "کیا تم دیکھتے نہیں ہو کہ اللہ نے کلمہ طیّبہ کو کس چیز سے مثال دی ہے؟ اِس کی مثال ایسی ہے جیسے ایک اچھی ذات کا درخت جس کی جڑ زمین میں گہری جمی ہوئی ہے اور شاخیں آسمان تک پہنچی ہوئی ہیں, (14:24)",
      viewCourses: "کورسز دیکھیں",
      welcome: "خوش آمدید",
      welcomeParagraph:
        'ألأصل ایک ادارہ ہے جو ہماری مذہبی اور ثقافتی جڑوں کی بازیافت کے لیے اردو زبان کے ذریعے کام کرتا ہے۔ سورۃ ابراہیم (14:24) میں بیان کردہ اس گہرے پیغام سے متاثر ہو کر، جہاں "اچھے کلمے" کو ایک ایسے درخت سے تشبیہ دی گئی ہے جس کی جڑیں مضبوط ہوں اور شاخیں پھیلی ہوئی ہوں، ألأصل کا مقصد قرآن اور اسلامی تعلیمات کے ساتھ ایک گہرا اور پائیدار رشتہ قائم کرنا ہے۔',
      learnMore: "مزید جانیں",
      coursesHeader:
        "ہمارے پاس مختلف موضوعات پر کورسز ہیں، بنیادی باتوں سے لے کر اعلیٰ سطحی مواد تک۔",
      courses: [
        "تجوید",
        "قراءات",
        "تصویب",
        "آداب",
        "عربی زبان",
        "حدیث",
        "متون",
        "نوجوانوں کے موضوعات",
      ],
      courseCatalogTitle: "کورس کیٹلاگ",
      courseCatalogDescription: "یہاں ہماری مکمل کورس لسٹ دیکھیں:",
      joinForUpdates: "اپ ڈیٹس کے لیے شامل ہوں!",
      joinForUpdatesParagraph:
        "اپنا نام اور ای میل ایڈریس درج کریں تاکہ آپ کو کورس رجسٹریشن کے کھلنے کا پتہ چلے اور ماہانہ لیکچرز کی اطلاع موصول ہو جو آپ کو متاثر کریں۔",
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <AuroraBackground className="flex h-[412px] w-screen flex-col items-center justify-between px-12 py-11">
        <span className={"text-center text-2xl text-secondary-dark sm:text-4xl " + (lang == "UR" ? nastaliq.className : "")}>
          {T[lang].verseArabic}
        </span>
        <span className="mt-2 text-lg text-secondary sm:text-2xl text-center">
          {T[lang].verseTrans}
        </span>
        <div className="my-2 flex flex-row items-center gap-36">
          <PrimaryButton
            asLink
            className="z-10 rounded-md asl-gradient px-6 py-4 text-sm text-white font-semibold"
            href="/courses"
          >
            {T[lang].viewCourses}
          </PrimaryButton>
        </div>
      </AuroraBackground>
      <div className="flex w-full flex-col items-start asl-gradient-static px-12 py-11">
        <span className="text-xl font-semibold text-white">
          {T[lang].welcome}
        </span>
        <p className="mt-8 max-w-3xl text-lg font-light text-white">
          {T[lang].welcomeParagraph}
        </p>
        <Link
          href="/about"
          className="mt-8 inline-flex animate-shimmer items-center justify-center rounded-md border border-gray-300 bg-white bg-[linear-gradient(110deg,#ffffff,45%,#f0f0f0,55%,#ffffff)] bg-[length:200%_100%] px-6 py-2 font-medium text-gray-700 text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
        >
          {T[lang].learnMore}
        </Link>
      </div>
      <div className="flex w-full flex-col items-center bg-primary-dark py-20">
        <span className="max-w-3xl text-center text-2xl text-secondary-dark sm:text-4xl">
          {T[lang].coursesHeader}
        </span>
        <div className="mt-24 grid grid-flow-row grid-cols-4 gap-12 sm:gap-24">
          {T[lang].courses.map((course, idx) => (
            <span
              key={idx}
              className="text-center text-lg text-secondary-dark sm:text-2xl"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center bg-secondary-dark px-12 py-11 md:justify-between">
        <Image
          src="/images/quran1.jpg"
          height={245}
          width={366}
          alt="Quran"
          className="hidden lg:block"
        />
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl font-medium text-white">
            {T[lang].courseCatalogTitle}
          </span>
          <span className="mt-4 text-xl font-light text-white">
            {T[lang].courseCatalogDescription}
          </span>
          <hr className="my-6 w-full bg-primary" />
          <div className="flex flex-col items-center gap-4">
            <PrimaryButton
              asLink
              className="z-10 rounded-md bg-gray-300 hover:bg-gray-100 px-6 py-4 text-sm text-secondary-dark font-semibold"
              href="/courses"
            >
              {T[lang].courseCatalogTitle}
            </PrimaryButton>
          </div>
        </div>
        <Image
          src="/images/quran2.jpg"
          height={245}
          width={366}
          alt="Quran"
          className="hidden md:block"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-primary px-10 py-12">
        <span className="text-3xl text-secondary-dark">
          {T[lang].joinForUpdates}
        </span>
        <span className="mt-2 max-w-4xl text-center text-secondary-dark">
          {T[lang].joinForUpdatesParagraph}
        </span>
        <hr className="my-4 h-[2px] w-full bg-black opacity-20" />
        <MailingListForm />
      </div>
    </main>
  );
}
