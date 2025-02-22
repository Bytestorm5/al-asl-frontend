// pages/api/catalog.ts

import { CatalogRow, getCourseStatic } from "@/actions/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const result = await getCourseStatic();
  return NextResponse.json({ data: result.data as CatalogRow[] });
}