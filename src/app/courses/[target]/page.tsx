import { getClassesForTarget } from "@/actions/db";
import RegistrationDialog from "@/components/ui/registration-dialog";
import { cn } from "@/lib/cn";
import Link from "next/link";
import MotionDiv from "@/components/ui/motion-div";
interface Props {
  params: {
    target: string;
  };
}

export default async function Page({ params: { target } }: Props) {
  const targetCode = target === "women" ? "W" : target === "kids" ? "K" : "";
  const targetLabel = target[0].toUpperCase() + target.slice(1);

  if (!target) {
    return (
      <main className="flex min-h-screen flex-col items-center">
        <span>Invalid target</span>
      </main>
    );
  }

  const classes = await getClassesForTarget(targetCode);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mb-12 mt-8 flex flex-col items-center">
        <h1 className="mb-2 text-4xl font-bold text-secondary">
          Courses for {targetLabel}
        </h1>
        <div className="w-40ca h-1 bg-secondary"></div>
      </div>
      {classes.map((cls, idx) => (
        <MotionDiv
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.7, ease: "easeInOut" }}
          key={idx}
          className={cn("flex w-full flex-col px-12 py-11", {
            "bg-primary-dark": idx % 2 === 0,
            "bg-primary": idx % 2 === 1,
          })}
        >
          <span className="text-center text-2xl font-medium text-secondary">
            {cls.name}
          </span>
          <span className="text-center font-light">{cls.description}</span>
          <div className="mt-4 flex flex-row flex-wrap justify-evenly">
            {cls.courses.map((course, idx) => (
              <div
                key={idx}
                className="flex max-w-60 flex-col items-center justify-center"
              >
                <Link
                  href={`/courses/details/${cls.slug}/${course.id}`}
                  className="text-center text-xl text-secondary underline"
                >
                  {course.name}
                </Link>
                <span className="text-center text-sm font-light">
                  {course.description}
                </span>
                {course.registrationOpen ? (
                  <RegistrationDialog
                    key={idx}
                    classId={cls.id}
                    course={course}
                  />
                ) : (
                  <span className="mt-2 text-center text-sm font-medium text-secondary-dark">
                    Registration Closed
                  </span>
                )}
              </div>
            ))}
          </div>
        </MotionDiv>
      ))}
    </main>
  );
}
