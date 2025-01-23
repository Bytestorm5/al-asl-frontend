import { getClassBySlug } from "@/actions/db";
import RegistrationDialog from "@/components/ui/registration-dialog";
import { formatPrice, targetNameToWord } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: {
    classSlug: string;
    courseId: string;
  };
}

export default async function Page({ params: { classSlug, courseId } }: Props) {
  const cls = await getClassBySlug(classSlug);

  const course = cls.courses.find((course) => course.id === courseId);

  if (!course) {
    return (
      <main className="flex min-h-screen flex-col items-center">
        <span>Invalid course</span>
      </main>
    );
  }

  return (
    <main className="mb-10 flex min-h-screen flex-col items-center px-20">
      <div className="flex w-full flex-col items-start">
        <span className="text-4xl font-semibold tracking-wide">
          {course.name}{" "}
          <RegistrationDialog
            buttonText="Register"
            classId={cls.id}
            course={course}
          />
        </span>
        <span className="text-md font-medium tracking-wide opacity-65">
          {formatPrice(course.price)} - For{" "}
          {targetNameToWord(cls.target as "W" | "K")} only
        </span>
        <div className="prose">
          <Markdown remarkPlugins={[remarkGfm]} className="mt-4">
            {course.details}
          </Markdown>
        </div>
      </div>
      <RegistrationDialog classId={cls.id} course={course} />
    </main>
  );
}
