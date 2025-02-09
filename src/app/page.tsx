import { getOpenClasses } from "@/actions/db";
import PrimaryButton from "@/components/ui/primary-button";
import Review from "@/components/ui/review";
import { MailingListForm } from "@/components/ui/mail-list-form";
import reviews from "@/constants/reviews";
import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Course } from "@/actions/moodleTypes";

export default async function Home() {
  const openClasses = await getOpenClasses() || [];
  console.log(openClasses)

  return (
    <main className="flex min-h-screen flex-col items-center">
      <AuroraBackground className="flex h-[412px] w-screen flex-col items-center justify-between px-12 py-11">
        <span className="text-center text-2xl text-secondary-dark sm:text-4xl">
        أَلَمْ تَرَ كَيْفَ ضَرَبَ ٱللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِى ٱلسَّمَآءِ ٢٤
        </span>
        <span className="mt-2 text-lg text-secondary sm:text-2xl">
        "Do you not see how Allah compares a good word to a good tree? Its root is firm and its branches reach the sky," (14:24)
        </span>
        <div className="my-2 flex flex-row items-center gap-36">
          <PrimaryButton
            asLink
            className="z-10 rounded-md asl-gradient px-6 py-4 text-sm text-white font-semibold"
            href="/courses"
          >
             View Courses
          </PrimaryButton>
        </div>
      </AuroraBackground>
      <div className="flex w-full flex-col items-start asl-gradient-static px-12 py-11">
        <span className="text-xl font-semibold text-white">Welcome</span>
        <p className="mt-8 max-w-3xl text-lg font-light text-white">ألأصل is an institute dedicated to rediscovering the roots of our faith and culture through the language of Urdu. Inspired by the profound message in Surah Ibrahim (14:24), where a "good word" is likened to a tree with firm roots and flourishing branches, ألأصل aims to nurture a deep and lasting connection to the Quran and Islamic teachings.</p>
        <Link
          href="/about"
          className="mt-8 inline-flex animate-shimmer items-center justify-center rounded-md border border-gray-300 bg-white bg-[linear-gradient(110deg,#ffffff,45%,#f0f0f0,55%,#ffffff)] bg-[length:200%_100%] px-6 py-2 font-medium text-gray-700 text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
        >
          Learn more
        </Link>
      </div>
      <div className="flex w-full flex-col items-center bg-primary-dark py-20">
        <span className="max-w-3xl text-center text-2xl text-secondary-dark sm:text-4xl">
        We have courses in a variety of different topics, from foundations basics to advanced content.
        </span>
        <div className="mt-24 grid grid-flow-row grid-cols-4 gap-12 sm:gap-24">
          {[
            "Tajweed",
            "Qira'at",
            "Tasweeb",
            "Adaab",
            "Arabic Language",
            "Hadith",
            "Matun",
            "Youth Topics"
          ].map((course, idx) => (
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
          <span className="text-4xl font-medium text-white">Course Catalog</span>
          <span className="mt-4 text-xl font-light text-white">
            View our full list of courses here:
          </span>
          <hr className="my-6 w-full bg-primary"></hr>
          <div className="flex flex-col items-center gap-4">
            <PrimaryButton
              asLink
              className="z-10 rounded-md bg-gray-300 hover:bg-gray-100 px-6 py-4 text-sm text-secondary-dark font-semibold"
              href="/courses"
            >
              Course Catalog
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
        <span className="text-3xl text-secondary-dark">Join for Updates!</span>
        <span className="mt-2 max-w-4xl text-center text-secondary-dark">
          Sign up with your name and email address to learn when course
          registration opens and receive notifications for monthly lectures to
          inspire you.
        </span>
        <hr className="my-4 h-[2px] w-full bg-black opacity-20"></hr>
        <MailingListForm />
      </div>
    </main>
  );
}
