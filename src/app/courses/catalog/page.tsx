// Server Component
import { getCourseStatic, CatalogRow } from "@/actions/db";
import CourseCategoriesView from "@/components/ui/CourseCategory";
import { Course } from "@/actions/moodleTypes";

interface Props {
  params: {
    target: string;
  };
}

export default async function Page({ params: { target } }: Props) {
  const all_classes = (await getCourseStatic()).data as CatalogRow[];
  console.log(typeof all_classes)
  // Organize classes by category
  const departments: Record<string, CatalogRow[]> = {};
  for (const cls of all_classes) {
    if (departments.hasOwnProperty(cls.Department)) {
      departments[cls.Department].push(cls);
    } else {
      departments[cls.Department] = [cls];
    }
  }
  // Pass pre-fetched data to the client component
  return (
    <main className="flex min-h-screen flex-col p-12">
      {Object.entries(departments).map(([dept, classes]) => (
        <div key={dept} id={dept} className="mb-4">
          {/* Render meaningful content here */}
          <h2 className="text-2xl">{dept}</h2>
          <div className="flex flex-row gap-4 flex-wrap justify-around">
            {classes.map((cls) => (
              <div id={cls.Code} className="w-96">
                <b>{cls.Code}— {cls.Name}</b>
                <blockquote className="ml-3">
                  { cls.Prerequisites.trim().length > 0 ? <i>Prerequisites: {cls.Prerequisites}</i> : <></>}                
                  { cls.Corequisites.trim().length > 0 ? <i>Corequisites: {cls.Corequisites}</i> : <></>}
                  { cls.Desc_EN.split('\n\n').map((line) => (<p className="mb-1">{line}</p>)) }
                </blockquote>                
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

