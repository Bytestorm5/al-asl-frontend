"use server";

import prisma from "@/lib/db";
import { classes } from "@prisma/client";

export async function getOpenClasses() {
  try {
    const openClasses = (await prisma.classes.findMany({
      where: {
        courses: {
          some: {
            registrationOpen: true,
          },
        },
      },
      include: {
        courses: true, // This will include the 'courses' field in the result
      },
      cacheStrategy: {
        ttl: process.env.NODE_ENV === "production" ? 300 : 0,
      },
    })) as classes[];

    return openClasses.map((openClass) => ({
      ...openClass,
      courses: openClass.courses.map((course) => ({
        ...course,
        target: openClass.target,
      })),
    }));
  } catch (error) {
    console.error("Error fetching open classes:", error);
    throw new Error("Failed to fetch open classes.");
  }
}

export async function getClassBySlug(slug: string) {
  try {
    const cls = (await prisma.classes.findFirst({
      where: {
        slug,
      },
      include: {
        courses: true,
      },
      cacheStrategy: {
        ttl: process.env.NODE_ENV === "production" ? 300 : 0,
      },
    })) as classes;

    return {
      ...cls,
      courses: cls.courses.map((course) => ({
        ...course,
        target: cls.target,
      })),
    };
  } catch (error) {
    console.error("Error fetching class:", error);
    throw new Error("Failed to fetch class.");
  }
}

export async function getClassesForTarget(target: string) {
  try {
    const classesForTarget = (await prisma.classes.findMany({
      where: {
        target,
      },
      include: {
        courses: true,
      },
      cacheStrategy: {
        ttl: process.env.NODE_ENV === "production" ? 300 : 0,
      },
    })) as classes[];

    return classesForTarget.map((openClass) => ({
      ...openClass,
      courses: openClass.courses.map
        ? openClass.courses.map((course) => ({
            ...course,
            target: openClass.target,
          }))
        : [],
    }));
  } catch (error) {
    console.error("Error fetching classes for target:", error);
    throw new Error("Failed to fetch classes for target.");
  }
}
