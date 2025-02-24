import { getBlog } from "@/actions/blog";
import ObjectId from "bson-objectid";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export async function generateMetadata({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams.id;
  if (!id) {
    return { title: "Blog not found" };
  }
  const blog = await getBlog(id);
  return {
    title: blog?.subject || "Blog Not Found",
  };
}

export default async function Post({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams.id;
  if (!id) {
    notFound();
  }

  const blog = await getBlog(id);
  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <article className="prose lg:prose-xl">
        <h1 className="mb-2 text-center text-4xl font-extrabold">
          {blog.subject}
        </h1>
        <div className="mb-6 text-center text-sm font-medium text-gray-500">
          Al-Asl •{" "}
          {format(
            new ObjectId(blog.lastmodified).getTimestamp().toISOString(),
            "LLLL d, yyyy"
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog.summary }} />
      </article>
    </div>
  );
}
