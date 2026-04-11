import MaintenanceClient from "./MaintenanceClient";

export const metadata = {
  title: "월 유지보수 구독 — 스토리팜",
  description: "홈페이지 만든 후 혼자 돌리기 어려운 사장님을 위한 월 관리 구독. 월 5~15만원.",
};

const PLANS = [
  {
    id: "basic",
    name: "베이직",
    price: 50000,
    target: "혼자 운영 가능한 분",
    features: ["콘텐츠 수정 월 2건", "기술 장애 대응", "월 1회 방문자 리포트"],
  },
  {
    id: "standard",
    name: "스탠다드",
    price: 100000,
    target: "가장 많이 선택 (70%)",
    features: [
      "콘텐츠 수정 무제한",
      "네이버 광고 키워드 점검 월 1회",
      "GA4 월간 리포트 자동 발송",
      "전화 기술 지원",
    ],
    hot: true,
  },
  {
    id: "premium",
    name: "프리미엄",
    price: 150000,
    target: "모객 전략까지 맡기고 싶은 분",
    features: [
      "스탠다드 전체 포함",
      "월 1회 1:1 모객 전략 미팅 (30분)",
      "경쟁사 동향 분석 리포트",
      "성수기 광고 집행 대행",
    ],
  },
];

export default function MaintenancePage() {
  return (
    <div>
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-wide py-14">
          <div className="label">STAGE 4 · 월 유지보수</div>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            혼자 돌리기 어려우시면, 제가 계속 옆에 있어드릴게요
          </h1>
          <p className="mt-3 max-w-2xl text-ink-700">
            홈페이지를 납품하고 “끝”이라고 말하는 에이전시가 많죠. 저는
            달팽이아지트도 제가 돌리고 있어서, 펜션 운영이 어떤 흐름인지
            압니다. 성수기 전 광고 점검, 콘텐츠 수정, 작은 기술 장애 — 사장님이
            신경 안 써도 되게 저희가 대신 봐드립니다.
          </p>
        </div>
      </section>

      <section className="container-wide py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`card flex flex-col p-6 ${p.hot ? "ring-2 ring-brand-500" : ""}`}
            >
              {p.hot && (
                <div className="mb-3 inline-flex items-center rounded-full bg-brand-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                  가장 많이 선택
                </div>
              )}
              <div className="label">{p.name}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-brand-900">
                  {(p.price / 10000).toLocaleString()}만
                </span>
                <span className="text-sm text-ink-500">원 / 월</span>
              </div>
              <div className="mt-1 text-xs text-brand-700">{p.target}</div>
              <ul className="mt-5 space-y-2 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <MaintenanceClient />
        </div>
      </section>
    </div>
  );
}
