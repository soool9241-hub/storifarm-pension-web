import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = form.get("password")?.toString() || "";
  const expected = process.env.ADMIN_PASSWORD || "change-me-in-production";
  if (password !== expected) {
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  }
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set("admin_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
