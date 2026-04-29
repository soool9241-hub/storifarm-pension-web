"use client";

import { useEffect, useState } from "react";

type TierKey = "light" | "standard" | "premium";

// 시작 패키지 마감일: 2026-04-30 자정 (KST)
const PROMO_DEADLINE = new Date("2026-04-30T23:59:59+09:00");
const SLOTS_TOTAL = 5;
const SLOTS_LEFT = 2;

function useCountdown(deadline: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  const diff = deadline.getTime() - now.getTime();
  if (diff <= 0) return { expired: true as const };
  return {
    expired: false as const,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

function usePromoActive(deadline: Date) {
  // Optimistic true to keep SEO/initial paint showing promo;
  // flips to actual value on client mount.
  const [active, setActive] = useState(true);
  useEffect(() => {
    const check = () => setActive(deadline.getTime() > Date.now());
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return active;
}

function UrgencyBanner({ compact = false }: { compact?: boolean }) {
  const t = useCountdown(PROMO_DEADLINE);
  if (!t) {
    return (
      <div
        className={`rounded-xl bg-red-50 px-3 py-2 text-center font-bold text-red-700 ${
          compact ? "text-[11px]" : "text-xs sm:text-sm"
        }`}
      >
        🔥 선착순 5자리 중 {SLOTS_LEFT}자리 남음 · 4/30 자정 마감
      </div>
    );
  }
  if (t.expired) {
    return (
      <div className="rounded-xl bg-ink-100/60 px-3 py-2 text-center text-xs text-ink-500">
        선착순 5팀 마감 — 다음 회차 안내드릴게요
      </div>
    );
  }
  return (
    <div className={`rounded-xl bg-red-50 px-3 py-2 text-center text-red-700 ${compact ? "" : "py-3"}`}>
      <div className={`font-bold ${compact ? "text-[11px]" : "text-xs sm:text-sm"}`}>
        🔥 5자리 중 {SLOTS_LEFT}자리 남음
      </div>
      <div className={`mt-0.5 font-mono font-bold tabular-nums ${compact ? "text-[12px]" : "text-sm sm:text-base"}`}>
        {t.days}일 {String(t.hours).padStart(2, "0")}:{String(t.mins).padStart(2, "0")}:{String(t.secs).padStart(2, "0")}
      </div>
      <div className={`mt-0.5 ${compact ? "text-[10px]" : "text-[11px]"} text-red-700/80`}>
        4월 30일 자정 마감 · 월 29만 (10만원 할인) 적용
      </div>
    </div>
  );
}

const TIERS: Record<
  TierKey,
  {
    name: string;
    tagline: string;
    price: number;
    note: string;
    promo?: string;
    summary: string;
    highlight?: boolean;
    keyPoints: string[];
    sections: { title: string; icon: string; items: string[] }[];
  }
> = {
  light: {
    name: "시작 패키지",
    tagline: "기본 구축",
    price: 39,
    note: "단기 / 월 결제",
    promo: "선착순 5팀 월 29만",
    summary: "지금 막 시작하시는 사장님",
    keyPoints: [
      "단일 랜딩페이지 + 도메인·호스팅",
      "예약 문의 폼 + SMS 1종 자동 발송",
      "노출 관리 (모달 자세히 보기)",
      "🎬 펜션 홍보 릴스 월 1회 (연 12회)",
    ],
    sections: [
      {
        title: "홈페이지 구축",
        icon: "🏠",
        items: [
          "단일 랜딩페이지 (한 화면 스크롤형)",
          "도메인 + 호스팅 1년 포함",
          "휴대폰 반응형 디자인",
          "예약 문의 폼",
          "SMS / 문자 자동 발송 1종 셋팅 (예약확인)",
        ],
      },
      {
        title: "노출 관리",
        icon: "🎯",
        items: [
          "네이버 광고 키워드 5개 직접 셋팅",
          "💰 월 광고비 10만원 패키지 가격에 포함 (별도 청구 X)",
          "네이버 플레이스 DIY 등록 가이드",
        ],
      },
      {
        title: "운영관리 교육",
        icon: "📚",
        items: ["셀프 운영 가이드북 제공", "콘텐츠 월 1회 업데이트 지원"],
      },
      {
        title: "펜션 홍보 릴스 제작",
        icon: "🎬",
        items: [
          "펜션 홍보용 릴스 월 1회 제작",
          "1년 누적 12개 릴스 (인스타·릴스·숏폼 활용)",
          "기획 + 촬영 가이드 + 편집 포함",
        ],
      },
    ],
  },
  standard: {
    name: "성장 패키지",
    tagline: "플랫폼 + 홍보",
    price: 69,
    note: "1년 약정",
    highlight: true,
    summary: "본격적으로 자체 예약 늘릴 분",
    keyPoints: [
      "풀 커스텀 홈페이지 + 달력형 실시간 예약·결제",
      "SMS / 문자 5종 자동 셋팅",
      "노출 관리 + 방문자 대시보드",
      "🎬 펜션 홍보 릴스 월 2회 (연 24회)",
    ],
    sections: [
      {
        title: "홈페이지 구축",
        icon: "🏠",
        items: [
          "풀 커스텀 홈페이지",
          "도메인 + 호스팅 + SSL",
          "휴대폰 반응형 디자인",
          "달력형 실시간 예약 시스템",
          "결제 연동 (토스페이먼츠)",
          "SMS / 문자 자동 발송 5종 셋팅 (예약·확정·체크인·체크아웃·후기)",
        ],
      },
      {
        title: "노출 관리",
        icon: "🎯",
        items: [
          "네이버 광고 키워드 10개 직접 셋팅",
          "💰 월 광고비 15만원 패키지 가격에 포함 (별도 청구 X)",
          "네이버 플레이스 직접 등록",
          "GA4 + Supabase 방문자 대시보드",
        ],
      },
      {
        title: "운영관리 교육",
        icon: "📚",
        items: [
          "셀프 운영 가이드북 제공",
          "1:1 운영 코칭 1회 (60분)",
          "콘텐츠 월 2회 업데이트 지원",
        ],
      },
      {
        title: "펜션 홍보 릴스 제작",
        icon: "🎬",
        items: [
          "펜션 홍보용 릴스 월 2회 제작",
          "1년 누적 24개 릴스 (인스타·릴스·숏폼 활용)",
          "기획 + 촬영 가이드 + 편집 포함",
        ],
      },
      {
        title: "지역 파트너쉽 제휴",
        icon: "🤝",
        items: [
          "지역 1인 독점 우선 안내",
          "파트너 레퍼럴 건당 보상",
          "3개월에 1번 사업자 네트워킹 모임",
        ],
      },
    ],
  },
  premium: {
    name: "완성 패키지",
    tagline: "플랫폼 + 홍보 + 예약분석",
    price: 99,
    note: "1년 약정",
    summary: "공간 여러 개를 운영하는 사장님",
    keyPoints: [
      "풀 커스텀 + 관리자 페이지 + 모객 분석 리포트",
      "SMS 5종 + 커스텀 문자 셋팅",
      "노출 관리 + 매월 1:1 광고 컨설팅 + 월 1회 전략회의",
      "🎬 펜션 홍보 릴스 월 3회 (연 36회)",
    ],
    sections: [
      {
        title: "홈페이지 구축",
        icon: "🏠",
        items: [
          "풀 커스텀 홈페이지 (다지점 통합 가능)",
          "도메인 + 호스팅 + SSL",
          "휴대폰 반응형 디자인",
          "달력형 실시간 예약 시스템",
          "결제 연동 (토스페이먼츠)",
          "SMS 5종 + 커스텀 문자 셋팅",
          "관리자 페이지 구축 (예약·매출·고객 통합 관리)",
          "모객 분석 리포트 (월 1회)",
          "전략회의 (월 1회 1:1)",
        ],
      },
      {
        title: "노출 관리",
        icon: "🎯",
        items: [
          "네이버 광고 키워드 20개 직접 셋팅",
          "💰 월 광고비 20만원 패키지 가격에 포함 (별도 청구 X)",
          "📈 광고비 증액 희망 시 협의 후 진행 가능",
          "네이버 플레이스 등록 + 최적화 컨설팅",
          "GA4 대시보드 + 매월 작전회의",
          "광고 1:1 컨설팅 매월 1회",
        ],
      },
      {
        title: "운영관리 교육",
        icon: "📚",
        items: [
          "셀프 운영 가이드북 제공",
          "1:1 운영 코칭 매월 1회",
          "콘텐츠 제작 지원 매월 2건",
        ],
      },
      {
        title: "펜션 홍보 릴스 제작",
        icon: "🎬",
        items: [
          "펜션 홍보용 릴스 월 3회 제작",
          "1년 누적 36개 릴스 (인스타·릴스·숏폼·유튜브 활용)",
          "기획 + 촬영 + 편집 + 자막·BGM 풀 패키지",
        ],
      },
      {
        title: "지역 파트너쉽 제휴",
        icon: "🤝",
        items: [
          "지역 1인 독점 즉시 등록",
          "파트너 레퍼럴 건당 + 월 분배",
          "매월 1회 사업자 네트워킹 + 파트너쉽 관계",
        ],
      },
      {
        title: "평생 업데이트 시스템",
        icon: "♾",
        items: [
          "시스템 자동 업데이트 (매일)",
          "신규 기능 베타 우선 적용",
          "긴급 대응: 24시간 핫라인",
        ],
      },
    ],
  },
};

export default function TierCards() {
  const promoActive = usePromoActive(PROMO_DEADLINE);

  return (
    <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
      {(Object.keys(TIERS) as TierKey[]).map((key) => {
        const t = TIERS[key];
        return (
          <div
            key={key}
            className={`relative flex flex-col rounded-3xl border p-6 transition sm:p-7 ${
              t.highlight
                ? "border-brand-900 bg-brand-900 text-white shadow-2xl shadow-brand-900/20"
                : "border-ink-100 bg-white text-ink-900"
            }`}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-bold text-brand-900 sm:text-xs">
                ⭐ 가장 많이 선택
              </div>
            )}

            {/* Header */}
            <div className={`text-xs font-medium ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>
              {t.tagline}
            </div>
            <h3 className="mt-1 text-2xl font-bold sm:text-[26px]">{t.name}</h3>
            <div className={`mt-1 text-xs ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>
              {t.summary}
            </div>

            {/* Price block */}
            {key === "light" && promoActive ? (
              <>
                <div className="mt-4 flex items-center gap-2">
                  <span className={`text-base line-through ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>
                    월 {t.price}만원
                  </span>
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    한시 -10만
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-red-600">월 29</span>
                  <span className={`text-sm ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>만원</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-red-700">
                  선착순 5자리 한정 · {t.note}
                </div>
                <div className="mt-3">
                  <UrgencyBanner compact />
                </div>
              </>
            ) : (
              <>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">월 {t.price}</span>
                  <span className={`text-sm ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>만원</span>
                </div>
                <div className={`mt-1 text-xs ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>{t.note}</div>
                {t.promo && key !== "light" && (
                  <div className="mt-3 inline-flex w-fit items-center rounded-full bg-yellow-300 px-2.5 py-1 text-[11px] font-bold text-brand-900">
                    🎁 {t.promo}
                  </div>
                )}
              </>
            )}

            {/* All sections inline (no modal) */}
            <div className="mt-6 flex-1 space-y-5 border-t border-white/15 pt-5">
              {t.sections.map((s) => (
                <div key={s.title}>
                  <div
                    className={`flex items-center gap-2 text-[13px] font-bold ${
                      t.highlight ? "text-yellow-300" : "text-brand-900"
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed sm:text-[13px]">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                            t.highlight ? "bg-yellow-300" : "bg-brand-500"
                          }`}
                        />
                        <span className={t.highlight ? "text-white/90" : "text-ink-700"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <a
                href={`/contact?tier=${key}`}
                className={`block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-semibold transition ${
                  t.highlight
                    ? "bg-white text-brand-900 hover:bg-brand-50"
                    : "bg-brand-900 text-white hover:bg-brand-700"
                }`}
              >
                🎁 초기 혜택 받기 →
              </a>
              <p
                className={`mt-2 text-center text-[10px] leading-relaxed ${
                  t.highlight ? "text-brand-100" : "text-ink-500"
                }`}
              >
                상담 신청 후 24시간 내 운영자가 직접 연락드립니다.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
