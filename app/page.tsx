import CustomerJourney from "@/components/funnel/CustomerJourney";
import RevenueChart from "@/components/RevenueChart";
import SavingsCalculator from "@/components/SavingsCalculator";
import TierCards from "@/components/TierCards";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink-100">
        <div className="container-narrow py-12 text-center sm:py-24">
          <div className="label">공간운영자동화 올인원 서비스 · 사장님께 드리는 편지</div>

          <h1 className="mt-3 text-[20px] font-bold leading-snug text-ink-900 sm:text-[32px]">
            120평 공방 10년 · 60평 펜션 7년
            <br />
            제가 직접 운영하면서 만든 시스템입니다.
            <br />
            <span className="text-brand-700">매일매일 업데이트되고 있어요.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[12px] font-medium text-ink-700 sm:text-sm">
            공간대관 사업으로 매출 7배 성장 — 그 시스템을 그대로 복제해드립니다.
          </p>

          <p className="mx-auto mt-4 max-w-md text-[12px] text-ink-500 sm:text-sm">
            펜션 / 파티룸 / 스튜디오 / 캠핑장 / 독채 - 공간을 빌려주는 모든 사업자를 위한 서비스입니다.
            대행사가 만든 게 아니라, 제가 매일 운영하면서 다듬는 시스템이에요.
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
              120평 공방 10년 · 60평 펜션 7년 운영자 드림
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <a href="/diagnostic" className="btn-primary w-full sm:w-auto">
              먼저 무료 진단부터 받아보기 →
            </a>
            <a href="/contact?tier=light" className="btn-ghost w-full sm:w-auto">
              🎁 초기 혜택 받기 (선착순 5팀)
            </a>
          </div>
        </div>
      </section>

      {/* CTA — HERO 바로 아래 */}
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

      {/* TIER CARDS — 심플 카드 + 자세히 보기 모달 */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-white to-brand-50/30">
        <div className="container-wide py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="label">3단계 시스템</div>
            <h2 className="mt-2 text-xl font-bold leading-snug sm:text-3xl">
              시작 → 성장 → 완성
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700 sm:text-base">
              7년 운영하면서 진짜 필요한 것만 3단계로 추렸습니다.
              <br className="hidden sm:block" />
              <b>기본 구축 → 플랫폼+홍보 → 플랫폼+홍보+예약분석</b> — 카드의 <b>자세히 보기</b>로 포함 항목을 확인하세요.
            </p>
          </div>

          <div className="mt-10">
            <TierCards />
          </div>
        </div>
      </section>

      {/* SAVINGS CALCULATOR — 1년 아껴지는 비용 계산기 */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50/40 to-white">
        <div className="container-narrow py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="label">수수료 절감 1년 계산기</div>
            <h2 className="mt-2 text-xl font-bold leading-snug text-ink-900 sm:text-3xl">
              사장님 공간은 1년에 얼마가 새고 있을까요?
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-700 sm:text-base">
              5가지 정보만 골라주시면 OTA 수수료·광고비로 새는 돈을 1년치로 자동 계산하고,
              사장님 규모에 맞는 패키지를 그 자리에서 추천해드려요.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* COMING SOON — 완성 패키지 전용 프로그램 (수요 모이면 오픈) */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-wide py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold text-white sm:text-xs">
              SOLD OUT · 오픈 예정
            </div>
            <h2 className="mt-3 text-xl font-bold leading-snug sm:text-3xl">
              완성 패키지 사장님께만 열릴 프로그램
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-brand-100 sm:text-base">
              제가 7년 운영하며 만든 시스템 6가지. <b className="text-white">수요가 모이면 만듭니다.</b>
              <br className="hidden sm:block" />
              지금은 신청 받지 않습니다 — 사장님께 정말 필요한지부터 보고 만들어요.
              <br className="hidden sm:block" />
              완성 패키지 회원이 되시면 <b className="text-yellow-300">오픈 즉시 무상 우선 적용</b>됩니다.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:gap-4 lg:grid-cols-3">
            {[
              {
                icon: "🤖",
                tag: "AI 운영비서",
                title: "24시간 응답 AI 챗봇",
                body: "예약 문의·체크인 안내·환불 정책까지 사장님 운영 데이터로 학습한 챗봇이 자동 응대. 새벽 문의도 놓치지 않습니다.",
              },
              {
                icon: "📊",
                tag: "통합 대시보드",
                title: "다지점 매출·예약 통합 분석",
                body: "여러 공간을 운영하시는 사장님을 위한 한 화면 대시보드. OTA·자체예약·광고비·순이익까지 일별로 실시간 집계.",
              },
              {
                icon: "🎬",
                tag: "콘텐츠 제작",
                title: "AI 릴스·블로그 자동 생성",
                body: "제공해주신 사진·후기로 인스타 릴스 캡션·네이버 블로그 글까지 자동 생성. 콘텐츠 제작 시간을 한 자릿수로 줄여드립니다.",
              },
              {
                icon: "📈",
                tag: "다이내믹 가격",
                title: "시즌·요일·경쟁가 자동 가격 조정",
                body: "주변 펜션 가격·시즌·예약률을 실시간 반영해 자동 추천 단가. 사장님 승인만 누르면 바로 OTA에 반영.",
              },
              {
                icon: "💌",
                tag: "재방문 자동화",
                title: "다녀간 손님 재방문 캠페인",
                body: "1년 안에 다녀가신 손님 풀에서 시즌별 자동 카톡·문자 시퀀스 발송. 재방문 비율을 끌어올리는 자동 캠페인.",
              },
              {
                icon: "🌐",
                tag: "글로벌",
                title: "영문/일문 자동 번역 페이지",
                body: "외국인 손님이 늘고 있다면, 사장님 페이지를 영어·일본어 버전으로 자동 변환·관리. 에어비앤비 외 직접 예약 채널 확장.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="relative overflow-hidden rounded-2xl bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/20 sm:p-6"
              >
                <div className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  SOLD OUT
                </div>
                <div className="text-2xl opacity-90">{p.icon}</div>
                <div className="mt-2 inline-flex items-center rounded-full bg-yellow-300/90 px-2 py-0.5 text-[10px] font-bold text-brand-900">
                  {p.tag}
                </div>
                <h3 className="mt-2 text-base font-bold sm:text-lg">{p.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-brand-100 sm:text-[13px]">{p.body}</p>
                <div className="mt-4 cursor-not-allowed rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-center text-[11px] font-semibold text-brand-100 sm:text-xs">
                  지금은 신청 불가 · 오픈 예정
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-xl rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/20 sm:p-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-yellow-300 sm:text-xs">
              왜 지금 안 여는지
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-brand-100 sm:text-sm">
              저는 <b className="text-white">사장님 한 분이 진짜 쓸지 안 쓸지 확인되기 전엔 만들지 않습니다.</b>
              <br className="hidden sm:block" />
              완성 패키지 사장님이 일정 수 모이면, 그분들이 가장 원하시는 것부터 만들어 우선 오픈합니다.
              <br className="hidden sm:block" />
              <b className="text-yellow-300">수요가 없으면 공급도 없습니다.</b> 헛돈 안 들이는 게 제 원칙이에요.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl text-center">
            <a
              href="/contact?tier=premium"
              className="inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-[15px] font-semibold text-brand-900 shadow-xl transition hover:bg-brand-50 sm:w-auto"
            >
              완성 패키지 회원으로 우선권 받기 →
            </a>
            <p className="mt-3 text-[11px] text-brand-100 sm:text-xs">
              회원이 되시면 위 6가지가 오픈될 때 가장 먼저 안내드리고, 무상 우선 적용됩니다.
            </p>
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

      {/* RESULTS — 매출 성장 그래프 (마지막 증거 섹션) */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-white to-brand-50/40">
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

    </>
  );
}
