import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { sendSms, buildAdminAlertSms } from "@/lib/solapi/client";

const Schema = z.object({
  applicant_name: z.string().min(1),
  phone: z.string().min(9),
  region_wish: z.string().min(1),
  experience: z.string().optional(),
  academy_grad: z.boolean().optional(),
});

export async function POST(req: Request) {
  const parsed = Schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "입력 오류" }, { status: 400 });
  const d = parsed.data;
  const sb = createSupabaseAdmin();

  const { data: lead } = await sb
    .from("leads")
    .insert({
      name: d.applicant_name,
      phone: d.phone.replace(/[^0-9]/g, ""),
      region: d.region_wish,
      stage: "partner",
      source: "partner_form",
    })
    .select()
    .single();

  await sb.from("partner_applications").insert({
    lead_id: lead?.id || null,
    applicant_name: d.applicant_name,
    phone: d.phone.replace(/[^0-9]/g, ""),
    region_wish: d.region_wish,
    experience: d.experience || null,
    academy_grad: !!d.academy_grad,
  });

  const adminPhone = process.env.ADMIN_PHONE;
  if (adminPhone) {
    await sendSms({
      to: adminPhone,
      text: buildAdminAlertSms({
        name: d.applicant_name,
        phone: d.phone,
        kind: "파트너 지원",
        detail: `희망지역: ${d.region_wish} · 아카데미: ${d.academy_grad ? "O" : "X"}`,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
