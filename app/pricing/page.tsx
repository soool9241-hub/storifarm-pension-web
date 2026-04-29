import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata = {
  title: "제작 요금",
  description: "라이트 150만 / 스탠다드 300만 / 프리미엄 500만. 운영자가 직접 만드는 펜션 홈페이지 제작비.",
};

export const dynamic = "force-dynamic";

const HIGHLIGHTS: Record<string, string> = {
  light: "OTA 수수료 6개월이면 회수",
  standard: "가장 많이 선택 (전체 60%)",
  premium: "풀 커스텀 + 컨설팅",
};

export default async function PricingPage() {
  const supabase = createSupabaseAdmin();
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("sort");

  const list = packages || [];

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-wide py-14">
          <div className="label">STAGE 3 · 홈페이지 제작</div>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            3가지 티어, 한 명의 운영자가 다 만듭니다.
          </h1>
          <p className="mt-3 max-w-2xl text-ink-700">
            외주 에이전시가 아닙니다. 제 펜션을 직접 운영하면서 쓰고
            검증한 템플릿 5종 중 하나를 고르시면, 저희가 데이터를 집어넣고 2~3주
            안에 납품합니다.
          </p>
        </div>
      </section>

      {/* TIERS */}
      <section className="container-wide py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {list.map((p) => {
            const isStandard = p.tier === "standard";
            return (
              <div
                key={p.tier}
                className={`card flex flex-col p-6 ${
                  isStandard ? "ring-2 ring-brand-500" : ""
                }`}
              >
                {isStandard && (
                  <div className="mb-3 inline-flex items-center rounded-full bg-brand-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                    가장 많이 선택
                  </div>
                )}
                <div className="label">{p.display_name}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-brand-900">
                    {(p.price / 10000).toLocaleString()}만
                  </span>
                  <span className="text-sm text-ink-500">원 (1회)</span>
                </div>
                <div className="mt-2 text-xs text-brand-700">{HIGHLIGHTS[p.tier]}</div>
                <ul className="mt-5 space-y-2">
                  {(p.features as string[]).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`/contact?tier=${p.tier}`}
                  className={`mt-6 ${isStandard ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.display_name} 상담 신청
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-ink-100/50 p-6">
          <h3 className="text-lg font-bold">왜 딱 3개로 나눠놨느냐면요</h3>
          <p className="mt-2 text-sm text-ink-700">
            제가 펜션을 운영해보니, 사장님들이 정말 필요한 건 3개뿐이었습니다.
            “도메인 + 예약 받을 수 있는 페이지”만 있으면 되는 분(라이트),
            “네이버 광고까지 돌리고 싶은 분”(스탠다드), “모객 전략까지 같이 짜고
            싶은 분”(프리미엄). 이 외에는 과잉 옵션이라 빼드렸습니다.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-ink-100 bg-ink-100/30">
        <div className="container-wide py-14">
          <h2 className="text-2xl font-bold">제작 프로세스 (14~21일)</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { n: 1, t: "무료 상담 30분", d: "현황 진단 + 맞춤 Tier 추천" },
              { n: 2, t: "제안 확정", d: "페이지 구성·디자인 방향 협의" },
              { n: 3, t: "계약 + 결제 100%", d: "선수금 일괄 입금 → 즉시 착수" },
              { n: 4, t: "제작 + 검수", d: "14~21일 내 완성" },
              { n: 5, t: "런칭 + 인수인계", d: "도메인 연결 + 광고 라이브" },
            ].map((s) => (
              <li key={s.n} className="card p-5">
                <div className="text-xs font-semibold text-brand-700">STEP {s.n}</div>
                <div className="mt-1 text-sm font-bold">{s.t}</div>
                <div className="mt-1 text-xs text-ink-500">{s.d}</div>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm text-ink-800">
            <div className="font-bold text-brand-900">결제 안내 — 100% 선수금</div>
            <p className="mt-2 leading-relaxed">
              계약과 동시에 제작비 전액(100%)을 한 번에 입금해 주시는 구조입니다.
              분할 결제·잔금 정산은 따로 두지 않습니다. 대신 14~21일 내 납품을 책임지고,
              납품 후 첫 1개월 무상 점검을 약속드립니다. 일정 안에 납품이 안 되면
              납품 시까지 지연 1일당 무상 유지보수 1일을 추가로 드립니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
