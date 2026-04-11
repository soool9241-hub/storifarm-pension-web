import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendSms, buildAdminAlertSms } from "@/lib/solapi/client";

const Schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(9),
  product: z.enum(["online", "oneday", "academy"]),
});

const PRICE = { online: 99000, oneday: 300000, academy: 990000 } as const;

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
      stage: "academy",
      source: "academy_form",
    })
    .select()
    .single();

  if (!lead) return NextResponse.json({ error: "리드 저장 실패" }, { status: 500 });

  await sb.from("academy_enrollments").insert({
    lead_id: lead.id,
    product: d.product,
    price: PRICE[d.product],
  });

  const adminPhone = process.env.ADMIN_PHONE;
  if (adminPhone) {
    await sendSms({
      to: adminPhone,
      text: buildAdminAlertSms({
        name: d.name,
        phone: d.phone,
        kind: "아카데미 수강 신청",
        detail: `${d.product} ${PRICE[d.product] / 10000}만원`,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
