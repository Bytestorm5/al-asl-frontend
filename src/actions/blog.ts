"use server";

import prisma from "@/lib/db";

export async function getBlogs() {
  return await prisma.blog.findMany();
}

export async function getBlog(slug: string) {
  return await prisma.blog.findFirst({
    where: {
      slug,
    },
  });
}
