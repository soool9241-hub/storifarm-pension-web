const STEPS = [
  {
    n: 1,
    badge: "지금 바로",
    title: "무료 온라인 진단 3분",
    pain: "내 펜션이 네이버에서 몇 번째로 뜨는지 모르겠어요",
    gain: "20문항 체크만 하면 사장님 펜션의 온라인 상태를 A~F 등급으로 즉시 진단해드려요. 광고비 한 푼 안 듭니다.",
    bg: "#E1F5EE",
    bar: "#0F6E56",
    text: "#04342C",
    sub: "#0F6E56",
    round: "10px 10px 0 0",
    cta: { label: "진단 시작 →", href: "/diagnostic" },
  },
  {
    n: 2,
    badge: "진단 직후",
    title: "맞춤 리포트 문자로 도착",
    pain: "진단만 해놓고 뭐부터 고쳐야 할지 모르겠어요",
    gain: "OTA로 새고 있는 수수료, 광고 전환 안 되는 키워드, 먼저 고칠 5가지를 사장님 이름으로 정리해 문자로 보내드립니다.",
    bg: "#E6F1FB",
    bar: "#185FA5",
    text: "#042C53",
    sub: "#185FA5",
  },
  {
    n: 3,
    badge: "14~21일",
    title: "내 펜션 홈페이지 완성",
    pain: "홈페이지 만들자니 에이전시는 비싸고, 템플릿은 펜션에 안 맞아요",
    gain: "달팽이아지트에서 실전 검증한 템플릿 5종 중 하나 고르시면 끝. 예약 시스템·SMS 자동화·네이버 광고까지 한 번에 세팅해드립니다.",
    bg: "#FAEEDA",
    bar: "#854F0B",
    text: "#412402",
    sub: "#854F0B",
    cta: { label: "제작 요금 보기 →", href: "/pricing" },
  },
  {
    n: 4,
    badge: "납품 후에도",
    title: "혼자 안 돌리셔도 됩니다",
    pain: "홈페이지 만들어놓고 관리가 더 힘들어요. 성수기 광고도 못 건드리겠어요",
    gain: "월 5~15만원으로 콘텐츠 수정, 광고 키워드 점검, 방문자 리포트까지 제가 대신 봐드려요. 사장님은 손님만 맞이하세요.",
    bg: "#FAECE7",
    bar: "#993C1D",
    text: "#4A1B0C",
    sub: "#993C1D",
    cta: { label: "관리 구독 안내 →", href: "/maintenance" },
  },
  {
    n: 5,
    badge: "직접 해보고 싶다면",
    title: "운영 노하우 그대로 가르쳐드려요",
    pain: "대행사 맡기긴 싫고, 나도 직접 광고 돌리고 싶은데 혼자는 막막해요",
    gain: "7년간 검증한 네이버 광고 37키워드, SMS 자동화, 재방문 트리거를 4주 아카데미로 그대로 이식해드립니다. 월 9.9만 온라인도 가능.",
    bg: "#EEEDFE",
    bar: "#534AB7",
    text: "#26215C",
    sub: "#534AB7",
    cta: { label: "아카데미 보기 →", href: "/academy" },
  },
  {
    n: 6,
    badge: "같이 사업하고 싶다면",
    title: "지역 파트너로 함께해요",
    pain: "이 시스템이 내 지역에서도 통할 것 같은데, 나도 펜션 홈페이지 사업을 하고 싶어요",
    gain: "1인 1지역 독점. 템플릿·자동화·광고 템플릿을 그대로 드리고, 초기 3건은 제가 함께 만들어드립니다. 20명만 선발합니다.",
    bg: "#FBEAF0",
    bar: "#993556",
    text: "#4B1528",
    sub: "#993556",
    round: "0 0 10px 10px",
    cta: { label: "파트너 지원 →", href: "/partners" },
  },
];

export default function CustomerJourney() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-[2px]">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="px-5 py-5 sm:px-6"
            style={{
              background: s.bg,
              borderLeft: `3px solid ${s.bar}`,
              borderRadius: s.round || 0,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ background: s.bar }}
              >
                {s.n}
              </span>
              <span className="text-[11px] font-medium" style={{ color: s.sub }}>
                {s.badge}
              </span>
            </div>
            <div className="mt-2 text-[17px] font-bold sm:text-lg" style={{ color: s.text }}>
              {s.title}
            </div>

            <div className="mt-3 rounded-lg bg-white/60 p-3 text-xs" style={{ color: s.text }}>
              <span className="font-semibold">💬 사장님:</span>{" "}
              <span className="opacity-80">“{s.pain}”</span>
            </div>

            <div className="mt-2 text-sm leading-relaxed" style={{ color: s.text }}>
              {s.gain}
            </div>

            {s.cta && (
              <a
                href={s.cta.href}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold underline-offset-2 hover:underline"
                style={{ color: s.bar }}
              >
                {s.cta.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
