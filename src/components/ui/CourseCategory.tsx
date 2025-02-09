"use client";

import { useState } from "react";
import MotionDiv from "@/components/ui/motion-div";
import { cn } from "@/lib/cn";
import { Course } from "@/actions/moodleTypes";

interface CourseCategoriesViewProps {
  categories: Record<number, Course[]>;
  categoryInfo: Record<number, { name: string; description: string }>;
}

export default function CourseCategoriesView({
  categories,
  categoryInfo,
}: CourseCategoriesViewProps) {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({});

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mb-12 mt-8 flex flex-col items-center">
        <h1 className="mb-2 text-4xl font-bold text-secondary">Courses</h1>
        <div className="w-40ca h-1 bg-secondary"></div>
      </div>
      {Object.entries(categories).map(([category_id, classes]) => {
        const categoryId = Number(category_id);
        const isExpanded = expandedCategories[categoryId] || false;

        return (
          <div key={categoryId} className="w-full mb-6">
            <div
              className="cursor-pointer p-4 bg-secondary text-white rounded-md shadow-md z-2"
              onClick={() => toggleCategory(categoryId)}
            >
              <h2 className="text-2xl font-bold">{categoryInfo[categoryId].name || "Unknown"}</h2>
              <p
                className="text-sm font-light"
                dangerouslySetInnerHTML={{
                  __html: categoryInfo[categoryId].description || "",
                }}
              ></p>
              <span className="block mt-2 text-right text-sm">
                {isExpanded ? "Collapse ▲" : "Expand ▼"}
              </span>
            </div>
            {isExpanded && (
              <div className="mt-4 space-y-4">
                {classes.map((cls, idx) => (
                  <MotionDiv
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.7, ease: "easeInOut" }}
                    key={idx}
                    className={cn("z-1 flex w-full flex-col px-12 py-11", {
                      "bg-primary-dark": idx % 2 === 0,
                      "bg-primary": idx % 2 === 1,
                    })}
                  >
                    <span className="text-center text-2xl font-medium text-secondary">
                      {cls.displayname}
                    </span>
                    <span
                      className="text-center font-light"
                      dangerouslySetInnerHTML={{ __html: cls.summary }}
                    ></span>
                    <div className="mt-4 flex flex-row flex-wrap justify-evenly">
                      <div
                        key={idx}
                        className="flex max-w-60 flex-col items-center justify-center"
                      >
                        {cls.visible ? (
                          <a
                            className="mt-2 text-center text-sm font-medium text-secondary-dark"
                            href={`https://moodle.al-asl.com/moodle/course/view.php?id=${cls.id}`}
                          >
                            Registration Open
                          </a>
                        ) : (
                          <span className="mt-2 text-center text-sm font-medium text-secondary-dark">
                            Registration Closed
                          </span>
                        )}
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
