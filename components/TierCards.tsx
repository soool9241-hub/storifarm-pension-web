"use client";

import { useEffect, useState } from "react";

type TierKey = "light" | "standard" | "premium";

const TIERS: Record<
  TierKey,
  {
    name: string;
    price: number;
    note: string;
    promo?: string;
    tagline: string;
    highlight?: boolean;
    keyPoints: string[];
    sections: { title: string; icon: string; items: string[] }[];
  }
> = {
  light: {
    name: "라이트",
    price: 39,
    note: "단기 / 월 결제",
    promo: "선착순 5팀 월 29만",
    tagline: "지금 막 시작하시는 사장님",
    keyPoints: [
      "단일 페이지 홈페이지",
      "도메인 + 호스팅 1년",
      "예약 문의 폼 + SMS 1종",
      "네이버 플레이스 DIY 가이드",
      "콘텐츠 월 1회 업데이트",
    ],
    sections: [
      {
        title: "공간 운영 자동화 홈페이지 구축",
        icon: "🏠",
        items: [
          "단일 페이지 홈페이지",
          "도메인 + 호스팅 1년 포함",
          "휴대폰 반응형 디자인",
          "예약 문의 폼",
          "SMS 자동 발송 1종 (예약확인)",
        ],
      },
      {
        title: "전환되는 키워드 셋팅",
        icon: "🎯",
        items: ["네이버 광고 키워드 5개 기본 세팅", "네이버 플레이스 DIY 등록 가이드"],
      },
      {
        title: "운영관리 교육",
        icon: "📚",
        items: ["셀프 운영 가이드북 제공", "콘텐츠 월 1회 업데이트 지원"],
      },
      {
        title: "평생 업데이트 시스템 라이센스",
        icon: "♾",
        items: ["시스템 자동 업데이트 (매일)", "긴급 대응: 영업일 응답"],
      },
    ],
  },
  standard: {
    name: "스탠다드",
    price: 69,
    note: "1년 약정",
    highlight: true,
    tagline: "본격적으로 자체 예약 늘릴 분",
    keyPoints: [
      "풀 커스텀 홈페이지",
      "달력형 실시간 예약 + 결제",
      "SMS / 알림톡 자동 발송 5종",
      "네이버 광고 37 키워드 세팅",
      "1:1 운영 코칭 1회 + 콘텐츠 월 2회",
    ],
    sections: [
      {
        title: "공간 운영 자동화 홈페이지 구축",
        icon: "🏠",
        items: [
          "풀 커스텀 홈페이지",
          "도메인 + 호스팅 + SSL",
          "휴대폰 반응형 디자인",
          "달력형 실시간 예약 시스템",
          "결제 연동 (토스페이먼츠)",
          "SMS / 알림톡 자동 발송 5종",
        ],
      },
      {
        title: "전환되는 키워드 셋팅",
        icon: "🎯",
        items: [
          "네이버 광고 키워드 37개 직접 세팅",
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
        title: "지역 파트너십 제휴",
        icon: "🤝",
        items: [
          "지역 1인 독점 우선 안내",
          "파트너 레퍼럴 건당 보상",
          "분기 1회 사업주 모임 초대",
        ],
      },
      {
        title: "평생 업데이트 시스템 라이센스",
        icon: "♾",
        items: ["시스템 자동 업데이트 (매일)", "신규 기능 우선 적용", "긴급 대응: 영업일 응답"],
      },
    ],
  },
  premium: {
    name: "프리미엄",
    price: 99,
    note: "1년 약정",
    tagline: "공간 여러 개를 운영하는 사장님",
    keyPoints: [
      "풀 커스텀 + 다지점 통합 관리",
      "광고 컨설팅 매월 1회 (1:1)",
      "콘텐츠 제작 매월 2건 + 데이터 리포트",
      "지역 1인 독점 즉시 등록",
      "24시간 긴급 대응 핫라인",
    ],
    sections: [
      {
        title: "공간 운영 자동화 홈페이지 구축",
        icon: "🏠",
        items: [
          "풀 커스텀 + 다지점 통합 페이지",
          "도메인 + 호스팅 + SSL",
          "휴대폰 반응형 디자인",
          "달력형 실시간 예약 (다지점 통합)",
          "결제 연동 (토스페이먼츠)",
          "SMS / 알림톡 자동 발송 5종 + 통합 관리",
        ],
      },
      {
        title: "전환되는 키워드 셋팅",
        icon: "🎯",
        items: [
          "네이버 광고 37 키워드 + 매월 최적화",
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
          "매월 데이터 리포트 + 작전회의",
        ],
      },
      {
        title: "지역 파트너십 제휴",
        icon: "🤝",
        items: [
          "지역 1인 독점 즉시 등록",
          "파트너 레퍼럴 건당 + 월 분배",
          "월간 비공개 사업주 네트워크",
        ],
      },
      {
        title: "평생 업데이트 시스템 라이센스",
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
  const [open, setOpen] = useState<TierKey | null>(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
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

              <div className={`text-xs font-semibold ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>
                {t.tagline}
              </div>
              <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">월 {t.price}</span>
                <span className={`text-sm ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>만원</span>
              </div>
              <div className={`mt-1 text-xs ${t.highlight ? "text-brand-100" : "text-ink-500"}`}>{t.note}</div>
              {t.promo && (
                <div className="mt-3 inline-flex w-fit items-center rounded-full bg-yellow-300 px-2.5 py-1 text-[11px] font-bold text-brand-900">
                  🎁 {t.promo}
                </div>
              )}

              <ul className="mt-5 space-y-2.5 border-t border-white/15 pt-5 text-sm">
                {t.keyPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        t.highlight ? "bg-yellow-300 text-brand-900" : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={t.highlight ? "" : "text-ink-700"}>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={`/contact?tier=${key}`}
                  className={`block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                    t.highlight
                      ? "bg-white text-brand-900 hover:bg-brand-50"
                      : "bg-brand-900 text-white hover:bg-brand-700"
                  }`}
                >
                  {t.name} 상담 신청 →
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(key)}
                  className={`block w-full rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    t.highlight
                      ? "border-white/20 text-white hover:bg-white/10"
                      : "border-ink-100 text-ink-700 hover:bg-ink-100/40"
                  }`}
                >
                  포함 항목 자세히 보기
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-ink-100 bg-white px-6 py-4">
              <div>
                <div className="text-xs text-ink-500">{TIERS[open].tagline}</div>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-ink-900">{TIERS[open].name}</span>
                  <span className="text-sm font-semibold text-brand-700">월 {TIERS[open].price}만원</span>
                  <span className="text-xs text-ink-500">({TIERS[open].note})</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="닫기"
                className="rounded-full p-2 text-ink-500 hover:bg-ink-100/60"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[68vh] overflow-y-auto px-6 py-5">
              {TIERS[open].promo && (
                <div className="mb-5 rounded-xl bg-yellow-100 p-3 text-center text-[12px] font-bold text-brand-900 sm:text-sm">
                  🎁 {TIERS[open].promo} (10만원 할인)
                </div>
              )}
              <div className="space-y-5">
                {TIERS[open].sections.map((s) => (
                  <div key={s.title}>
                    <div className="flex items-center gap-2 text-sm font-bold text-brand-900">
                      <span>{s.icon}</span>
                      <span>{s.title}</span>
                    </div>
                    <ul className="mt-2 space-y-1.5 pl-6 text-[13px] text-ink-700 sm:text-sm">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-ink-100 bg-ink-100/30 px-6 py-4">
              <a
                href={`/contact?tier=${open}`}
                className="block w-full rounded-xl bg-brand-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-700"
              >
                {TIERS[open].name} 상담 신청 →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
