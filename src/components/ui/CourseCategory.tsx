"use client";

import { useState } from "react";
import MotionDiv from "@/components/ui/motion-div";
import { cn } from "@/lib/cn";
import { Course } from "@/actions/moodleTypes";
import extMoodleText from "@/lib/mlang";
import { Language, useLanguage } from "./LanguageContext";

interface CourseCategoriesViewProps {
  categories: Record<number, Course[]>;
  categoryInfo: Record<number, { name: string; description: string }>;
}

export default function CourseCategoriesView({
  categories,
  categoryInfo,
}: CourseCategoriesViewProps) {
  
  const { currentLanguage: lang } = useLanguage();
  const T: Record<Language, {
    collapse: string;
    expand: string;
  }> = {
    EN: {
      collapse: "Collapse ▲",
      expand: "Expand ▼",
    },
    UR: {
      collapse: "بند کریں ▲",
      expand: "کھولیں ▼",
    },
  };
  
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({});

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  console.log(Object.entries(categories))
  console.log(Object.entries(categoryInfo))
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="mb-12 mt-8 flex flex-col items-center">
        <h1 className="mb-2 text-4xl font-bold text-secondary">Courses</h1>
        <div className="w-40ca h-1 bg-secondary"></div>
      </div>
      {Object.entries(categories).map(([category_id, classes]) => {
        const categoryId = Number(category_id);
        const isExpanded = expandedCategories[categoryId] ?? true;

        return (
          <div key={categoryId} className="w-5/6 mb-6">
            <div
              className="cursor-pointer p-4 bg-secondary text-white rounded-md shadow-md z-2"
              onClick={() => toggleCategory(categoryId)}
            >
              <h2 className="text-2xl font-bold">{categoryInfo[categoryId].name}</h2>
              <p
                className="text-sm font-light"
                dangerouslySetInnerHTML={{
                  __html: categoryInfo[categoryId].description,
                }}
              ></p>
              <span className="block mt-2 text-right text-sm">
                {isExpanded ? T[lang].collapse : T[lang].expand}
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
                      {extMoodleText(cls.displayname, lang, cls.displayname)}
                    </span>
                    <div className="text-center text-sm text-primary my-2">
                      {
                        extMoodleText(cls.summary, "TAGS", "Closed").split('|').map((s) => (
                          <span className="bg-secondary-dark p-1 rounded-2xl mx-1">{s}</span>
                        ))
                      }
                    </div>
                    <span
                      className="text-center font-light"
                      dangerouslySetInnerHTML={{ __html: extMoodleText(cls.summary, lang, cls.summary) }}
                    ></span>
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
