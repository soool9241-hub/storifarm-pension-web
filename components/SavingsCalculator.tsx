"use client";

import { useMemo, useState } from "react";

const SPACES = [1, 2, 3, 5];
const BOOKINGS = [5, 10, 20, 30, 50];
const ADR = [10, 15, 20, 30, 50];
const OTA = [30, 50, 70, 100];
const AD = [0, 10, 30, 50, 100];

const OTA_FEE_RATE = 0.15;
const SHIFT_RATE = 0.5;
const AD_EFFICIENCY = 0.3;

const TIERS = {
  light: { name: "라이트", price: 150, href: "/contact?tier=light" },
  standard: { name: "스탠다드", price: 300, href: "/contact?tier=standard" },
  premium: { name: "프리미엄", price: 500, href: "/contact?tier=premium" },
} as const;

export default function SavingsCalculator() {
  const [spaces, setSpaces] = useState(1);
  const [bookings, setBookings] = useState(10);
  const [adr, setAdr] = useState(20);
  const [ota, setOta] = useState(70);
  const [ad, setAd] = useState(30);

  const result = useMemo(() => {
    const monthlyRevenue = spaces * bookings * adr;
    const monthlyOtaRevenue = monthlyRevenue * (ota / 100);
    const monthlyOtaFee = monthlyOtaRevenue * OTA_FEE_RATE;
    const yearlyOtaFee = monthlyOtaFee * 12;

    const monthlySaving = monthlyOtaFee * SHIFT_RATE;
    const yearlyFeeSaving = monthlySaving * 12;

    const yearlyAdSaving = ad * AD_EFFICIENCY * 12;

    const totalSaving = Math.round(yearlyFeeSaving + yearlyAdSaving);

    let tier: keyof typeof TIERS = "light";
    if (totalSaving >= 400) tier = "premium";
    else if (totalSaving >= 150) tier = "standard";
    const tierPrice = TIERS[tier].price;
    const paybackMonths = totalSaving > 0 ? Math.ceil(tierPrice / (totalSaving / 12)) : null;

    return {
      monthlyRevenue,
      yearlyOtaFee: Math.round(yearlyOtaFee),
      yearlyFeeSaving: Math.round(yearlyFeeSaving),
      yearlyAdSaving: Math.round(yearlyAdSaving),
      totalSaving,
      tier,
      tierPrice,
      paybackMonths,
    };
  }, [spaces, bookings, adr, ota, ad]);

  return (
    <div className="card overflow-hidden">
      {/* Inputs */}
      <div className="space-y-5 p-5 sm:p-7">
        <Pick label="운영 중인 공간 갯수" value={spaces} options={SPACES} onChange={setSpaces} suffix="개" />
        <Pick label="공간당 월평균 예약 건수" value={bookings} options={BOOKINGS} onChange={setBookings} suffix="건" />
        <Pick label="예약 1건당 평균 객단가" value={adr} options={ADR} onChange={setAdr} suffix="만원" />
        <Pick label="현재 야놀자·에어비앤비 등 OTA 의존 비중" value={ota} options={OTA} onChange={setOta} suffix="%" />
        <Pick label="현재 월 평균 광고비" value={ad} options={AD} onChange={setAd} suffix="만원" />
      </div>

      {/* Result */}
      <div className="border-t border-ink-100 bg-brand-50 px-5 py-6 sm:px-7 sm:py-8">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-wider text-brand-700 sm:text-xs">
            지금 구조 그대로면 연간 새는 돈
          </div>
          <div className="mt-1 text-2xl font-bold text-ink-500 line-through sm:text-3xl">
            {result.yearlyOtaFee.toLocaleString()}만원
          </div>
          <div className="mt-4 text-[11px] font-semibold tracking-wider text-brand-700 sm:text-xs">
            우리 시스템 도입 시 연간 절감액
          </div>
          <div className="mt-1 text-4xl font-bold text-brand-900 sm:text-5xl">
            {result.totalSaving.toLocaleString()}
            <span className="text-lg font-medium text-brand-700 sm:text-xl"> 만원</span>
          </div>
          <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 text-[11px] text-ink-700 sm:text-xs">
            <span className="rounded-full bg-white px-2.5 py-1">
              OTA 수수료 절감 {result.yearlyFeeSaving.toLocaleString()}만
            </span>
            <span className="rounded-full bg-white px-2.5 py-1">
              광고비 효율화 {result.yearlyAdSaving.toLocaleString()}만
            </span>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="text-[11px] font-semibold tracking-wider text-brand-700 sm:text-xs">
            맞춤 패키지 추천
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-xl font-bold text-ink-900 sm:text-2xl">
              {TIERS[result.tier].name} 패키지
            </div>
            <div className="text-sm text-ink-500">
              {result.tierPrice}만원 / 1회
            </div>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-700 sm:text-sm">
            {result.tier === "light" &&
              "지금 규모에선 가장 빠르게 시작할 수 있는 라이트가 적합합니다. 도메인 + 예약 받을 페이지 + 기본 SMS만 깔끔하게 세팅해드려요."}
            {result.tier === "standard" &&
              "사장님 규모면 스탠다드가 가장 효율적입니다. 홈페이지 + 예약 + SMS 자동화 + 네이버 광고 37키워드까지 통째로 세팅해드립니다."}
            {result.tier === "premium" &&
              "절감액이 큰 규모입니다. 프리미엄으로 가시면 풀커스텀 + 광고 컨설팅 3회 + 1개월 무상 유지보수까지 포함해 1년 안에 충분히 회수됩니다."}
          </p>
          {result.paybackMonths && result.paybackMonths > 0 && (
            <div className="mt-4 rounded-xl bg-brand-50 p-3 text-center">
              <div className="text-[11px] font-medium text-brand-700">제작비 회수 예상 기간</div>
              <div className="mt-0.5 text-base font-bold text-brand-900 sm:text-lg">
                약 {result.paybackMonths}개월
              </div>
            </div>
          )}
          <a href={TIERS[result.tier].href} className="btn-primary mt-5 w-full">
            이 추천대로 상담 신청 →
          </a>
          <p className="mt-3 text-center text-[10px] leading-relaxed text-ink-500 sm:text-[11px]">
            * 계산은 OTA 수수료 평균 15%, 자체 예약 50% 전환, 광고비 효율 30% 개선 가정 기반의 추정치입니다. 실제 절감액은 사장님 공간 데이터로 무료 진단 후 정확히 산출해드립니다.
          </p>
        </div>
      </div>
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
  value: number;
  options: number[];
  onChange: (v: number) => void;
  suffix: string;
}) {
  return (
    <div>
      <div className="text-[12px] font-semibold text-ink-900 sm:text-sm">{label}</div>
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
