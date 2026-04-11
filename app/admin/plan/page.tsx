import SixStageFunnel from "@/components/funnel/SixStageFunnel";

export default function AdminPlanPage() {
  return (
    <div className="mx-auto max-w-[680px]">
      <div className="mb-6">
        <div className="label">내부 사업 계획</div>
        <h1 className="mt-1 text-2xl font-bold">6단계 자동 매출 퍼널 — 월 1억 역산</h1>
        <p className="mt-2 text-sm text-ink-500">
          이 페이지는 관리자만 볼 수 있는 내부 지표입니다. 고객에게는 노출되지 않습니다.
        </p>
      </div>
      <SixStageFunnel />
      <div className="mt-5 text-xs text-ink-500">
        <b>자동화 포인트:</b> S1 진단도구 자동 · S2 리포트 자동생성 · S3 템플릿 복제 · S4 n8n 알림 · S5 녹화 강의 · S6 파트너가 제작 대행
      </div>
    </div>
  );
}
