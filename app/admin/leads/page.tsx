import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const sb = createSupabaseAdmin();
  const { data } = await sb
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="text-2xl font-bold">리드 목록</h1>
      <p className="mt-1 text-sm text-ink-500">최근 200건</p>

      <div className="mt-6 card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-100/40 text-xs text-ink-500">
            <tr>
              <th className="p-3 text-left font-medium">이름</th>
              <th className="p-3 text-left font-medium">연락처</th>
              <th className="p-3 text-left font-medium">펜션</th>
              <th className="p-3 text-left font-medium">지역</th>
              <th className="p-3 text-left font-medium">단계</th>
              <th className="p-3 text-left font-medium">유입</th>
              <th className="p-3 text-left font-medium">등록일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {(data || []).map((r: any) => (
              <tr key={r.id} className="hover:bg-ink-100/20">
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3 text-ink-500">{r.pension_name || "-"}</td>
                <td className="p-3 text-ink-500">{r.region || "-"}</td>
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
