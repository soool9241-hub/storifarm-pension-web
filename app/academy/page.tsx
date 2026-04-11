import AcademyClient from "./AcademyClient";

export const metadata = {
  title: "운영 아카데미",
  description: "펜션 사장님이 직접 네이버 광고와 홈페이지를 운영할 수 있도록 가르쳐드립니다.",
};

const PRODUCTS = [
  {
    id: "online",
    name: "온라인 멤버십",
    price: 99000,
    cycle: "/월",
    desc: "매주 화요일 10시, 2시간 라이브 강의. 과제 피드백 + 커뮤니티.",
    bullets: [
      "주 1회 실시간 강의 (녹화본 제공)",
      "과제 첨삭 (월 4회)",
      "멤버 전용 카톡방",
      "언제든 해지 가능",
    ],
  },
  {
    id: "oneday",
    name: "원데이 세미나",
    price: 300000,
    cycle: "/1회",
    desc: "4가지 주제 순환. 하루 3시간, 사례 중심.",
    bullets: [
      "① 고전환 랜딩 만들기",
      "② AI로 가망고객 발굴",
      "③ 예약·알림 자동화",
      "④ 파트너십 설계",
    ],
  },
  {
    id: "academy",
    name: "4주 아카데미",
    price: 990000,
    cycle: "/1기",
    desc: "실제로 사장님 펜션의 시스템을 같이 만들어드립니다. 졸업작품 = 런칭.",
    bullets: [
      "4주 × 주 2회 실전 수업",
      "1:1 코칭 2회 포함",
      "홈페이지 템플릿 증정",
      "졸업 시 파트너 지원 자격",
    ],
    hot: true,
  },
];

export default function AcademyPage() {
  return (
    <div>
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-wide py-14">
          <div className="label">STAGE 5 · 운영 아카데미</div>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            직접 돌릴 수 있게 가르쳐드리는 게 사장님한텐 제일 이득입니다
          </h1>
          <p className="mt-3 max-w-2xl text-ink-700">
            저도 처음엔 대행사에 맡겼다가 5년을 흘려보냈습니다. 직접 광고를
            돌리면서 키워드 37개, SMS 자동화, 재방문 트리거를 검증한 뒤에
            매출이 폭발했어요. 그 과정을 그대로 커리큘럼으로 만들었습니다.
          </p>
        </div>
      </section>

      <section className="container-wide py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={`card flex flex-col p-6 ${p.hot ? "ring-2 ring-brand-500" : ""}`}
            >
              {p.hot && (
                <div className="mb-3 inline-flex items-center rounded-full bg-brand-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                  추천 과정
                </div>
              )}
              <div className="label">{p.name}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-brand-900">
                  {(p.price / 10000).toLocaleString()}만
                </span>
                <span className="text-sm text-ink-500">원{p.cycle}</span>
              </div>
              <p className="mt-2 text-sm text-ink-700">{p.desc}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AcademyClient />
        </div>
      </section>
    </div>
  );
}
