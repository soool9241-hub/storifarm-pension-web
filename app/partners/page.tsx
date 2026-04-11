import PartnersClient from "./PartnersClient";

export const metadata = {
  title: "파트너 라이선스 — 스토리팜",
  description: "1인 1지역 독점. 7년차 운영자의 시스템을 그대로 복제해 지역 파트너로 사업을 시작하세요.",
};

export default function PartnersPage() {
  return (
    <div>
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-wide py-14">
          <div className="label">STAGE 6 · 파트너 라이선스</div>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            1인 1지역 독점. 시스템을 그대로 복제해드립니다.
          </h1>
          <p className="mt-3 max-w-2xl text-ink-700">
            제가 전북을 담당합니다. 충남·경남·강원·경북 등 남은 지역에서
            파트너 20명만 선발합니다. 혼자서 홈페이지 + 광고 + 운영교육까지 할
            필요 없습니다. 시스템은 제가 드리고, 파트너는 지역 영업과 고객 관리에
            집중하면 됩니다.
          </p>
        </div>
      </section>

      <section className="container-wide py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-lg font-bold">파트너가 받는 것</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-700">
              {[
                "홈페이지 템플릿 5종 + 소스코드",
                "Supabase / n8n 자동화 워크플로우 복제",
                "네이버 광고 캠페인 템플릿",
                "진단 도구 · 제안서 · 스크립트 사용권",
                "브랜드(스토리팜) 공동 사용권",
                "초기 3건 공동 제작 OJT",
                "주 1회 1:1 미팅 (기술 백업)",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold">파트너 수익 구조</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl bg-ink-100/40 p-4">
                <div className="text-xs text-ink-500">건당 제작 수익</div>
                <div className="text-lg font-bold">약 300만원 / 1건</div>
              </div>
              <div className="rounded-xl bg-ink-100/40 p-4">
                <div className="text-xs text-ink-500">월 유지보수 리텐션</div>
                <div className="text-lg font-bold">10만원 × 고객 수</div>
              </div>
              <div className="rounded-xl bg-brand-50 p-4">
                <div className="text-xs text-brand-700">라이선스 비용 (본사에 납부)</div>
                <div className="text-lg font-bold text-brand-900">월 99만원</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-500">
              * 파트너 한 명이 월 3건만 수주해도 라이선스비의 9배 이상 수익.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-ink-100 bg-white p-6">
          <h2 className="text-lg font-bold">선발 자격</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm">
            <div>
              <div className="label">① 아카데미 수료</div>
              <div className="mt-1 text-ink-700">4주 아카데미 졸업자 우선</div>
            </div>
            <div>
              <div className="label">② 지역 선점</div>
              <div className="mt-1 text-ink-700">1인 1지역 중복 불가</div>
            </div>
            <div>
              <div className="label">③ 기술 검증</div>
              <div className="mt-1 text-ink-700">간단한 샘플 제작 심사</div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <PartnersClient />
        </div>
      </section>
    </div>
  );
}
