import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { scoreDiagnostic, improvementPriorities, estimateOtaLoss } from "@/lib/scoring";
import { sendSms, buildReportSms, buildAdminAlertSms } from "@/lib/solapi/client";

const BodySchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(9),
  pension_name: z.string().optional(),
  region: z.string().optional(),
  answers: z.record(z.boolean()),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값이 올바르지 않습니다." }, { status: 400 });
  }
  const { name, phone, pension_name, region, answers } = parsed.data;

  const result = scoreDiagnostic(answers);
  const priorities = improvementPriorities(result, answers);
  const otaLoss = estimateOtaLoss(answers);

  const supabase = createSupabaseAdmin();

  // 1. Lead
  const { data: lead, error: leadErr } = await supabase
    .from("leads")
    .insert({
      name,
      phone: phone.replace(/[^0-9]/g, ""),
      pension_name: pension_name || null,
      region: region || null,
      stage: "diagnosed",
      source: "diagnostic",
    })
    .select()
    .single();

  if (leadErr || !lead) {
    console.error("lead insert failed", leadErr);
    return NextResponse.json({ error: "리드 저장 실패" }, { status: 500 });
  }

  // 2. Diagnostic
  const { data: diag, error: diagErr } = await supabase
    .from("diagnostics")
    .insert({
      lead_id: lead.id,
      answers,
      score: result.score,
      max_score: result.max,
      pct: result.pct,
      grade: result.grade,
      category_scores: result.categoryScores,
      priorities,
    })
    .select()
    .single();

  if (diagErr || !diag) {
    return NextResponse.json({ error: "진단 저장 실패" }, { status: 500 });
  }

  // 3. Report (public slug)
  const slug = `${lead.id.slice(0, 8)}-${Math.random().toString(36).slice(2, 6)}`;
  const reportContent = {
    name,
    pension_name: pension_name || name + " 펜션",
    region,
    result,
    priorities,
    otaLoss,
    generatedAt: new Date().toISOString(),
  };

  const { data: report, error: repErr } = await supabase
    .from("reports")
    .insert({
      lead_id: lead.id,
      diagnostic_id: diag.id,
      slug,
      content: reportContent,
    })
    .select()
    .single();

  if (repErr || !report) {
    return NextResponse.json({ error: "리포트 저장 실패" }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const reportUrl = `${siteUrl}/report/${slug}`;

  // 4. Send SMS (non-blocking-ish but awaited for user confirmation)
  const sms = await sendSms({
    to: phone,
    subject: "[스토리팜] 펜션 진단 리포트",
    text: buildReportSms({ name, reportUrl, grade: `${result.grade}등급 (${result.pct}점)` }),
  });

  await supabase.from("sms_logs").insert({
    lead_id: lead.id,
    to_phone: phone,
    template: "report_delivery",
    body: buildReportSms({ name, reportUrl, grade: result.grade }),
    status: sms.ok ? (sms.mocked ? "mocked" : "sent") : "failed",
    solapi_message_id: sms.messageId || null,
    error: sms.error || null,
  });

  // 5. Mark report sent
  await supabase
    .from("reports")
    .update({ sent_at: new Date().toISOString() })
    .eq("id", report.id);

  // 6. Admin alert
  const adminPhone = process.env.ADMIN_PHONE;
  if (adminPhone) {
    await sendSms({
      to: adminPhone,
      text: buildAdminAlertSms({
        name,
        phone,
        kind: "진단 완료",
        detail: `${result.grade}등급 · ${pension_name || "-"} · ${region || "-"}`,
      }),
    });
  }

  return NextResponse.json({
    ok: true,
    reportUrl,
    grade: result.grade,
    pct: result.pct,
  });
}
