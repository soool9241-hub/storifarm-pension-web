import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스토리팜 — 펜션 사장님이 직접 만든 펜션 홈페이지 제작 시스템",
  description:
    "7년차 펜션 운영자 임솔(달팽이아지트)이 직접 설계한 펜션 홈페이지 + 예약 + 광고 시스템. 웹 에이전시가 아니라, 매출 7배 만든 사장님이 복제해드립니다.",
  openGraph: {
    title: "스토리팜 — 운영자가 직접 만든 펜션 홈페이지 시스템",
    description: "달팽이아지트 임솔 대표가 직접 설계. 무료 온라인 진단부터 시작하세요.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-ink-100">
          <div className="container-wide flex h-14 items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-lg">🐌</span>
              <span className="text-sm font-semibold">스토리팜</span>
              <span className="hidden text-xs text-ink-500 sm:inline">by 달팽이아지트</span>
            </a>
            <nav className="flex items-center gap-1 text-sm">
              <a href="/diagnostic" className="rounded-lg px-3 py-2 text-ink-700 hover:bg-ink-100/60">
                무료 진단
              </a>
              <a href="/pricing" className="rounded-lg px-3 py-2 text-ink-700 hover:bg-ink-100/60">
                제작 요금
              </a>
              <a href="/academy" className="hidden rounded-lg px-3 py-2 text-ink-700 hover:bg-ink-100/60 sm:inline-block">
                아카데미
              </a>
              <a href="/contact" className="btn-primary ml-2 !py-2 !text-xs">
                상담 신청
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-24 border-t border-ink-100 bg-ink-100/30">
          <div className="container-wide grid gap-6 py-10 text-xs text-ink-500 sm:grid-cols-3">
            <div>
              <div className="mb-2 text-sm font-semibold text-ink-900">스토리팜 (Storifarm)</div>
              <div>달팽이아지트 펜션 운영 7년차</div>
              <div>대표 임솔 · 전북 완주군 소양면</div>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-ink-900">연락</div>
              <div>전화 010-8531-9531</div>
              <div>카카오톡 sool9241</div>
              <div>이메일 help@healingstay.com</div>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-ink-900">서비스</div>
              <div><a href="/diagnostic">무료 온라인 진단</a></div>
              <div><a href="/pricing">홈페이지 제작</a></div>
              <div><a href="/academy">운영 아카데미</a></div>
              <div><a href="/partners">파트너 모집</a></div>
            </div>
          </div>
          <div className="container-wide pb-8 text-[11px] text-ink-500">
            © {new Date().getFullYear()} Storifarm. 홈페이지는 명함이 아닙니다. 24시간 돌아가는 영업 사원입니다.
          </div>
        </footer>
      </body>
    </html>
  );
}
