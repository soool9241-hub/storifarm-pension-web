import { notFound } from "next/navigation";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { CATEGORIES } from "@/lib/scoring";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export default async function ReportPage({ params }: Props) {
  const supabase = createSupabaseAdmin();
  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!report) notFound();

  // increment view count (fire-and-forget)
  await supabase
    .from("reports")
    .update({ viewed_count: (report.viewed_count || 0) + 1 })
    .eq("id", report.id);

  const c = report.content as any;
  const result = c.result;
  const priorities: string[] = c.priorities || [];
  const otaLoss: number = c.otaLoss || 0;
  const name: string = c.name;
  const pensionName: string = c.pension_name;

  const gradeColors: Record<string, { bg: string; fg: string }> = {
    A: { bg: "#E1F5EE", fg: "#04342C" },
    B: { bg: "#E6F1FB", fg: "#042C53" },
    C: { bg: "#FAEEDA", fg: "#412402" },
    D: { bg: "#FAECE7", fg: "#4A1B0C" },
    F: { bg: "#FCEBEB", fg: "#5A1616" },
  };
  const gc = gradeColors[result.grade] || gradeColors.C;

  return (
    <div className="container-narrow py-10 sm:py-14">
      {/* Header */}
      <div className="mb-6">
        <div className="label">STAGE 2 · 맞춤 진단 리포트</div>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          {name} 사장님의 {pensionName} 온라인 진단 결과
        </h1>
        <p className="mt-2 text-sm text-ink-700">
          7년차 펜션 운영자가 직접 설계한 20개 항목 기반 리포트입니다.
        </p>
      </div>

      {/* Grade card */}
      <div className="card overflow-hidden">
        <div className="px-6 py-8 text-center" style={{ background: gc.bg, color: gc.fg }}>
          <div className="text-xs font-medium opacity-70">종합 등급</div>
          <div className="mt-1 text-5xl font-bold">{result.grade}</div>
          <div className="mt-1 text-sm">
            {result.pct}점 / 100점
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-sm font-semibold">이 등급의 의미</h2>
          <p className="mt-1 text-sm text-ink-700">{result.gradeLabel} · 사장님 펜션의 온라인 경쟁력을 보여주는 종합 지표입니다.</p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold">영역별 상세</h2>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const cs = result.categoryScores[cat.id];
            const pct = Math.round((cs.score / cs.max) * 100);
            return (
              <div key={cat.id} className="card p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-semibold">{cat.title}</span>
                  </div>
                  <div className="text-xs text-ink-500">
                    {cs.score}/{cs.max} · {pct}%
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full bg-brand-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Priorities */}
      <div className="mt-8 card p-6">
        <h2 className="text-lg font-bold">지금 가장 먼저 고쳐야 할 5가지</h2>
        <p className="mt-1 text-xs text-ink-500">
          가중치가 높은 항목부터 순서대로 정렬했습니다.
        </p>
        <ol className="mt-4 space-y-3">
          {priorities.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm text-ink-900">{p}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* OTA loss estimate */}
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-900">OTA 수수료 손실 추정</h2>
        <p className="mt-2 text-sm text-amber-900">
          현재 구조로는 연간 약 <b>{otaLoss}만원</b>이 OTA 수수료로 빠져나가고
          있을 가능성이 높습니다.
        </p>
        <div className="mt-4 rounded-xl bg-white p-4 text-xs leading-relaxed text-amber-900">
          월 예약 10건 × 건당 20만원 × 수수료 15% = 월 30만원 → 연 360만원
          <br />
          자체 홈페이지로 예약 50%만 전환해도 연 180만원 절감 → 제작비 회수.
        </div>
      </div>

      {/* Real proof */}
      <div className="mt-8 card p-6">
        <div className="label">실제 사례</div>
        <h2 className="mt-1 text-lg font-bold">초기 1,210만원 → 현재 8,248만원 (7배 성장)</h2>
        <p className="mt-2 text-sm text-ink-700">
          저도 처음엔 에어비앤비 수수료로 한 해 수백만원을 흘려보냈습니다.
          홈페이지 + 네이버 광고 + SMS 자동화로 5년간 구조를 쌓았더니 매출이
          7배가 됐습니다. 그 시스템을 그대로 복제해드립니다.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-brand-900 p-8 text-center text-white">
        <h2 className="text-xl font-bold">30분 무료 상담으로 구체적인 개선안을 받아보세요</h2>
        <p className="mt-2 text-sm text-white/80">
          사장님 펜션 검색 노출 현황 + 경쟁사 비교 + 맞춤 Tier 추천까지.
          제작 의뢰는 그 다음에 판단하세요.
        </p>
        <a
          href={`/contact?lead=${report.lead_id}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
        >
          무료 30분 상담 신청 →
        </a>
      </div>

      <div className="mt-10 text-center text-xs text-ink-500">
        * 이 리포트는 사장님 개인 링크로, 외부에 노출되지 않습니다.
      </div>
    </div>
  );
}
