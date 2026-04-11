import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Expose pathname to layouts via header
  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);

  // Protect /admin/** except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const authed = req.cookies.get("admin_auth")?.value === "1";
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
