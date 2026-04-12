import CustomerJourney from "@/components/funnel/CustomerJourney";
import RevenueChart from "@/components/RevenueChart";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink-100">
        <div className="container-narrow py-12 text-center sm:py-24">
          <div className="label">공간대관 사업자님께 드리는 편지</div>

          <h1 className="mt-3 text-[20px] font-bold leading-snug text-ink-900 sm:text-[32px]">
            00평 공간 7년간 매출 7배 성장
            <br />
            공간대관 사업 운영중인 운영자입니다!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-[12px] text-ink-500 sm:text-sm">
            펜션 / 파티룸 / 스튜디오 / 캠핑장 / 독채 - 공간을 빌려주는 모든 사업자를 위한 서비스입니다.
          </p>

          <div className="mx-auto mt-8 max-w-xl space-y-4 text-left text-[14px] leading-[1.85] text-ink-700 sm:mt-10 sm:space-y-5 sm:text-base sm:leading-[1.9]">
            <p>
              처음엔 저도 홈페이지 같은 건 만들 생각도 없었어요. 에어비앤비에
              올리고, 야놀자에 올리고, 전화 오면 받고. 그게 전부였습니다.
              그렇게 5년이 지났는데, 통장을 보니 매달 OTA 수수료로만 수십만원이
              빠져나가고 있더라고요.
            </p>

            <p>
              &quot;이 돈이면 홈페이지 하나 제대로 만들 수 있는 거 아니야?&quot; 싶어서
              대행사 몇 군데에 견적을 받아봤는데, 200만원, 400만원, 800만원.
              가격표는 있었지만 정작 <b>공간대관 사업을 직접 해본 사람은 아무도 없었어요.</b>
              체크인 전날 문자 한 통이 리뷰 점수를 올린다는 걸, 부재중 전화 한
              통이 예약 한 건이라는 걸 - 운영을 해보지 않으면 모르는 걸,
              대행사는 당연히 모르더라고요.
            </p>

            <p>
              그래서 제가 직접 만들었습니다. 홈페이지, 예약 시스템, SMS
              자동화, 네이버 광고 37키워드, 재방문 트리거까지. 하나하나 제
              공간에서 테스트해보면서 5년을 쌓았어요. 그 결과는, 매출이
              예전과는 비교가 안 될 정도로 달라졌습니다.
            </p>

            <p>
              그러다 주변 공간대관 사업자분들이 물어보시더라고요. &quot;그거 어떻게
              한 거예요? 우리도 해줄 수 있어요?&quot; 처음엔 한두 명 도와드렸는데,
              &quot;이거 제대로 서비스로 만들어보세요&quot;라는 말을 계속 들었습니다.
              그래서 이 페이지를 만들었어요.
            </p>

            <p>
              저는 홈페이지 만드는 개발자가 아닙니다. 공간대관 사업으로 먹고 사는
              사업자예요. 그래서 다른 에이전시가 못 해드리는 걸 해드릴 수
              있습니다. <b>제가 쓰고 있는 시스템을 그대로 복제해드리는 거죠.</b>
              억지로 팔 생각 없습니다. 일단 사장님 공간 상태부터 제가 무료로
              봐드리고, 필요한 단계만 골라 가시면 됩니다.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl border-t border-ink-100 pt-5 text-center sm:mt-12 sm:pt-6">
            <div className="text-xs text-ink-500 sm:text-sm">이름 없이 편지를 드립니다</div>
            <div className="mt-1 text-sm font-semibold text-ink-900 sm:text-base">
              7년차 공간대관 사업 운영자 드림
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <a href="/diagnostic" className="btn-primary w-full sm:w-auto">
              먼저 무료 진단부터 받아보기 →
            </a>
            <a href="/contact" className="btn-ghost w-full sm:w-auto">
              바로 30분 상담 신청
            </a>
          </div>
        </div>
      </section>

      {/* WHY NOT AN AGENCY */}
      <section className="border-b border-ink-100">
        <div className="container-wide py-12 sm:py-16">
          <h2 className="text-xl font-bold leading-snug sm:text-3xl">
            광고대행사는 공간대관 사업을 해본 적이 없습니다.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700 sm:text-base">
            부재중 전화 한 통이 예약 한 건이라는 걸, 체크인 전날 문자 한 통이
            리뷰 점수를 올린다는 걸, 네이버 키워드 37개 중 실제 전환되는 건 5개
            뿐이라는 걸 - 직접 운영해보지 않으면 모릅니다.
          </p>

          {/* Mobile: stacked compare cards */}
          <div className="mt-6 space-y-3 sm:hidden">
            {[
              ["공간대관 운영 경험", "없음", "7년 / 7,000명 이용"],
              ["예약 데이터 분석", "없음", "실전 304건 기반"],
              ["네이버 광고 운영", "별도 대행사", "직접 운영 (5그룹 37키워드)"],
              ["SMS 자동화", "없음", "포함 / Solapi 연동"],
              ["모객 전략 컨설팅", "없음", "데이터 기반 맞춤 전략"],
              ["제작 후 책임", "유지보수 별도", "운영자 직접 1:1 지원"],
            ].map(([k, a, b]) => (
              <div key={k} className="rounded-2xl border border-ink-100 p-4">
                <div className="text-[13px] font-semibold text-ink-900">{k}</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
                  <div className="rounded-lg bg-ink-100/40 p-2">
                    <div className="text-[10px] text-ink-500">일반 에이전시</div>
                    <div className="mt-0.5 text-ink-500">{a}</div>
                  </div>
                  <div className="rounded-lg bg-brand-50 p-2">
                    <div className="text-[10px] text-brand-700">운영자 직접</div>
                    <div className="mt-0.5 font-semibold text-brand-900">{b}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-ink-100 sm:block">
            <table className="w-full text-sm">
              <thead className="bg-ink-100/40 text-ink-700">
                <tr>
                  <th className="p-3 text-left font-medium">항목</th>
                  <th className="p-3 text-left font-medium">일반 웹에이전시</th>
                  <th className="p-3 text-left font-medium text-brand-700">운영자 직접 제작</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {[
                  ["공간대관 운영 경험", "없음", "7년 / 7,000명 이용"],
                  ["예약 데이터 분석", "없음", "실전 304건 기반"],
                  ["네이버 광고 운영", "별도 대행사", "직접 운영 (5그룹 37키워드)"],
                  ["SMS 자동화", "없음", "포함 / Solapi 연동"],
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

      {/* PRODUCTS */}
      <section className="border-b border-ink-100">
        <div className="container-wide py-12 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="label">사장님이 고를 수 있는 4가지</div>
            <h2 className="mt-2 text-xl font-bold leading-snug text-ink-900 sm:text-3xl">
              필요한 것만 고르시면 됩니다
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-500 sm:text-base">
              전부 다 하실 필요 없어요. <b>모든 건 무료 진단에서 시작</b>합니다.
              사장님 공간 상태부터 본 다음, 4가지 중 필요한 것만 골라서 가시면 됩니다.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2">
            {[
              {
                tag: "제작",
                title: "공간대관 홈페이지 제작",
                price: "150만 ~ 500만원 (1회)",
                body: "라이트/스탠다드/프리미엄 3티어. 7년간 실전 검증한 템플릿 5종 중 하나를 고르시면 예약 시스템, SMS 자동화, 네이버 광고까지 14~21일 안에 세팅해드립니다.",
                fits: "홈페이지가 아예 없거나, OTA에만 의존 중인 공간대관 사업자",
              },
              {
                tag: "관리",
                title: "월 유지보수 구독",
                price: "월 5만 ~ 15만원",
                body: "홈페이지 완성 후 혼자 돌리기 어려운 사장님을 위한 월 관리. 콘텐츠 수정, 네이버 광고 키워드 점검, 방문자 리포트까지 대신 봐드립니다.",
                fits: "제작은 끝났지만 성수기 광고, 콘텐츠 업데이트가 막막한 사장님",
              },
              {
                tag: "교육",
                title: "4주 운영 아카데미",
                price: "4주 과정",
                body: "7년간 검증한 네이버 광고 37키워드, SMS 자동화, 재방문 트리거를 사장님이 직접 돌릴 수 있게 4주 아카데미로 이식해드립니다.",
                fits: "대행사 맡기긴 싫고 직접 광고를 돌리고 싶은 사장님",
              },
              {
                tag: "사업",
                title: "지역 파트너 라이선스",
                price: "1인 1지역 독점 (20명 한정)",
                body: "템플릿, 자동화, 광고 세팅을 그대로 드리고, 초기 3건은 제가 함께 만듭니다. 이 사업을 본인 지역에서 직접 운영하고 싶은 분을 위한 트랙입니다.",
                fits: "내 지역에서 이 사업을 직접 하고 싶은 분",
              },
            ].map((p) => (
              <div key={p.title} className="card flex flex-col p-5 text-left sm:p-6">
                <div className="inline-flex w-fit items-center rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                  {p.tag}
                </div>
                <h3 className="mt-3 text-base font-bold text-ink-900 sm:text-xl">
                  {p.title}
                </h3>
                <div className="mt-1 text-[11px] font-medium text-brand-700 sm:text-xs">{p.price}</div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-700 sm:text-sm">{p.body}</p>
                <div className="mt-4 border-t border-ink-100 pt-3 text-[11px] text-ink-500 sm:text-[12px]">
                  <b className="text-ink-700">이런 분께:</b> {p.fits}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-xl text-center">
            <p className="text-sm text-ink-700">
              어떤 걸 골라야 할지 모르시겠죠? <b>당연합니다.</b>
              <br className="hidden sm:block" />
              그래서 먼저 <b>무료 진단</b>부터 해드리는 거예요. 3분이면 끝나고,
              결과를 보고 필요한 것만 고르시면 됩니다.
            </p>
            <a
              href="/diagnostic"
              className="btn-primary mt-6 inline-flex w-full sm:w-auto"
            >
              3분 무료 진단으로 시작하기 →
            </a>
          </div>
        </div>
      </section>

      {/* CUSTOMER JOURNEY */}
      <section className="border-b border-ink-100">
        <div className="container-narrow py-12 sm:py-24">
          <div className="mb-8 max-w-xl sm:mb-12">
            <div className="label">사장님의 여정</div>
            <h2 className="mt-2 text-xl font-bold leading-snug text-ink-900 sm:text-3xl">
              진단부터 운영까지, <br className="sm:hidden" />
              같이 갑니다.
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-500 sm:text-sm">
              한 번에 다 하실 필요 없어요. 사장님 상황에 맞는 단계부터 시작하시면
              됩니다. 억지로 제작 의뢰할 필요도 없고요.
            </p>
          </div>
          <CustomerJourney />
        </div>
      </section>

      {/* RESULTS */}
      <section className="border-b border-ink-100">
        <div className="container-wide py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="label">실제 성장 그래프</div>
            <h2 className="mt-2 text-xl font-bold leading-snug sm:text-3xl">
              7년간 매출 7배 성장
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700 sm:text-base">
              시스템을 만들면 매출이 따라옵니다. 광고비가 아니라 구조가 답입니다.
            </p>
          </div>
          <div className="mt-8">
            <RevenueChart />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 text-white">
        <div className="container-wide py-12 text-center sm:py-16">
          <h2 className="text-xl font-bold leading-snug sm:text-3xl">
            먼저 사장님 공간의 온라인 상태부터 봐드릴게요
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-white/80 sm:text-sm">
            3분이면 끝납니다. 20개 항목 체크 후 맞춤 리포트 자동 발송.
            제작 의뢰 여부는 그 다음에 판단하셔도 됩니다.
          </p>
          <a
            href="/diagnostic"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[15px] font-semibold text-brand-900 shadow-xl shadow-black/20 transition hover:bg-brand-50 sm:mt-8 sm:w-auto"
          >
            무료 온라인 진단 시작 →
          </a>
        </div>
      </section>
    </>
  );
}
