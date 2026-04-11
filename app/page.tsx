import CustomerJourney from "@/components/funnel/CustomerJourney";

export default function Home() {
  return (
    <>
      {/* HERO — 운영자의 편지 */}
      <section className="border-b border-ink-100">
        <div className="container-narrow py-20 sm:py-28">
          <div className="label">펜션 사장님께 드리는 편지</div>

          <h1 className="mt-3 text-[26px] font-bold leading-snug text-ink-900 sm:text-[34px]">
            안녕하세요 사장님,<br />
            저는 60평 대형 펜션을 7년째 직접 돌리고 있는 사람입니다.
          </h1>

          <div className="mt-10 space-y-5 text-[15px] leading-[1.9] text-ink-700 sm:text-base">
            <p>
              처음엔 저도 홈페이지 같은 건 만들 생각도 없었어요. 에어비앤비에
              올리고, 야놀자에 올리고, 전화 오면 받고. 그게 전부였습니다.
              그렇게 5년이 지났는데, 통장을 보니 매달 OTA 수수료로만 수십만원이
              빠져나가고 있더라고요.
            </p>

            <p>
              “이 돈이면 홈페이지 하나 제대로 만들 수 있는 거 아니야?” 싶어서
              대행사 몇 군데에 견적을 받아봤는데, 200만원, 400만원, 800만원.
              가격표는 있었지만 정작 <b>펜션을 운영해본 사람은 아무도 없었어요.</b>
              체크인 전날 문자 한 통이 리뷰 점수를 올린다는 걸, 부재중 전화 한
              통이 예약 한 건이라는 걸 — 운영을 해보지 않으면 모르는 걸,
              대행사는 당연히 모르더라고요.
            </p>

            <p>
              그래서 제가 직접 만들었습니다. 홈페이지, 예약 시스템, SMS
              자동화, 네이버 광고 37키워드, 재방문 트리거까지. 하나하나 제
              펜션에서 테스트해보면서 5년을 쌓았어요. 그 결과는 이겁니다 —{" "}
              <b>2021년 매출 1,210만원 → 2025년 8,248만원, 7배 성장.</b>
            </p>

            <p>
              그러다 주변 펜션 사장님들이 물어보시더라고요. “그거 어떻게
              한 거예요? 우리도 해줄 수 있어요?” 처음엔 한두 명 도와드렸는데,
              “이거 제대로 서비스로 만들어보세요”라는 말을 계속 들었습니다.
              그래서 이 페이지를 만들었어요.
            </p>

            <p>
              저는 홈페이지 만드는 개발자가 아닙니다. 펜션으로 먹고 사는
              사장님이에요. 그래서 다른 에이전시가 못 해드리는 걸 해드릴 수
              있습니다. <b>제가 쓰고 있는 시스템을 그대로 복제해드리는 거죠.</b>
              억지로 팔 생각 없습니다. 일단 사장님 펜션 상태부터 제가 무료로
              봐드리고, 필요한 단계만 골라 가시면 됩니다.
            </p>
          </div>

          <div className="mt-10 flex items-end justify-between border-t border-ink-100 pt-6">
            <div className="text-sm text-ink-500">
              <div>전북 완주 소양면에서</div>
              <div className="mt-1 text-base font-semibold text-ink-900">
                임솔 드림
              </div>
              <div className="mt-0.5 text-xs">달팽이아지트 펜션 대표 · 7년차</div>
            </div>
            <a
              href="https://dalpaengi-five.vercel.app"
              target="_blank"
              rel="noopener"
              className="text-xs text-ink-500 underline underline-offset-4 hover:text-ink-900"
            >
              제가 운영하는 펜션 보러가기 ↗
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <a href="/diagnostic" className="btn-primary">
              먼저 무료 진단부터 받아보기 →
            </a>
            <a href="/contact" className="btn-ghost">
              바로 30분 상담 신청
            </a>
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

      {/* CUSTOMER JOURNEY */}
      <section className="border-b border-ink-100">
        <div className="container-narrow py-20 sm:py-24">
          <div className="mb-12 max-w-xl">
            <div className="label">사장님의 여정</div>
            <h2 className="mt-2 text-2xl font-bold leading-snug text-ink-900 sm:text-3xl">
              진단부터 운영까지, <br className="sm:hidden" />
              같이 갑니다.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              한 번에 다 하실 필요 없어요. 사장님 상황에 맞는 단계부터 시작하시면
              됩니다. 억지로 제작 의뢰할 필요도 없고요.
            </p>
          </div>
          <CustomerJourney />
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
