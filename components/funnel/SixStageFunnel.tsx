const STAGES = [
  {
    n: 1,
    title: "무료 진단",
    sub: "인지 + 리드 수집",
    detail: "20문항 온라인 진단 · 3분이면 끝",
    metric: "월 500명 유입",
    bg: "#E1F5EE",
    bar: "#0F6E56",
    text: "#04342C",
    sub2: "#0F6E56",
    round: "10px 10px 0 0",
  },
  {
    n: 2,
    title: "맞춤 리포트",
    sub: "관심 → 상담 전환",
    detail: "진단 완료 즉시 맞춤 PDF 리포트 자동 발송",
    metric: "전환 20% · 100명",
    bg: "#E6F1FB",
    bar: "#185FA5",
    text: "#042C53",
    sub2: "#185FA5",
  },
  {
    n: 3,
    title: "홈페이지 제작",
    sub: "핵심 매출 — 제작 대행",
    detail: "라이트 150만 / 스탠다드 300만 / 프리미엄 500만",
    metric: "계약 15% · 월 4,500만원",
    bg: "#FAEEDA",
    bar: "#854F0B",
    text: "#412402",
    sub2: "#854F0B",
  },
  {
    n: 4,
    title: "월 유지보수",
    sub: "리텐션 — 관리 구독",
    detail: "콘텐츠 수정 + 광고 점검 + 기술 지원 월 5~15만",
    metric: "누적 100곳 · 월 1,000만원",
    bg: "#FAECE7",
    bar: "#993C1D",
    text: "#4A1B0C",
    sub2: "#993C1D",
  },
  {
    n: 5,
    title: "운영 아카데미",
    sub: "확장 — 직접 운영법 교육",
    detail: "온라인 9.9만 / 원데이 30만 / 4주 아카데미 99만",
    metric: "월 50명 · 월 2,500만원",
    bg: "#EEEDFE",
    bar: "#534AB7",
    text: "#26215C",
    sub2: "#534AB7",
  },
  {
    n: 6,
    title: "파트너 라이선스",
    sub: "복제 — 지역 파트너 확장",
    detail: "1인 1지역 독점 · 월 99만 × 20명 시스템 라이선스",
    metric: "파트너 20명 · 월 2,000만원",
    bg: "#FBEAF0",
    bar: "#993556",
    text: "#4B1528",
    sub2: "#993556",
    round: "0 0 10px 10px",
  },
];

export default function SixStageFunnel() {
  return (
    <div className="w-full">
      <div className="mb-6 grid grid-cols-3 gap-2">
        {[
          { k: "월 매출 목표", v: "1억원" },
          { k: "매출 구성", v: "6개 층" },
          { k: "자동화율", v: "80%" },
        ].map((m) => (
          <div key={m.k} className="rounded-xl bg-ink-100/60 p-3 text-center">
            <div className="label">{m.k}</div>
            <div className="text-xl font-semibold">{m.v}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[2px]">
        {STAGES.map((s) => (
          <div
            key={s.n}
            className="px-5 py-4"
            style={{
              background: s.bg,
              borderLeft: `3px solid ${s.bar}`,
              borderRadius: s.round || 0,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-medium" style={{ color: s.sub2 }}>
                  STAGE {s.n} — {s.title}
                </div>
                <div className="mt-0.5 text-[15px] font-semibold" style={{ color: s.text }}>
                  {s.sub}
                </div>
                <div className="mt-1 text-xs" style={{ color: s.sub2 }}>
                  {s.detail}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold" style={{ color: s.text }}>
                  {s.metric}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-ink-100 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold">월 매출 합산</span>
          <span className="text-2xl font-bold text-brand-900">1억원</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[
            { k: "S3 제작 대행", v: "4,500만", bg: "#FAEEDA", fg: "#412402" },
            { k: "S5 운영 아카데미", v: "2,500만", bg: "#EEEDFE", fg: "#26215C" },
            { k: "S6 파트너 라이선스", v: "2,000만", bg: "#FBEAF0", fg: "#4B1528" },
            { k: "S4 유지보수", v: "1,000만", bg: "#FAECE7", fg: "#4A1B0C" },
          ].map((x) => (
            <div key={x.k} className="flex justify-between rounded px-2 py-1" style={{ background: x.bg, color: x.fg }}>
              <span>{x.k}</span>
              <span className="font-semibold">{x.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
