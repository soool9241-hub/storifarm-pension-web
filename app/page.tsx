import SixStageFunnel from "@/components/funnel/SixStageFunnel";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-wide py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white px-3 py-1 text-xs text-brand-700">
            <span>🐌</span>
            <span>7년차 펜션 운영자가 직접 만드는 시스템</span>
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-ink-900 sm:text-5xl">
            홈페이지 만드는 개발자가 아닙니다.
            <br />
            <span className="text-brand-700">펜션으로 매출 7배 만든 사장님</span>이
            <br />
            시스템을 복제해드립니다.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ink-700 sm:text-lg">
            전북 완주 소양면에서 7년째 <b>달팽이아지트</b>를 직접 운영하며
            2021년 매출 1,210만원 → 2025년 8,248만원, 7배 성장을 만든 임솔이
            그 시스템을 펜션 사장님들에게 그대로 넘깁니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/diagnostic" className="btn-primary">
              무료 온라인 진단 시작 →
            </a>
            <a
              href="https://dalpaengi-five.vercel.app"
              target="_blank"
              rel="noopener"
              className="btn-ghost"
            >
              실제 운영 중인 달팽이아지트 사이트 보기
            </a>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "펜션 운영", v: "7년차" },
              { k: "숙박 고객", v: "7,000명" },
              { k: "에어비앤비 평점", v: "5.0" },
              { k: "실전 예약 데이터", v: "304건" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-ink-100 bg-white p-4">
                <div className="label">{s.k}</div>
                <div className="mt-1 text-xl font-bold text-brand-900">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOT AN AGENCY */}
      <section className="border-b border-ink-100">
        <div className="container-wide py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">
            광고대행사는 펜션을 운영해본 적이 없습니다.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-700">
            부재중 전화 한 통이 예약 한 건이라는 걸, 체크인 전날 문자 한 통이
            리뷰 점수를 올린다는 걸, 네이버 키워드 37개 중 실제 전환되는 건 5개
            뿐이라는 걸 — 직접 운영해보지 않으면 모릅니다.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100">
            <table className="w-full text-sm">
              <thead className="bg-ink-100/40 text-ink-700">
                <tr>
                  <th className="p-3 text-left font-medium">항목</th>
                  <th className="p-3 text-left font-medium">일반 웹에이전시</th>
                  <th className="p-3 text-left font-medium text-brand-700">스토리팜</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {[
                  ["펜션 운영 경험", "없음", "7년 · 7,000명 숙박"],
                  ["예약 데이터 분석", "없음", "실전 304건 기반"],
                  ["네이버 광고 운영", "별도 대행사", "직접 운영 (5그룹 37키워드)"],
                  ["SMS 자동화", "없음", "포함 · Solapi 연동"],
                  ["모객 전략 컨설팅", "없음", "데이터 기반 맞춤 전략"],
                  ["제작 후 책임", "유지보수 별도", "운영자 직접 1:1 지원"],
                ].map(([k, a, b]) => (
                  <tr key={k}>
                    <td className="p-3 font-medium">{k}</td>
                    <td className="p-3 text-ink-500">{a}</td>
                    <td className="p-3 font-medium text-brand-700">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6-STAGE FUNNEL */}
      <section className="border-b border-ink-100 bg-ink-100/20">
        <div className="container-narrow py-16">
          <div className="mb-6">
            <div className="label">시스템 구조</div>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              6단계 자동 매출 퍼널
            </h2>
            <p className="mt-2 text-sm text-ink-700">
              달팽이아지트에서 검증한 구조 그대로 복제합니다.
            </p>
          </div>
          <SixStageFunnel />
          <div className="mt-5 text-xs text-ink-500">
            <b>자동화 포인트:</b> S1 진단도구 자동 · S2 리포트 자동생성 · S3 템플릿
            복제 · S4 n8n 알림 · S5 녹화 강의 · S6 파트너가 제작 대행
          </div>
        </div>
      </section>

      {/* DALPAENGI RESULTS */}
      <section className="border-b border-ink-100">
        <div className="container-wide py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">달팽이아지트 실적</h2>
          <p className="mt-3 text-ink-700">
            시스템을 만들면 매출이 따라옵니다. 광고비가 아니라 구조가 답입니다.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-6">
              <div className="label">2021년</div>
              <div className="mt-1 text-3xl font-bold">1,210만원</div>
              <div className="mt-1 text-sm text-ink-500">예약 16건 · OTA 의존</div>
            </div>
            <div className="card p-6 ring-2 ring-brand-500">
              <div className="label text-brand-700">2025년</div>
              <div className="mt-1 text-3xl font-bold text-brand-900">8,248만원</div>
              <div className="mt-1 text-sm text-brand-700">예약 94건 · 자체 예약 58%</div>
              <div className="mt-2 inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                7배 성장
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            * 실제 운영 사이트 —{" "}
            <a
              href="https://dalpaengi-five.vercel.app"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              dalpaengi-five.vercel.app
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 text-white">
        <div className="container-wide py-16 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            먼저 사장님 펜션의 온라인 상태부터 봐드릴게요
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">
            3분이면 끝납니다. 20개 항목 체크 → 맞춤 리포트 자동 발송.
            제작 의뢰 여부는 그 다음에 판단하셔도 됩니다.
          </p>
          <a
            href="/diagnostic"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
          >
            무료 온라인 진단 시작 →
          </a>
        </div>
      </section>
    </>
  );
}
