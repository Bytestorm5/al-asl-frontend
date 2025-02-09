import { getBlog } from "@/actions/blog";
import ObjectId from "bson-objectid";
import { format } from "date-fns";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const blog = await getBlog(params.slug);

  return {
    title: blog?.subject,
  };
}

export default async function Post({ params }: Props) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return <div className="text-center">Blog not found</div>;
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
            "LLLL d, yyyy",
          )}
        </div>

        {/* <Markdown remarkPlugins={[remarkGfm]}>{blog.summary}</Markdown> */}
        <div dangerouslySetInnerHTML={{__html: blog.summary}}></div>
      </article>
    </div>
  );
}
