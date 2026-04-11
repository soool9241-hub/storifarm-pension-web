import Link from "next/link";
import { headers } from "next/headers";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Login page uses its own minimal layout via conditional rendering.
  // Auth is enforced by middleware.ts.
  const path = headers().get("x-pathname") || "";
  if (path.endsWith("/admin/login")) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-[70vh]">
      <div className="border-b border-ink-100 bg-ink-100/40">
        <div className="container-wide flex items-center justify-between py-3 text-sm">
          <div className="flex items-center gap-4">
            <span className="font-semibold">⚙️ 관리자</span>
            <nav className="flex gap-1">
              <Link href="/admin" className="rounded-lg px-3 py-1.5 hover:bg-white">대시보드</Link>
              <Link href="/admin/leads" className="rounded-lg px-3 py-1.5 hover:bg-white">리드</Link>
              <Link href="/admin/funnel" className="rounded-lg px-3 py-1.5 hover:bg-white">퍼널</Link>
              <Link href="/admin/plan" className="rounded-lg px-3 py-1.5 hover:bg-white">사업 계획</Link>
            </nav>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="text-xs text-ink-500 hover:text-ink-900">로그아웃</button>
          </form>
        </div>
      </div>
      <div className="container-wide py-10">{children}</div>
    </div>
  );
}
