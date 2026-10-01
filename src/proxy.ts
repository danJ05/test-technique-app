import { NextResponse, type NextRequest } from "next/server";

import { DEMO_SESSION_COOKIE, DEMO_SESSION_VALUE } from "@/features/auth/lib/auth-session";

export function proxy(request: NextRequest) {
  const session = request.cookies.get(DEMO_SESSION_COOKIE)?.value;

  if (session !== DEMO_SESSION_VALUE) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/store/:path*", "/dashboard/:path*"],
};