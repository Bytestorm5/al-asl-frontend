import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  request.headers.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}
