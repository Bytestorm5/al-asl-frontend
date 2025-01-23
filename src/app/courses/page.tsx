import Link from "next/link";

export default function Page() {
  return (
    <main className="my-20 flex min-h-[calc(100vh-316px)] flex-col items-center justify-center bg-gray-50">
      <h1 className="mb-8 text-3xl font-semibold text-gray-700">
        Choose Your Course Category
      </h1>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <Link
          href="/courses/women"
          className="rounded-lg bg-secondary px-6 py-3 text-lg font-medium text-white shadow-md transition duration-300 ease-in-out"
        >
          Courses for Women
        </Link>
        <Link
          href="/courses/kids"
          className="rounded-lg bg-secondary px-6 py-3 text-lg font-medium text-white shadow-md transition duration-300 ease-in-out"
        >
          Courses for Kids
        </Link>
      </div>
    </main>
  );
}
