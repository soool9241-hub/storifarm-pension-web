import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function FunnelPage() {
  const sb = createSupabaseAdmin();
  const { data } = await sb.from("leads").select("stage");
  const counts: Record<string, number> = {};
  for (const r of data || []) counts[r.stage] = (counts[r.stage] || 0) + 1;

  const order = ["lead", "diagnosed", "reported", "consulted", "contracted", "maintained", "academy", "partner"];
  const labels: Record<string, string> = {
    lead: "리드 유입",
    diagnosed: "진단 완료",
    reported: "리포트 확인",
    consulted: "상담 신청",
    contracted: "계약 체결",
    maintained: "유지보수 구독",
    academy: "아카데미 수강",
    partner: "파트너 지원",
  };

  const total = order.reduce((a, k) => a + (counts[k] || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold">퍼널 전환</h1>
      <p className="mt-1 text-sm text-ink-500">단계별 리드 누적 · 총 {total}건</p>

      <div className="mt-8 space-y-3">
        {order.map((k) => {
          const v = counts[k] || 0;
          const pct = total ? Math.round((v / total) * 100) : 0;
          return (
            <div key={k} className="card p-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{labels[k]}</span>
                <span className="text-ink-500">{v}건 · {pct}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full bg-brand-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
