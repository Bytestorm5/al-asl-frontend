/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function About() {
  return (
    <main className="mb-12 flex min-h-screen flex-col items-center px-8">
      <h1 className="text-5xl font-bold tracking-wider text-secondary-dark">
        About Us
      </h1>
      <p className="mt-4 max-w-4xl text-center text-xl">
        Azharul Jannah is an online learning platform for kids and women across
        the world. It is a need of the hour for our Muslim Ummah. It is
        especially designed for Muslim Women and Azharul Jannah provides a safe
        and online platform for the women and children to learn various Quranic
        sciences including Tajweed, Qira'ah, Hifz, and offers many others
        related events through out the year. Established in 2009, Azharul Jannah
        provides short, effective and fun courses to benefit from. We have a
        well-trained and determined group of teachers who work very hard to give
        their best. We see amazing results in our lovely, pioneering students.{" "}
      </p>
      <section className="mt-14 grid items-center gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About the Founder</CardTitle>
            <CardDescription>
              Meet Zahara, the visionary behind our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <div className="h-full w-px bg-black"></div>
            <div>
              <h3 className="text-lg font-semibold">Gnei Zahara Ahamath</h3>
              <p className="text-muted-foreground text-sm">
                Born and raised in Sri Lanka, Gnei Zahara Ahamath began her
                quest for Islamic knowledge when she traveled to the Middle
                East, after completing her basic shariah course in Sri Lanka.
                She attended Jamiyyatul Tahfeez al-Quran in the Kingdom of Saudi
                Arabia for 4 years. Later, she went on to memorize the Noble
                Qur’an , completed her Hifdh journey in a short span of two
                years and received her first Sanad (in the Riwayah of Shu’bah
                and Hafs) under a proficient teacher from Egypt in 2018. In the
                year 2020, she completed her Ashara Sughra within 2 years and
                began her Qiraat Kubra journey with a prominent Sheikh and is
                currently reciting for some of the other variants in Ashara
                Kubra. <br /> <br />
                With a passion and love for teaching, Gnei Zahara established
                Azharul Jannah where she is a lead instructor. The main goal of
                establishing Azaharul Jannah is to teach the recitation of the
                Qur’an, which is the pinnacle of linguistic excellence and a
                miracle from Allah swt to the Prophet Muhammad (peace and
                blessings of Allah be upon him). To date, she has personally
                trained many qualified female teachers across the globe and
                handed down the Sanad. Alhamdulillah.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>A Message from the Founder</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              "Alhamdulillah, it is with great pleasure that I welcome you to
              Azharul Jannah - an online platform for sisters and children to
              learn tajweed, in a fun and easy way. We strive to provide a
              quality learning environment for the study of Tajweed, Qira'ah,
              Hifdh with Itqan. At Azharul Jannah, we recognoize that this life
              is a journey towards Allah swt. We want to play a part to make it
              easy for others to connect with the Words of Allah swt - The
              Qur'an - and enable them to recite it beautifully as it was
              revealed to our beloved Prophet peace be upon him. Our E.A.S.E.
              approach empowers our students to continuously strive to perfect
              their Tajweed, Hifdh and Qira'ah to reach Itqan. I hope to inspire
              others to recite the Quran with proper Tajweed and prepare them to
              become certified teachers of the Quran. I pray that Allah (swt)
              soften our tongue and heart together to bear the letters of His
              Book and to practice upon His words, and make it a means of
              intercession for us on the Day of Judgement."
            </blockquote>
          </CardContent>
          <CardFooter className="text-muted-foreground text-right text-sm">
            - Gnei Zahara Ahamath <br />
            Founder, Azharul Jannah
          </CardFooter>
        </Card>
      </section>
      <span className="mt-20 text-4xl font-bold text-secondary">
        Start your journey to the Qur&apos;an today
      </span>
      <div className="mt-12 flex flex-row items-center gap-20">
        <Link
          className="rounded-md bg-secondary px-6 py-4 text-sm text-white"
          href="/courses/women"
        >
          Courses for Women
        </Link>
        <Link
          className="rounded-md bg-secondary px-6 py-4 text-sm text-white"
          href="/courses/women"
        >
          Courses for Kids
        </Link>
      </div>
    </main>
  );
}
