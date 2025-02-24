import { getBlog } from "@/actions/blog";
import ObjectId from "bson-objectid";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params: { slug } }: BlogPageProps) {
  const blog = await getBlog(slug);
  return {
    title: blog?.subject || "Blog Not Found",
  };
}

export default async function Post({ params: { slug } }: BlogPageProps) {
  const blog = await getBlog(slug);

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
