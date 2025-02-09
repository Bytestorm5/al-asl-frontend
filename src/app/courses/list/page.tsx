// Server Component
import { getCourseCategories, getOpenClasses, getCourseStatic } from "@/actions/db";
import CourseCategoriesView from "@/components/ui/CourseCategory";
import { Course } from "@/actions/moodleTypes";

interface Props {
  params: {
    target: string;
  };
}

export default async function Page({ params: { target } }: Props) {
  const all_classes = await getOpenClasses();
  const category_info = await getCourseCategories();
  // Organize classes by category
  const categories: Record<number, Course[]> = {};
  for (const cls of all_classes) {
    if (categories.hasOwnProperty(cls.categoryid)) {
      categories[cls.categoryid].push(cls);
    } else {
      categories[cls.categoryid] = [cls];
    }
  }

  // Pass pre-fetched data to the client component
  return <CourseCategoriesView categories={categories} categoryInfo={category_info} />;
}
