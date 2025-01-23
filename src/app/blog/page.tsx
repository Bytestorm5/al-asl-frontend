"use client";

import BlogList from "@/components/ui/blog-list";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-316px)] max-w-3xl flex-col px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Our Blog</h1>
      <Input
        type="search"
        placeholder="Search posts..."
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <BlogList searchTerm={searchTerm} />
    </div>
  );
}
