import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendSms, buildAdminAlertSms } from "@/lib/solapi/client";

const Schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(9),
  pension_name: z.string().optional(),
  plan: z.enum(["basic", "standard", "premium"]),
});

const FEES = { basic: 50000, standard: 100000, premium: 150000 } as const;

export async function POST(req: Request) {
  const parsed = Schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "입력 오류" }, { status: 400 });
  const d = parsed.data;
  const sb = createSupabaseAdmin();

  const { data: lead } = await sb
    .from("leads")
    .insert({
      name: d.name,
      phone: d.phone.replace(/[^0-9]/g, ""),
      pension_name: d.pension_name || null,
      stage: "maintained",
      source: "maintenance_form",
    })
    .select()
    .single();

  if (!lead) return NextResponse.json({ error: "리드 저장 실패" }, { status: 500 });

  await sb.from("maintenance_subscriptions").insert({
    lead_id: lead.id,
    plan: d.plan,
    monthly_fee: FEES[d.plan],
    status: "active",
  });

  const adminPhone = process.env.ADMIN_PHONE;
  if (adminPhone) {
    await sendSms({
      to: adminPhone,
      text: buildAdminAlertSms({
        name: d.name,
        phone: d.phone,
        kind: "유지보수 구독 문의",
        detail: `${d.plan} ${FEES[d.plan] / 10000}만/월`,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
