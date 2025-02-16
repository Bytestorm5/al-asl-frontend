// Server Component: pages/catalog.tsx
import { getCourseStatic, CatalogRow } from "@/actions/db";

interface Props {
  params: {
    target: string;
  };
}

export default async function Page({ params: { target } }: Props) {
  const all_classes = (await getCourseStatic()).data as CatalogRow[];

  // Organize classes by department
  const departments: Record<string, CatalogRow[]> = {};
  for (const cls of all_classes) {
    if (departments.hasOwnProperty(cls.Department)) {
      departments[cls.Department].push(cls);
    } else {
      departments[cls.Department] = [cls];
    }
  }

  return (
    <main className="min-h-screen p-8">
      {Object.entries(departments).map(([dept, classes]) => (
        <section key={dept} id={dept} className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
            {dept}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              cls.is_active === "TRUE" ?
              <div
                key={cls.Code}
                className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {cls.Code} — {cls.Name}
                </h3>
                <div className="text-gray-600 text-sm space-y-2">
                  {cls.Prerequisites.trim().length > 0 && (
                    <p>
                      <strong>Prerequisites:</strong>{" "}
                      <em>{cls.Prerequisites}</em>
                    </p>
                  )}
                  {cls.Corequisites.trim().length > 0 && (
                    <p>
                      <strong>Corequisites:</strong>{" "}
                      <em>{cls.Corequisites}</em>
                    </p>
                  )}
                  {cls.Desc_EN.split("\n\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div> : <></>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
