import { getOpenClasses } from "@/actions/db";
import PrimaryButton from "@/components/ui/primary-button";
import Review from "@/components/ui/review";
import { MailingListForm } from "@/components/ui/mail-list-form";
import reviews from "@/constants/reviews";
import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default async function Home() {
  const openClasses = await getOpenClasses();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <AuroraBackground className="flex h-[412px] w-screen flex-col items-center justify-between px-12 py-11">
        <span className="max-w-[930px] text-center text-2xl text-secondary-dark sm:text-4xl">
          Azharul Jannah is an online learning platform for women and children
          around the world to improve and perfect their recitation of the Holy
          Quran
        </span>
        <span className="mt-2 text-lg text-secondary sm:text-2xl">
          Start your journey to the Qur&apos;an today
        </span>
        <div className="my-2 flex flex-row items-center gap-36">
          <PrimaryButton
            asLink
            className="z-10 rounded-md bg-secondary px-6 py-4 text-sm text-white"
            href="/courses/women"
          >
            Courses for Women
          </PrimaryButton>
          <PrimaryButton
            asLink
            className="z-10 rounded-md bg-secondary px-6 py-4 text-sm text-white"
            href="/courses/women"
          >
            Courses for Kids
          </PrimaryButton>
        </div>
      </AuroraBackground>
      <div className="flex w-full flex-col items-start bg-secondary px-12 py-11">
        <span className="text-xl font-light text-white">Our Vision</span>
        <p className="mt-8 max-w-3xl text-2xl font-light text-white sm:text-4xl">
          To empower others to continuously strive to perfect their Tajweed,
          Hifdh and Qira&apos;ah to reach Itqan with our unique E.A.S.E.
          approach to learning.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-flex animate-shimmer items-center justify-center rounded-md border border-gray-300 bg-white bg-[linear-gradient(110deg,#ffffff,45%,#f0f0f0,55%,#ffffff)] bg-[length:200%_100%] px-6 py-2 font-medium text-gray-700 text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
        >
          Learn more
        </Link>
      </div>
      <div className="flex w-full flex-col items-center bg-primary-dark py-20">
        <span className="max-w-3xl text-center text-2xl text-secondary-dark sm:text-4xl">
          We have courses for all levels, from beginners to advanced learners.
        </span>
        <div className="mt-24 grid grid-flow-row grid-cols-3 gap-12 sm:gap-24">
          {[
            "Recitation Courses",
            "Hifdh (Memorization) Courses",
            "Tajweed Courses",
            "Ijazah Courses",
            "Qira'at Courses",
            "Monthly Lectures",
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
          <span className="text-4xl font-medium text-white">Open Courses</span>
          <span className="mt-4 text-xl font-light text-white">
            Now Accepting Students for:
          </span>
          <hr className="my-6 w-full bg-primary"></hr>
          <div className="flex flex-col items-center gap-4">
            {openClasses.map(({ name, target }, idx) => (
              <Link
                key={idx}
                href={`/courses/${target === "W" ? "women" : "kids"}`}
                className="text-center text-xl font-light text-white"
              >
                {name}
              </Link>
            ))}
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
      <div className="flex w-full flex-col items-center bg-primary-dark py-16">
        <span className="text-2xl font-medium text-secondary-dark">
          Kind Words from Our Students
        </span>
        <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-20 px-20">
          {reviews
            .sort(() => 0.5 - Math.random())
            .map((review, idx) => (
              <Review key={idx} {...review} />
            ))}
        </div>
      </div>
    </main>
  );
}
