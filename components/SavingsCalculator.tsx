"use client";

import { useMemo, useRef, useState } from "react";

const SPACES = [1, 2, 3, 5];
const BOOKINGS = [5, 10, 20, 30, 50];
const ADR = [10, 15, 20, 30, 50];
const OTA = [30, 50, 70, 100];
const AD = [0, 10, 30, 50, 100];

const OTA_FEE_RATE = 0.15;
const SHIFT_RATE = 0.5;
const AD_EFFICIENCY = 0.3;
const NEW_REVENUE_RATE = 0.15;

const TIERS = {
  light: {
    name: "시작 패키지",
    tagline: "기본 구축",
    monthly: 39,
    promo: 29,
    promoNote: "선착순 5팀 한정 월 29만",
    note: "단기 / 월 결제",
    href: "/contact?tier=light",
    desc: "지금 막 시작하시는 사장님 — 도메인 + 예약 받을 페이지 + 기본 SMS만 깔끔하게 세팅. 부담 없이 월별로 쓰면서 효과부터 보세요.",
  },
  standard: {
    name: "성장 패키지",
    tagline: "플랫폼 + 홍보",
    monthly: 69,
    note: "1년 약정",
    href: "/contact?tier=standard",
    desc: "사장님 규모에 가장 잘 맞는 패키지. 홈페이지 + 예약 자동화 + SMS 5종 + 네이버 키워드 10개 셋팅 (광고비 월 15만 실비)까지 통째로 — 1년 안에 충분히 회수됩니다.",
  },
  premium: {
    name: "완성 패키지",
    tagline: "플랫폼 + 홍보 + 예약분석",
    monthly: 99,
    note: "1년 약정",
    href: "/contact?tier=premium",
    desc: "공간 여러 개를 운영하시는 사장님용. 풀커스텀 + 광고 컨설팅 + 매월 데이터 리뷰 + 콘텐츠 제작 지원까지 함께 들어갑니다.",
  },
} as const;

export default function SavingsCalculator() {
  const [spaces, setSpaces] = useState<number | null>(null);
  const [bookings, setBookings] = useState<number | null>(null);
  const [adr, setAdr] = useState<number | null>(null);
  const [ota, setOta] = useState<number | null>(null);
  const [ad, setAd] = useState<number | null>(null);
  const [calculated, setCalculated] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const allFilled =
    spaces !== null && bookings !== null && adr !== null && ota !== null && ad !== null;

  const result = useMemo(() => {
    if (!allFilled) return null;
    const s = spaces!;
    const b = bookings!;
    const a = adr!;
    const o = ota!;
    const d = ad!;

    const monthlyRevenue = s * b * a;
    const monthlyOtaRevenue = monthlyRevenue * (o / 100);
    const monthlyOtaFee = monthlyOtaRevenue * OTA_FEE_RATE;
    const yearlyOtaFee = monthlyOtaFee * 12;
    const yearlyAdSpend = d * 12;
    const yearlyTotalSpend = yearlyOtaFee + yearlyAdSpend;

    const yearlyFeeSaving = monthlyOtaFee * SHIFT_RATE * 12;
    const yearlyAdSaving = d * AD_EFFICIENCY * 12;
    const yearlyNewRevenue = monthlyRevenue * NEW_REVENUE_RATE * 12;
    const totalBenefit = Math.round(yearlyFeeSaving + yearlyAdSaving + yearlyNewRevenue);

    let tier: keyof typeof TIERS = "light";
    if (monthlyRevenue >= 1500 || s >= 3) tier = "premium";
    else if (monthlyRevenue >= 400) tier = "standard";

    const tierMonthly = TIERS[tier].monthly;
    const tierYearly = tierMonthly * 12;
    const monthlyBenefit = Math.round(totalBenefit / 12);
    const monthlyNet = monthlyBenefit - tierMonthly;
    const yearlyNet = totalBenefit - tierYearly;

    const paybackMonths =
      monthlyBenefit > 0 ? Math.max(1, Math.ceil(tierYearly / monthlyBenefit)) : null;

    return {
      monthlyRevenue,
      monthlyOtaRevenue,
      monthlyOtaFee,
      yearlyOtaFee: Math.round(yearlyOtaFee),
      yearlyAdSpend: Math.round(yearlyAdSpend),
      yearlyTotalSpend: Math.round(yearlyTotalSpend),
      yearlyFeeSaving: Math.round(yearlyFeeSaving),
      yearlyAdSaving: Math.round(yearlyAdSaving),
      yearlyNewRevenue: Math.round(yearlyNewRevenue),
      totalBenefit,
      tier,
      tierMonthly,
      tierYearly,
      monthlyBenefit,
      monthlyNet,
      yearlyNet,
      paybackMonths,
    };
  }, [spaces, bookings, adr, ota, ad, allFilled]);

  function calculate() {
    if (!allFilled) return;
    setCalculated(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function reset() {
    setSpaces(null);
    setBookings(null);
    setAdr(null);
    setOta(null);
    setAd(null);
    setCalculated(false);
  }

  return (
    <div className="card overflow-hidden">
      {/* Inputs */}
      <div className="space-y-5 p-5 sm:p-7">
        <Pick label="① 운영 중인 공간 갯수" value={spaces} options={SPACES} onChange={setSpaces} suffix="개" />
        <Pick label="② 공간당 월평균 예약 건수" value={bookings} options={BOOKINGS} onChange={setBookings} suffix="건" />
        <Pick label="③ 예약 1건당 평균 객단가" value={adr} options={ADR} onChange={setAdr} suffix="만원" />
        <Pick label="④ 현재 야놀자·에어비앤비 등 OTA 의존 비중" value={ota} options={OTA} onChange={setOta} suffix="%" />
        <Pick label="⑤ 현재 월 평균 광고비" value={ad} options={AD} onChange={setAd} suffix="만원" />

        <div className="border-t border-ink-100 pt-4">
          {!allFilled && (
            <div className="mb-3 text-center text-[12px] text-ink-500 sm:text-xs">
              5개 항목을 모두 골라주시면 계산할 수 있어요.
            </div>
          )}
          <button
            type="button"
            onClick={calculate}
            disabled={!allFilled}
            className={`w-full rounded-xl px-6 py-3.5 text-[15px] font-semibold transition ${
              allFilled
                ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20 hover:bg-brand-700"
                : "bg-ink-100 text-ink-500"
            }`}
          >
            {allFilled ? "수수료 계산하기 →" : "5개 항목을 모두 체크해주세요"}
          </button>
          {calculated && (
            <button
              type="button"
              onClick={reset}
              className="mt-2 w-full rounded-xl border border-ink-100 bg-white px-6 py-2 text-[12px] text-ink-700 hover:bg-ink-100/40 sm:text-xs"
            >
              처음부터 다시 계산하기
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {calculated && result && (
        <div ref={resultRef} className="border-t border-ink-100 bg-brand-50 px-5 py-6 sm:px-7 sm:py-8">
          {/* 1. 항목별 계산 */}
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="text-[11px] font-semibold tracking-wider text-brand-700 sm:text-xs">
              ❶ 항목별 계산
            </div>
            <h3 className="mt-1 text-base font-bold text-ink-900 sm:text-lg">
              사장님 입력값으로 계산해보면
            </h3>
            <div className="mt-4 space-y-2 text-[13px] sm:text-sm">
              <Row k="월 매출 (공간 × 예약 × 단가)" v={`${result.monthlyRevenue.toLocaleString()}만원`} />
              <Row k={`└ OTA 의존 매출 (${ota}%)`} v={`${Math.round(result.monthlyOtaRevenue).toLocaleString()}만원`} />
              <Row k={`└ OTA 수수료 (월, 평균 15% 적용)`} v={`${Math.round(result.monthlyOtaFee).toLocaleString()}만원`} bold />
              <div className="my-2 border-t border-dashed border-ink-100" />
              <Row k="연간 OTA 수수료 (월 × 12)" v={`${result.yearlyOtaFee.toLocaleString()}만원`} />
              <Row k="연간 광고비 지출" v={`${result.yearlyAdSpend.toLocaleString()}만원`} />
            </div>
          </div>

          {/* 2. 연간 지출되는 예상금액 (현재 구조) */}
          <div className="mt-4 rounded-2xl border-2 border-red-200 bg-red-50 p-5 text-center sm:p-6">
            <div className="text-[11px] font-semibold tracking-wider text-red-700 sm:text-xs">
              ❷ 지금 구조 그대로면, 1년에 빠져나가는 돈
            </div>
            <div className="mt-2 text-3xl font-bold text-red-900 sm:text-4xl">
              {result.yearlyTotalSpend.toLocaleString()}
              <span className="text-lg font-medium sm:text-xl"> 만원</span>
            </div>
            <div className="mt-2 text-[11px] text-red-700 sm:text-xs">
              OTA 수수료 {result.yearlyOtaFee.toLocaleString()}만 + 광고비 {result.yearlyAdSpend.toLocaleString()}만 = 매년 새는 돈
            </div>
          </div>

          {/* 3. 우리 시스템 도입 시 절감액 */}
          <div className="mt-4 rounded-2xl border-2 border-brand-500 bg-white p-5 sm:p-6">
            <div className="text-[11px] font-semibold tracking-wider text-brand-700 sm:text-xs">
              ❸ 우리 시스템 도입 시, 1년 아껴지는 돈
            </div>
            <div className="mt-2 text-center">
              <div className="text-4xl font-bold text-brand-900 sm:text-5xl">
                {result.totalBenefit.toLocaleString()}
                <span className="text-lg font-medium text-brand-700 sm:text-xl"> 만원</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-[13px] sm:text-sm">
              <Row k="ⓐ OTA 수수료 절감 (자체예약 50% 전환)" v={`+${result.yearlyFeeSaving.toLocaleString()}만`} highlight />
              <Row k="ⓑ 광고비 효율화 (낭비 키워드 제거)" v={`+${result.yearlyAdSaving.toLocaleString()}만`} highlight />
              <Row k="ⓒ 자체 채널 신규 매출 (+15% 가정)" v={`+${result.yearlyNewRevenue.toLocaleString()}만`} highlight />
            </div>
          </div>

          {/* 4. 추천 패키지 + 회수 기간 */}
          <div className="mt-4 rounded-2xl bg-brand-900 p-5 text-white sm:p-6">
            <div className="text-[11px] font-semibold tracking-wider text-brand-100 sm:text-xs">
              ❹ 사장님 규모에 가장 잘 맞는 패키지
            </div>
            <div className="mt-1">
              <div className="text-[11px] font-medium text-brand-100">{TIERS[result.tier].tagline}</div>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
                <div className="text-2xl font-bold sm:text-3xl">{TIERS[result.tier].name}</div>
                <div className="text-base font-semibold text-brand-100">
                  월 {result.tierMonthly}만원
                </div>
                <div className="text-xs text-brand-100">({TIERS[result.tier].note})</div>
              </div>
            </div>
            {result.tier === "light" && (
              <div className="mt-2 inline-flex items-center rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-bold text-brand-900 sm:text-xs">
                🎁 선착순 5팀 한정 월 29만원 (10만원 할인)
              </div>
            )}
            <p className="mt-2 text-[12px] leading-relaxed text-brand-100 sm:text-sm">
              {TIERS[result.tier].desc}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-white/10 p-3 text-center sm:gap-3 sm:p-4">
              <div>
                <div className="text-[10px] font-medium text-brand-100 sm:text-[11px]">월 효과</div>
                <div className="mt-0.5 text-sm font-bold sm:text-base">
                  +{result.monthlyBenefit.toLocaleString()}만
                </div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-brand-100 sm:text-[11px]">월 비용</div>
                <div className="mt-0.5 text-sm font-bold sm:text-base">
                  −{result.tierMonthly}만
                </div>
              </div>
              <div className="border-l border-white/20 pl-2 sm:pl-3">
                <div className="text-[10px] font-medium text-brand-100 sm:text-[11px]">월 순이익</div>
                <div className="mt-0.5 text-sm font-bold sm:text-base">
                  {result.monthlyNet >= 0 ? "+" : ""}
                  {result.monthlyNet.toLocaleString()}만
                </div>
              </div>
            </div>

            {result.paybackMonths && (
              <div className="mt-3 rounded-xl bg-white p-3 text-center sm:p-4">
                <div className="text-[11px] font-semibold tracking-wider text-brand-700 sm:text-xs">
                  도입비 회수 예상 기간
                </div>
                <div className="mt-0.5 text-2xl font-bold text-brand-900 sm:text-3xl">
                  약 {result.paybackMonths}개월
                </div>
                <div className="mt-1 text-[11px] text-ink-500 sm:text-xs">
                  ({TIERS[result.tier].name} 1년 비용 {result.tierYearly}만원 ÷ 월 절감액 {result.monthlyBenefit}만원)
                </div>
              </div>
            )}

            <a href={TIERS[result.tier].href} className="mt-5 block w-full rounded-xl bg-white px-6 py-3.5 text-center text-[15px] font-semibold text-brand-900 shadow-lg shadow-black/20 transition hover:bg-brand-50">
              이 추천대로 상담 신청 →
            </a>
          </div>

          <p className="mt-4 text-center text-[10px] leading-relaxed text-ink-500 sm:text-[11px]">
            * 계산은 OTA 수수료 평균 15%, 자체 예약 50% 전환, 광고비 효율 30% 개선,
            자체 채널 확보 후 신규 매출 +15% 가정 기반의 추정치입니다.
            실제 효과는 사장님 공간 데이터로 무료 진단 후 정확히 산출해드립니다.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, bold, highlight }: { k: string; v: string; bold?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`text-ink-700 ${bold ? "font-semibold" : ""}`}>{k}</span>
      <span
        className={`shrink-0 ${
          bold ? "font-bold text-brand-900" : highlight ? "font-bold text-brand-700" : "font-medium text-ink-900"
        }`}
      >
        {v}
      </span>
    </div>
  );
}

function Pick({
  label,
  value,
  options,
  onChange,
  suffix,
}: {
  label: string;
  value: number | null;
  options: number[];
  onChange: (v: number) => void;
  suffix: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-ink-900 sm:text-sm">{label}</div>
        {value !== null && (
          <div className="text-[10px] font-bold text-brand-700 sm:text-[11px]">✓ 체크완료</div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-xl border px-3 py-2 text-[12px] font-medium transition sm:px-4 sm:text-sm ${
                active
                  ? "border-brand-500 bg-brand-50 text-brand-900"
                  : "border-ink-100 bg-white text-ink-700 hover:bg-ink-100/40"
              }`}
            >
              {opt}
              {opt === options[options.length - 1] && suffix !== "%" ? "+" : ""}
              {suffix}
            </button>
          );
        })}
      </div>
    </div>
  );
}
