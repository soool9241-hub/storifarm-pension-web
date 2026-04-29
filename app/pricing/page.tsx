export const metadata = {
  title: "월 구독 요금 (라이트 39 / 스탠다드 69 / 프리미엄 99)",
  description:
    "공간운영자동화 올인원 서비스 월 구독료. 라이트 39만 (선착순 5팀 29만 할인) / 스탠다드 69만 / 프리미엄 99만. 홈페이지 + 예약 + SMS + 광고까지 한 번에.",
};

const TIERS = [
  {
    tier: "light",
    name: "라이트",
    monthly: 39,
    promoNote: "선착순 5팀 한정 월 29만원 (10만원 할인)",
    note: "단기 / 월 결제",
    fits: "지금 막 시작하시는 사장님 / 1개 공간 / 월 매출 400만원 이하",
    features: [
      "도메인 + 호스팅 1년",
      "예약 받을 수 있는 단일 페이지",
      "기본 SMS 자동 발송 (예약확인 1종)",
      "네이버 플레이스 등록 가이드",
      "월 1회 콘텐츠 업데이트 지원",
    ],
  },
  {
    tier: "standard",
    name: "스탠다드",
    monthly: 69,
    note: "1년 약정",
    highlight: true,
    fits: "공간 1~2개 / 월 매출 400~1,500만원 / 자체 예약 늘리고 싶은 사장님",
    features: [
      "풀 커스텀 홈페이지",
      "달력형 실시간 예약 + 결제 연동",
      "SMS / 알림톡 자동 발송 5종",
      "네이버 광고 키워드 37개 세팅",
      "GA4 + Supabase 방문자 대시보드",
      "월 2회 콘텐츠·광고 점검",
    ],
  },
  {
    tier: "premium",
    name: "프리미엄",
    monthly: 99,
    note: "1년 약정",
    fits: "공간 3개 이상 / 월 매출 1,500만원+ / 다지점 운영 사장님",
    features: [
      "스탠다드 모든 기능 +",
      "다지점 통합 관리 (공간별 페이지)",
      "광고 컨설팅 매월 1회 (1:1)",
      "콘텐츠 제작 지원 (월 2건)",
      "매월 데이터 리포트 + 작전회의",
      "긴급 대응 24시간 핫라인",
    ],
  },
] as const;

export default function PricingPage() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-wide py-14">
          <div className="label">STAGE 3 · 월 구독 요금</div>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            제작비 한 번 + 월 운영비 — 묶어서 월 구독으로 받습니다.
          </h1>
          <p className="mt-3 max-w-2xl text-ink-700">
            홈페이지 제작 + 예약 + SMS + 네이버 광고 + 매일 업데이트까지 전부 묶어서
            월 구독료 하나로 운영됩니다. 외주 에이전시처럼 큰 돈 한 번에 안 받고,
            매월 효과 보면서 같이 가는 구조예요.
          </p>
        </div>
      </section>

      {/* TIERS */}
      <section className="container-wide py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((p) => {
            const isHighlight = "highlight" in p && p.highlight;
            return (
              <div
                key={p.tier}
                className={`card flex flex-col p-6 ${
                  isHighlight ? "ring-2 ring-brand-500" : ""
                }`}
              >
                {isHighlight && (
                  <div className="mb-3 inline-flex items-center rounded-full bg-brand-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                    가장 많이 선택
                  </div>
                )}
                <div className="label">{p.name}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-brand-900">월 {p.monthly}만</span>
                  <span className="text-sm text-ink-500">원 / {p.note}</span>
                </div>
                {"promoNote" in p && p.promoNote && (
                  <div className="mt-2 inline-flex w-fit items-center rounded-full bg-yellow-300 px-2.5 py-1 text-[11px] font-bold text-brand-900">
                    🎁 {p.promoNote}
                  </div>
                )}
                <div className="mt-3 text-[12px] leading-relaxed text-ink-500">
                  <b className="text-ink-700">이런 분께:</b> {p.fits}
                </div>
                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`/contact?tier=${p.tier}`}
                  className={`mt-6 ${isHighlight ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.name} 상담 신청
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-ink-100/50 p-6">
          <h3 className="text-lg font-bold">왜 딱 3개로 나눠놨느냐면요</h3>
          <p className="mt-2 text-sm text-ink-700">
            공간 운영자가 진짜 필요한 건 3가지뿐이었습니다.
            <b> 시작만 하시는 분(라이트)</b>,
            <b> 본격적으로 자체 예약 늘릴 분(스탠다드)</b>,
            <b> 여러 공간을 통합 운영할 분(프리미엄)</b>. 그 외 옵션은 사장님 돈 새는 길이라 다 빼드렸어요.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-ink-100 bg-ink-100/30">
        <div className="container-wide py-14">
          <h2 className="text-2xl font-bold">제작 + 도입 프로세스 (14~21일)</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { n: 1, t: "무료 상담 30분", d: "현황 진단 + 맞춤 패키지 추천" },
              { n: 2, t: "제안 확정", d: "페이지 구성·디자인 방향 협의" },
              { n: 3, t: "구독 시작 · 첫 달 결제", d: "자동결제 등록 후 즉시 착수" },
              { n: 4, t: "제작 + 검수", d: "14~21일 내 완성" },
              { n: 5, t: "런칭 + 매일 업데이트", d: "도메인 연결 + 운영 자동화 가동" },
            ].map((s) => (
              <li key={s.n} className="card p-5">
                <div className="text-xs font-semibold text-brand-700">STEP {s.n}</div>
                <div className="mt-1 text-sm font-bold">{s.t}</div>
                <div className="mt-1 text-xs text-ink-500">{s.d}</div>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm text-ink-800">
            <div className="font-bold text-brand-900">결제 안내 — 월 구독료 한 번으로 묶음</div>
            <p className="mt-2 leading-relaxed">
              홈페이지 제작 + 운영 시스템 + 매일 업데이트가 월 구독료에 모두 포함됩니다.
              라이트는 부담 없이 월별로 시작 가능하고, 스탠다드·프리미엄은 1년 약정으로
              월 비용을 더 낮춘 구조입니다. 납품 지연 1일당 무상 유지보수 1일을 추가로
              드립니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
