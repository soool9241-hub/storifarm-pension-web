type TierKey = "light" | "standard" | "premium";

const HEADERS: { key: TierKey; name: string; price: number; note: string; promo?: string; highlight?: boolean }[] = [
  { key: "light", name: "라이트", price: 39, note: "단기 / 월 결제", promo: "선착순 5팀 월 29만" },
  { key: "standard", name: "스탠다드", price: 69, note: "1년 약정", highlight: true },
  { key: "premium", name: "프리미엄", price: 99, note: "1년 약정" },
];

type Cell = { v: string; level: 0 | 1 | 2 | 3 };
const NONE: Cell = { v: "—", level: 0 };
const BASIC = (v: string): Cell => ({ v, level: 1 });
const FULL = (v: string): Cell => ({ v, level: 2 });
const PRO = (v: string): Cell => ({ v, level: 3 });
const CHECK: Cell = { v: "✓", level: 2 };

const SECTIONS: {
  title: string;
  icon: string;
  rows: { f: string; l: Cell; s: Cell; p: Cell }[];
}[] = [
  {
    title: "공간 운영 자동화 홈페이지 구축",
    icon: "🏠",
    rows: [
      { f: "홈페이지 형태", l: BASIC("단일 페이지"), s: FULL("풀 커스텀"), p: PRO("풀 커스텀 + 다지점") },
      { f: "도메인 + 호스팅", l: CHECK, s: CHECK, p: CHECK },
      { f: "휴대폰 반응형", l: CHECK, s: CHECK, p: CHECK },
      { f: "예약 시스템", l: BASIC("문의 폼형"), s: FULL("달력형 실시간"), p: PRO("달력 + 다지점 통합") },
      { f: "결제 연동", l: NONE, s: CHECK, p: CHECK },
      { f: "SMS / 알림톡 자동 발송", l: BASIC("1종"), s: FULL("5종"), p: PRO("5종 + 알림톡 통합") },
    ],
  },
  {
    title: "전환되는 키워드 셋팅",
    icon: "🎯",
    rows: [
      { f: "네이버 광고 키워드", l: BASIC("기본 5개"), s: FULL("37 키워드 세팅"), p: PRO("37 키워드 + 매월 최적화") },
      { f: "네이버 플레이스", l: BASIC("DIY 가이드"), s: FULL("직접 등록"), p: PRO("등록 + 최적화") },
      { f: "방문자·전환 대시보드", l: NONE, s: FULL("GA4 기본"), p: PRO("GA4 + 작전회의") },
      { f: "광고 1:1 컨설팅", l: NONE, s: NONE, p: PRO("매월 1회") },
    ],
  },
  {
    title: "운영관리 교육",
    icon: "📚",
    rows: [
      { f: "셀프 운영 가이드북", l: CHECK, s: CHECK, p: CHECK },
      { f: "1:1 운영 코칭", l: NONE, s: FULL("1회 (60분)"), p: PRO("매월 1회") },
      { f: "콘텐츠 업데이트", l: BASIC("월 1회"), s: FULL("월 2회"), p: PRO("월 2회 + 제작 2건") },
      { f: "매월 데이터 리포트", l: NONE, s: NONE, p: PRO("✓ 작전회의 포함") },
    ],
  },
  {
    title: "지역 파트너십 제휴",
    icon: "🤝",
    rows: [
      { f: "지역 1인 독점 우선권", l: NONE, s: FULL("우선 안내"), p: PRO("✓ 즉시 등록") },
      { f: "파트너 레퍼럴 수익", l: NONE, s: FULL("건당 보상"), p: PRO("건당 + 월 분배") },
      { f: "지역 사업주 네트워크", l: NONE, s: FULL("분기 모임"), p: PRO("월간 비공개 모임") },
    ],
  },
  {
    title: "평생 업데이트 시스템 라이센스",
    icon: "♾",
    rows: [
      { f: "시스템 자동 업데이트 (매일)", l: CHECK, s: CHECK, p: CHECK },
      { f: "신규 기능 우선 적용", l: NONE, s: CHECK, p: PRO("베타 우선") },
      { f: "긴급 대응", l: BASIC("영업일"), s: FULL("영업일 우선"), p: PRO("24시간 핫라인") },
    ],
  },
];

function CellView({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  if (cell.level === 0) {
    return <span className="text-ink-500/60">—</span>;
  }
  if (cell.v === "✓") {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
          highlight ? "bg-yellow-300 text-brand-900" : "bg-brand-50 text-brand-700"
        }`}
      >
        ✓
      </span>
    );
  }
  const badgeColor =
    cell.level === 3
      ? highlight
        ? "bg-yellow-300 text-brand-900"
        : "bg-brand-700 text-white"
      : cell.level === 2
      ? highlight
        ? "bg-white/15 text-white"
        : "bg-brand-50 text-brand-900"
      : "bg-ink-100/60 text-ink-700";
  return (
    <span className={`inline-block rounded-lg px-2 py-1 text-[11px] font-semibold leading-tight sm:text-xs ${badgeColor}`}>
      {cell.v}
    </span>
  );
}

export default function TierCards() {
  return (
    <div>
      {/* TOP: PRICE CARDS */}
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
        {HEADERS.map((t) => (
          <div
            key={t.key}
            className={`relative rounded-3xl p-5 text-center sm:p-6 ${
              t.highlight
                ? "bg-brand-900 text-white shadow-2xl shadow-brand-900/20"
                : "border border-ink-100 bg-white text-ink-900"
            }`}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-bold text-brand-900">
                ⭐ 가장 많이 선택
              </div>
            )}
            <div className={`text-xs font-semibold ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>
              {t.name}
            </div>
            <div className="mt-1 flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold sm:text-4xl">월 {t.price}</span>
              <span className={`text-sm ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>만원</span>
            </div>
            <div className={`text-[11px] ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>{t.note}</div>
            {t.promo && (
              <div className="mt-2 inline-flex items-center rounded-full bg-yellow-300 px-2.5 py-0.5 text-[10px] font-bold text-brand-900 sm:text-[11px]">
                🎁 {t.promo}
              </div>
            )}
            <a
              href={`/contact?tier=${t.key}`}
              className={`mt-4 block w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                t.highlight
                  ? "bg-white text-brand-900 hover:bg-brand-50"
                  : "bg-brand-900 text-white hover:bg-brand-700"
              }`}
            >
              상담 신청 →
            </a>
          </div>
        ))}
      </div>

      {/* === DESKTOP: SINGLE STICKY-HEADER TABLE === */}
      <div className="mt-10 hidden overflow-hidden rounded-3xl border border-ink-100 bg-white sm:block">
        {/* Sticky tier header */}
        <div className="sticky top-0 z-10 grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-ink-100 bg-white">
          <div className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            포함 항목
          </div>
          {HEADERS.map((t) => (
            <div
              key={t.key}
              className={`px-3 py-3 text-center ${
                t.highlight ? "bg-brand-900 text-white" : "text-ink-900"
              }`}
            >
              <div className={`text-xs font-medium ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>
                {t.name}
              </div>
              <div className="mt-0.5 text-base font-bold">월 {t.price}만</div>
            </div>
          ))}
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="grid grid-cols-[1.4fr_3fr] border-t border-ink-100 bg-brand-50">
              <div className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-brand-900">
                <span className="text-base">{section.icon}</span>
                <span>{section.title}</span>
              </div>
              <div />
            </div>
            {section.rows.map((row) => (
              <div
                key={row.f}
                className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-t border-ink-100"
              >
                <div className="px-5 py-4 text-sm font-medium text-ink-900">{row.f}</div>
                <div className="px-3 py-4 text-center">
                  <CellView cell={row.l} />
                </div>
                <div className="bg-brand-50/40 px-3 py-4 text-center">
                  <CellView cell={row.s} highlight />
                </div>
                <div className="px-3 py-4 text-center">
                  <CellView cell={row.p} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* === MOBILE: PER-SECTION 3-COLUMN CARDS === */}
      <div className="mt-10 space-y-5 sm:hidden">
        {SECTIONS.map((section) => (
          <div key={section.title} className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
            <div className="flex items-center gap-2 bg-brand-50 px-4 py-3 text-[13px] font-bold text-brand-900">
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </div>
            {section.rows.map((row) => (
              <div key={row.f} className="border-t border-ink-100 px-4 py-3">
                <div className="text-[13px] font-medium text-ink-900">{row.f}</div>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  <Mini label="라이트" cell={row.l} />
                  <Mini label="스탠다드" cell={row.s} highlight />
                  <Mini label="프리미엄" cell={row.p} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom CTA buttons (mobile-friendly redundancy) */}
      <div className="mt-8 grid grid-cols-3 gap-2 sm:hidden">
        {HEADERS.map((t) => (
          <a
            key={t.key}
            href={`/contact?tier=${t.key}`}
            className={`rounded-xl px-2 py-3 text-center text-[12px] font-semibold transition ${
              t.highlight
                ? "bg-brand-900 text-white"
                : "border border-ink-100 bg-white text-ink-700"
            }`}
          >
            {t.name} 상담
          </a>
        ))}
      </div>
    </div>
  );
}

function Mini({ label, cell, highlight }: { label: string; cell: Cell; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl p-2 text-center ${
        highlight ? "bg-brand-900 text-white" : cell.level === 0 ? "bg-ink-100/40" : "bg-brand-50/60"
      }`}
    >
      <div className={`text-[9px] font-medium ${highlight ? "text-brand-100" : "text-ink-500"}`}>{label}</div>
      <div className="mt-0.5 text-[12px] font-bold leading-tight">
        {cell.level === 0 ? <span className="text-ink-500">—</span> : cell.v}
      </div>
    </div>
  );
}
