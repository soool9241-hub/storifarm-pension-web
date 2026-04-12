const STEPS = [
  {
    n: "01",
    eyebrow: "지금 바로",
    title: "무료 온라인 진단 3분",
    quote: "내 공간이 네이버에서 몇 번째로 뜨는지 모르겠어요.",
    body: "20문항 체크만 하면 사장님 공간의 온라인 상태를 A~F 등급으로 진단해드려요. 광고비 한 푼 안 듭니다.",
    cta: { label: "진단 시작", href: "/diagnostic" },
  },
  {
    n: "02",
    eyebrow: "진단 직후",
    title: "맞춤 리포트, 문자로 도착",
    quote: "진단만 해놓고 뭐부터 고쳐야 할지 모르겠어요.",
    body: "OTA로 새고 있는 수수료, 전환 안 되는 광고 키워드, 먼저 고칠 5가지를 사장님 이름으로 정리해 바로 보내드립니다.",
  },
  {
    n: "03",
    eyebrow: "14~21일",
    title: "사장님 공간 홈페이지 완성",
    quote: "에이전시는 비싸고, 무료 템플릿은 우리 공간에 안 맞아요.",
    body: "제 공간에서 실전 검증한 템플릿 중 하나 고르시면 예약 시스템·SMS 자동화·네이버 광고까지 한 번에 세팅해드립니다.",
    cta: { label: "제작 요금 보기", href: "/pricing" },
  },
  {
    n: "04",
    eyebrow: "납품 이후",
    title: "관리는 저한테 맡기세요",
    quote: "홈페이지 만들어놓고 성수기 광고를 제가 못 건드리겠어요.",
    body: "월 5~15만원으로 콘텐츠 수정, 광고 키워드 점검, 방문자 리포트까지 대신 봐드립니다. 사장님은 손님만 맞이하세요.",
    cta: { label: "관리 구독 안내", href: "/maintenance" },
  },
  {
    n: "05",
    eyebrow: "직접 해보고 싶다면",
    title: "운영 노하우 그대로 이식",
    quote: "대행사 맡기긴 싫고, 직접 광고 돌리고 싶은데 혼자는 막막해요.",
    body: "7년간 검증한 네이버 광고 37키워드, SMS 자동화, 재방문 트리거를 4주 아카데미로 그대로 넘겨드립니다.",
    cta: { label: "아카데미 보기", href: "/academy" },
  },
  {
    n: "06",
    eyebrow: "같이 사업하고 싶다면",
    title: "지역 파트너로 함께",
    quote: "내 지역에서 이 사업을 직접 하고 싶어요.",
    body: "1인 1지역 독점. 템플릿·자동화·광고 세팅을 그대로 드리고, 초기 3건은 제가 함께 만듭니다. 20명만 선발합니다.",
    cta: { label: "파트너 지원", href: "/partners" },
  },
];

export default function CustomerJourney() {
  return (
    <div className="relative">
      {/* vertical timeline line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-ink-100 sm:left-[15px]" aria-hidden />

      <ol className="space-y-10 sm:space-y-12">
        {STEPS.map((s) => (
          <li key={s.n} className="relative pl-10 sm:pl-14">
            {/* dot */}
            <div
              className="absolute left-0 top-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white ring-1 ring-ink-100 sm:h-[30px] sm:w-[30px]"
              aria-hidden
            >
              <div className="h-[7px] w-[7px] rounded-full bg-brand-700 sm:h-[9px] sm:w-[9px]" />
            </div>

            <div className="flex items-baseline gap-3 text-[11px] uppercase tracking-wider text-ink-500">
              <span className="font-semibold text-brand-700">{s.n}</span>
              <span>{s.eyebrow}</span>
            </div>

            <h3 className="mt-1.5 text-lg font-semibold text-ink-900 sm:text-xl">
              {s.title}
            </h3>

            <p className="mt-3 border-l border-ink-100 pl-3 text-[13px] italic text-ink-500">
              “{s.quote}”
            </p>

            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {s.body}
            </p>

            {s.cta && (
              <a
                href={s.cta.href}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-900 ring-1 ring-brand-500/40 transition hover:bg-brand-700 hover:text-white hover:ring-brand-700"
              >
                {s.cta.label}
                <span aria-hidden>→</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
