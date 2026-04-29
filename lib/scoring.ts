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
    title: "1. 우리 홈페이지",
    weight: 25,
    items: [
      { id: "has_website", label: "우리 펜션 이름으로 된 홈페이지가 있어요", score: 10, desc: "예: ○○펜션.com 처럼 우리만의 인터넷 주소가 있는 홈페이지" },
      { id: "mobile_responsive", label: "휴대폰으로 봐도 글씨와 사진이 잘 보여요", score: 5, desc: "손님이 핸드폰으로 봤을 때 깨지지 않고 보기 편한지" },
      { id: "has_booking", label: "홈페이지에서 손님이 바로 예약·결제할 수 있어요", score: 7, desc: "전화 안 하고 홈페이지에서 날짜 고르고 결제까지 가능" },
      { id: "ssl", label: "홈페이지 주소창에 자물쇠 모양이 있어요", score: 3, desc: "주소 앞에 자물쇠가 있으면 안전한 사이트라는 뜻이에요" },
    ],
  },
  {
    id: "search",
    icon: "🔍",
    title: "2. 노출 (검색·SNS에 우리 펜션 뜨기)",
    weight: 25,
    items: [
      { id: "naver_place", label: "네이버 지도에 우리 펜션이 등록돼 있어요", score: 5, desc: "네이버에서 펜션 이름 치면 지도에 위치가 떠요" },
      { id: "naver_search", label: "'우리 동네 펜션'으로 검색하면 첫 페이지에 우리가 나와요", score: 8, desc: "예: '전주 펜션' 검색했을 때 맨 앞쪽에 나오는지" },
      { id: "sns_active", label: "인스타그램·블로그·카카오톡 채널 중 1개 이상 운영해요", score: 5, desc: "어떤 SNS든 손님이 우리 펜션을 만나볼 채널이 있는지" },
      { id: "naver_ad", label: "네이버에 광고비를 내고 검색 위쪽에 띄우고 있어요", score: 7, desc: "네이버 검색 결과 맨 위 광고 자리에 우리 펜션 올림" },
    ],
  },
  {
    id: "content",
    icon: "📸",
    title: "3. 콘텐츠 제작 (사진·영상·후기)",
    weight: 15,
    items: [
      { id: "recent_photos", label: "펜션 사진을 최근 1년 안에 새로 찍었어요", score: 5, desc: "낡은 사진 말고 요즘 손님이 보고 끌리는 최근 사진" },
      { id: "sns_post_freq", label: "한 달에 4번 이상 사진·영상을 SNS에 올려요", score: 4, desc: "일주일에 한 번 꼴로 인스타·블로그·유튜브 중 어디든 게시" },
      { id: "blog", label: "네이버 블로그에 가끔 글을 올려요", score: 3, desc: "펜션 소개·후기·꿀팁 같은 글을 한 달에 한두 번이라도" },
      { id: "review_mgmt", label: "손님이 남긴 후기에 답글을 직접 달아줘요", score: 3, desc: "야놀자·에어비앤비·구글 리뷰에 사장님이 답글 작성" },
    ],
  },
  {
    id: "booking",
    icon: "📅",
    title: "4. 예약 관리 (예약·손님 자동화)",
    weight: 20,
    items: [
      { id: "auto_sms", label: "손님이 예약하면 안내 문자가 자동으로 나가요", score: 5, desc: "사장님이 일일이 안 보내도 예약 확인 문자가 자동 발송" },
      { id: "guest_db", label: "다녀간 손님 이름·번호를 따로 모아두고 있어요", score: 4, desc: "엑셀, 노트, 폰 메모장 어디든 손님 명단을 정리해둠" },
      { id: "sms_marketing", label: "예전에 다녀간 손님한테 가끔 문자/카톡을 보내요", score: 3, desc: "재방문 유도용 안부 문자, 할인 안내 문자 등" },
      { id: "checkin_system", label: "손님이 비밀번호로 문 열고 알아서 들어가요", score: 3, desc: "현관문 키패드/도어락으로 셀프 체크인" },
      { id: "self_ratio", label: "10명 중 3명 이상은 야놀자/에어비앤비 안 거치고 우리한테 바로 예약해요", score: 5, desc: "수수료 안 떼고 받는 직접 예약이 30% 이상" },
    ],
  },
  {
    id: "adcost",
    icon: "💸",
    title: "5. 월평균 광고비용",
    weight: 15,
    items: [
      { id: "ad_regular", label: "매달 네이버나 SNS에 광고비를 정기적으로 쓰고 있어요", score: 3, desc: "한 달에 한 번이라도 광고를 정기적으로 집행" },
      { id: "ad_over_30", label: "월 평균 광고비가 30만원 이상이에요", score: 4, desc: "30만원 이상이라면 효과 측정이 더 중요해집니다" },
      { id: "naver_ad_tracking", label: "어느 광고를 보고 손님이 예약했는지 알 수 있어요", score: 5, desc: "광고비를 어디에 써야 효과 좋은지 숫자로 확인 가능" },
      { id: "ad_efficient", label: "광고비를 줄이면서도 자체 예약을 늘리는 노력을 하고 있어요", score: 3, desc: "OTA·검색광고에 의존하지 않고 자체 채널 키우는 중" },
    ],
  },
  {
    id: "pain",
    icon: "🆘",
    title: "6. 지금 겪고 계신 운영 고민 (해당하면 체크)",
    weight: 0,
    items: [
      { id: "pain_ota_fee", label: "높은 플랫폼 수수료가 부담돼요", score: 0, desc: "에어비앤비·야놀자 등 OTA 15%+ 수수료로 수익성이 떨어진다고 느끼심" },
      { id: "pain_multi_space", label: "여러 공간(숙소)을 따로따로 관리하기 복잡해요", score: 0, desc: "여러 숙소의 예약·캘린더·정산을 일일이 따로 관리 중" },
      { id: "pain_revenue_analysis", label: "매출 분석·예측이 어려워요", score: 0, desc: "통합된 수익 데이터 분석 도구가 없어서 감으로 운영 중" },
      { id: "pain_guest_comm", label: "체크인·체크아웃·문의 응답 같은 반복 업무가 너무 많아요", score: 0, desc: "손이 너무 많이 가서 사장님이 본 업무에 집중하기 힘드심" },
      { id: "pain_pricing", label: "경쟁력 있는 가격 설정과 마케팅 전략을 짜기 막막해요", score: 0, desc: "옆집 가격·시즌별 단가 조정·광고 전략을 어떻게 짤지 모르겠음" },
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
  if (pct >= 80) return { grade: "A", label: "아주 잘하고 계세요", msg: "사장님은 온라인 관리를 정말 잘하고 계십니다. 조금만 더 다듬으면 매출이 더 늘 수 있어요." };
  if (pct >= 60) return { grade: "B", label: "기본은 잘 돼 있어요", msg: "기본은 잘 갖춰져 있지만, 옆집 펜션이 빠르게 따라오고 있어요. 몇 가지만 더 손보면 안전합니다." };
  if (pct >= 40) return { grade: "C", label: "조금 부족해요", msg: "손님이 우리 펜션을 인터넷에서 찾기 어려운 상태예요. 지금 손보지 않으면 빈 방이 늘어날 수 있어요." };
  if (pct >= 20) return { grade: "D", label: "많이 부족해요", msg: "인터넷에서 우리 펜션이 거의 안 보이고 있어요. 들어올 손님을 놓치고 계실 가능성이 큽니다." };
  return { grade: "F", label: "지금 바로 손봐야 해요", msg: "지금은 야놀자·에어비앤비에 수수료만 내고 계실 가능성이 큽니다. 우리 것을 만들어야 매출이 남습니다." };
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
