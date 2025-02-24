"use client";

import { getBlogs } from "@/actions/blog";
import { blog } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ObjectId from "bson-objectid";
import { BlogEntriesResponse } from "@/actions/moodleTypes";

interface Props {
  searchTerm: string;
}

export default function BlogList({ searchTerm }: Props) {
  const [blogs, setBlogs] = useState<BlogEntriesResponse | null>(null);

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

  const filteredBlogs = blogs.entries.filter((blog) =>
    blog.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (filteredBlogs.length === 0) {
    return <div className="text-center text-gray-500">No results found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredBlogs.map((blog) => (
        <div key={blog.id} className="flex flex-row justify-between">
          <Link href={`/blog/post?id=${blog.id}`}>
            {blog.subject}&nbsp;
            <span className="text-xs text-gray-500">by Al-Asl</span>
          </Link>
          <span>
            {format(
              new ObjectId(blog.lastmodified).getTimestamp().toISOString(),
              "LLLL d, yyyy",
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
