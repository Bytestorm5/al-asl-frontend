"use client";

import { getBlogs } from "@/actions/blog";
import { blog } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ObjectId from "bson-objectid";

interface Props {
  searchTerm: string;
}

export default function BlogList({ searchTerm }: Props) {
  const [blogs, setBlogs] = useState<blog[] | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getBlogs();
      setBlogs(blogs);
    };

    fetchBlogs();
  }, []);

  if (blogs === null) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex flex-row justify-between"
          >
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (filteredBlogs.length === 0) {
    return <div className="text-center text-gray-500">No results found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredBlogs.map(({ id, slug, title, author }) => (
        <div key={id} className="flex flex-row justify-between">
          <Link href={`/blog/${slug}`}>
            {title}&nbsp;
            <span className="text-xs text-gray-500">by {author}</span>
          </Link>
          <span>
            {format(
              new ObjectId(id).getTimestamp().toISOString(),
              "LLLL d, yyyy",
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
