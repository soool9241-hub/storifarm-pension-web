import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

async function getMetrics() {
  const sb = createSupabaseAdmin();
  const [{ count: leadCount }, { count: diagCount }, { count: consCount }, { count: contrCount }, { count: mainCount }, { count: acadCount }, { count: partnerCount }] = await Promise.all([
    sb.from("leads").select("*", { count: "exact", head: true }),
    sb.from("diagnostics").select("*", { count: "exact", head: true }),
    sb.from("consultations").select("*", { count: "exact", head: true }),
    sb.from("contracts").select("*", { count: "exact", head: true }),
    sb.from("maintenance_subscriptions").select("*", { count: "exact", head: true }).eq("status", "active"),
    sb.from("academy_enrollments").select("*", { count: "exact", head: true }),
    sb.from("partner_applications").select("*", { count: "exact", head: true }),
  ]);

  const { data: recent } = await sb
    .from("leads")
    .select("id,name,phone,stage,source,created_at,pension_name")
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    leadCount: leadCount || 0,
    diagCount: diagCount || 0,
    consCount: consCount || 0,
    contrCount: contrCount || 0,
    mainCount: mainCount || 0,
    acadCount: acadCount || 0,
    partnerCount: partnerCount || 0,
    recent: recent || [],
  };
}

export default async function AdminHome() {
  const m = await getMetrics();

  const stages = [
    { label: "S1 진단", v: m.diagCount, color: "#0F6E56" },
    { label: "S3 상담", v: m.consCount, color: "#854F0B" },
    { label: "S3 계약", v: m.contrCount, color: "#D85A30" },
    { label: "S4 유지보수", v: m.mainCount, color: "#993C1D" },
    { label: "S5 아카데미", v: m.acadCount, color: "#534AB7" },
    { label: "S6 파트너", v: m.partnerCount, color: "#993556" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="mt-1 text-sm text-ink-500">6단계 퍼널 실시간 현황</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="전체 리드" v={m.leadCount} />
        <Card label="진단 완료" v={m.diagCount} />
        <Card label="상담 신청" v={m.consCount} />
        <Card label="활성 구독" v={m.mainCount} />
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold">퍼널 단계별</h2>
        <div className="mt-5 space-y-3">
          {stages.map((s) => {
            const max = Math.max(...stages.map((x) => x.v), 1);
            const w = (s.v / max) * 100;
            return (
              <div key={s.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-ink-500">{s.v}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full" style={{ width: `${w}%`, background: s.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-ink-100 px-6 py-4">
          <h2 className="text-lg font-bold">최근 리드 10건</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-ink-100/40 text-xs text-ink-500">
            <tr>
              <th className="p-3 text-left font-medium">이름</th>
              <th className="p-3 text-left font-medium">연락처</th>
              <th className="p-3 text-left font-medium">펜션</th>
              <th className="p-3 text-left font-medium">단계</th>
              <th className="p-3 text-left font-medium">유입</th>
              <th className="p-3 text-left font-medium">시각</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {m.recent.map((r: any) => (
              <tr key={r.id}>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3 text-ink-500">{r.pension_name || "-"}</td>
                <td className="p-3">
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] text-brand-700">
                    {r.stage}
                  </span>
                </td>
                <td className="p-3 text-ink-500">{r.source}</td>
                <td className="p-3 text-xs text-ink-500">
                  {new Date(r.created_at).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ label, v }: { label: string; v: number }) {
  return (
    <div className="card p-5">
      <div className="label">{label}</div>
      <div className="mt-1 text-3xl font-bold text-brand-900">{v}</div>
    </div>
  );
}
