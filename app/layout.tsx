import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "공간대관 사업자를 위한 홈페이지 제작 · 예약 · 광고 시스템",
  description:
    "펜션·파티룸·스튜디오·캠핑장 — 공간대관 사업자가 직접 설계한 홈페이지 + 예약 + 광고 자동화 시스템. 7년 운영 경험 기반, OTA 수수료 없이 자체 예약 100% 전환.",
  openGraph: {
    title: "공간대관 사업자를 위한 올인원 시스템",
    description: "무료 온라인 진단부터 시작하세요.",
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
              <span className="text-sm font-semibold">공간대관 사업자 서비스</span>
            </a>
            <nav className="flex items-center gap-0.5 text-sm">
              <a href="/diagnostic" className="rounded-lg px-2.5 py-2 text-xs text-ink-700 hover:bg-ink-100/60 sm:px-3 sm:text-sm">
                무료 진단
              </a>
              <a href="/pricing" className="hidden rounded-lg px-3 py-2 text-ink-700 hover:bg-ink-100/60 sm:inline-block">
                제작 요금
              </a>
              <a href="/academy" className="hidden rounded-lg px-3 py-2 text-ink-700 hover:bg-ink-100/60 sm:inline-block">
                아카데미
              </a>
              <a href="/contact" className="btn-primary ml-1 !px-3 !py-2 !text-xs sm:ml-2">
                상담 신청
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-ink-100 bg-ink-100/30">
          <div className="container-narrow py-10 text-center text-xs text-ink-500">
            <div className="text-sm font-semibold text-ink-900">공간대관 사업자를 위한 서비스</div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1">
              <a href="/diagnostic" className="hover:text-ink-900">무료 진단</a>
              <a href="/pricing" className="hover:text-ink-900">제작 요금</a>
              <a href="/maintenance" className="hover:text-ink-900">월 관리</a>
              <a href="/academy" className="hover:text-ink-900">아카데미</a>
              <a href="/partners" className="hover:text-ink-900">파트너</a>
            </div>
            <div className="mt-6 text-[11px] text-ink-500">
              © {new Date().getFullYear()} — 공간대관 사업자의 홈페이지는 명함이 아닙니다. 24시간 돌아가는 영업 사원입니다.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
