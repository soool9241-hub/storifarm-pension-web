import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendSms, buildAdminAlertSms } from "@/lib/solapi/client";

const Schema = z.object({
  lead_id: z.string().uuid().optional().nullable(),
  name: z.string().min(1),
  phone: z.string().min(9),
  pension_name: z.string().optional(),
  region: z.string().optional(),
  channel: z.enum(["phone", "kakao", "zoom"]),
  tier: z.enum(["light", "standard", "premium"]).optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  const parsed = Schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값이 올바르지 않습니다." }, { status: 400 });
  }
  const d = parsed.data;
  const supabase = createSupabaseAdmin();

  let leadId = d.lead_id || null;
  if (!leadId) {
    const { data: lead } = await supabase
      .from("leads")
      .insert({
        name: d.name,
        phone: d.phone.replace(/[^0-9]/g, ""),
        pension_name: d.pension_name || null,
        region: d.region || null,
        stage: "consulted",
        source: "contact_form",
      })
      .select()
      .single();
    leadId = lead?.id || null;
  } else {
    await supabase.from("leads").update({ stage: "consulted" }).eq("id", leadId);
  }

  if (!leadId) {
    return NextResponse.json({ error: "리드 저장 실패" }, { status: 500 });
  }

  await supabase.from("consultations").insert({
    lead_id: leadId,
    channel: d.channel,
    tier_interest: d.tier || null,
    message: d.message || null,
  });

  // alert admin
  const adminPhone = process.env.ADMIN_PHONE;
  if (adminPhone) {
    await sendSms({
      to: adminPhone,
      text: buildAdminAlertSms({
        name: d.name,
        phone: d.phone,
        kind: "상담 신청",
        detail: `${d.tier || "-"} · ${d.channel} · ${d.pension_name || "-"}`,
      }),
    });
  }

  // confirm to user
  await sendSms({
    to: d.phone,
    text: `[펜션운영자의 편지] ${d.name} 사장님, 상담 신청이 접수되었습니다. 24시간 내 운영자가 직접 연락드립니다. 감사합니다.`,
  });

  return NextResponse.json({ ok: true });
}
