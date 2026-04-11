import type { DiagnosticAnswers, DiagnosticResult, Grade } from "./types";

export interface DiagnosticItem {
  id: string;
  label: string;
  score: number;
  desc: string;
}
export interface DiagnosticCategory {
  id: string;
  icon: string;
  title: string;
  weight: number;
  items: DiagnosticItem[];
}

export const CATEGORIES: DiagnosticCategory[] = [
  {
    id: "website",
    icon: "🌐",
    title: "홈페이지",
    weight: 25,
    items: [
      { id: "has_website", label: "자체 홈페이지 보유", score: 10, desc: "자체 도메인(.com/.kr)으로 운영되는 홈페이지" },
      { id: "mobile_responsive", label: "모바일 반응형", score: 5, desc: "스마트폰에서 정상적으로 보이는지" },
      { id: "has_booking", label: "온라인 예약 시스템", score: 7, desc: "홈페이지에서 바로 예약 가능한 기능" },
      { id: "ssl", label: "SSL 보안 인증서", score: 3, desc: "https:// 적용 여부 (자물쇠 아이콘)" },
    ],
  },
  {
    id: "search",
    icon: "🔍",
    title: "검색 노출",
    weight: 25,
    items: [
      { id: "naver_place", label: "네이버 플레이스 등록", score: 5, desc: "네이버 지도에 펜션 정보 등록" },
      { id: "naver_search", label: "지역+펜션 검색 시 1페이지 노출", score: 8, desc: "'전주 독채 펜션' 등 검색 시 상위 노출" },
      { id: "naver_ad", label: "네이버 파워링크 광고", score: 5, desc: "검색 광고 집행 여부" },
      { id: "naver_ad_tracking", label: "광고 전환 추적 (UTM/GA)", score: 7, desc: "어떤 광고에서 예약이 들어오는지 추적" },
    ],
  },
  {
    id: "ota",
    icon: "🏨",
    title: "OTA · 예약 채널",
    weight: 20,
    items: [
      { id: "airbnb", label: "에어비앤비 입점", score: 5, desc: "에어비앤비 운영 중" },
      { id: "yanolja", label: "야놀자/여기어때 입점", score: 5, desc: "국내 OTA 입점" },
      { id: "self_ratio", label: "자체 예약 비율 30% 이상", score: 8, desc: "OTA 아닌 자체 채널 예약" },
      { id: "review_mgmt", label: "리뷰 관리 (답글 작성)", score: 2, desc: "OTA 리뷰 답글 관리" },
    ],
  },
  {
    id: "marketing",
    icon: "📱",
    title: "SNS · 마케팅",
    weight: 15,
    items: [
      { id: "instagram", label: "인스타그램 운영 (월 4회+)", score: 5, desc: "활성 인스타그램 계정" },
      { id: "blog", label: "네이버 블로그 운영", score: 4, desc: "공식 블로그 정기 포스팅" },
      { id: "kakao_channel", label: "카카오톡 채널", score: 3, desc: "카카오톡 비즈니스 채널" },
      { id: "sms_marketing", label: "고객 DB 기반 마케팅", score: 3, desc: "SMS/카톡으로 재방문 유도" },
    ],
  },
  {
    id: "operation",
    icon: "⚙️",
    title: "운영 시스템",
    weight: 15,
    items: [
      { id: "auto_sms", label: "예약 확인 자동 발송", score: 4, desc: "예약 시 자동 SMS/카톡 발송" },
      { id: "guest_db", label: "고객 DB 수집·관리", score: 4, desc: "예약자 연락처 체계적 관리" },
      { id: "analytics", label: "방문자 분석 (GA4 등)", score: 4, desc: "홈페이지 방문자 데이터 분석" },
      { id: "checkin_system", label: "셀프 체크인 시스템", score: 3, desc: "키패드 / 스마트 체크인" },
    ],
  },
];

export const TOTAL_MAX = CATEGORIES.reduce(
  (s, c) => s + c.items.reduce((a, i) => a + i.score, 0),
  0
);

export function scoreDiagnostic(answers: DiagnosticAnswers): DiagnosticResult {
  let score = 0;
  const categoryScores: Record<string, { score: number; max: number }> = {};
  for (const cat of CATEGORIES) {
    let cs = 0;
    let cm = 0;
    for (const item of cat.items) {
      cm += item.score;
      if (answers[item.id]) {
        cs += item.score;
        score += item.score;
      }
    }
    categoryScores[cat.id] = { score: cs, max: cm };
  }
  const pct = Math.round((score / TOTAL_MAX) * 100);
  const g = gradeOf(pct);
  return {
    score,
    max: TOTAL_MAX,
    pct,
    grade: g.grade,
    gradeLabel: g.label,
    categoryScores,
  };
}

export function gradeOf(pct: number): { grade: Grade; label: string; msg: string } {
  if (pct >= 80) return { grade: "A", label: "우수", msg: "온라인 운영이 잘 되고 있습니다. 세부 최적화로 더 성장할 수 있어요." };
  if (pct >= 60) return { grade: "B", label: "양호", msg: "기본은 갖췄지만 경쟁에서 밀릴 수 있습니다. 핵심 항목 보완이 필요해요." };
  if (pct >= 40) return { grade: "C", label: "보통", msg: "잠재 고객이 사장님 펜션을 찾기 어려운 상태입니다. 시급한 개선이 필요합니다." };
  if (pct >= 20) return { grade: "D", label: "미흡", msg: "온라인 존재감이 매우 약합니다. 매출 기회를 놓치고 계실 가능성이 높아요." };
  return { grade: "F", label: "위험", msg: "OTA 수수료만 나가고, 자체 경쟁력은 제로에 가깝습니다. 즉시 개선이 필요합니다." };
}

export function improvementPriorities(result: DiagnosticResult, answers: DiagnosticAnswers): string[] {
  const missing: { label: string; weight: number }[] = [];
  for (const cat of CATEGORIES) {
    for (const item of cat.items) {
      if (!answers[item.id]) missing.push({ label: item.label, weight: item.score });
    }
  }
  return missing.sort((a, b) => b.weight - a.weight).slice(0, 5).map((m) => m.label);
}

export function estimateOtaLoss(answers: DiagnosticAnswers): number {
  const base = !answers["has_website"] ? 360 : !answers["self_ratio"] ? 240 : 120;
  return base;
}
