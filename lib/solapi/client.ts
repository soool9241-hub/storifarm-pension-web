import { SolapiMessageService } from "solapi";

let cached: SolapiMessageService | null = null;

function getClient() {
  if (cached) return cached;
  const key = process.env.SOLAPI_API_KEY;
  const secret = process.env.SOLAPI_API_SECRET;
  if (!key || !secret) return null;
  cached = new SolapiMessageService(key, secret);
  return cached;
}

export interface SendSmsInput {
  to: string;
  text: string;
  subject?: string;
}

export async function sendSms({ to, text, subject }: SendSmsInput): Promise<{
  ok: boolean;
  messageId?: string;
  mocked?: boolean;
  error?: string;
}> {
  const client = getClient();
  const from = process.env.SOLAPI_SENDER || "01085319531";
  const cleanTo = to.replace(/[^0-9]/g, "");

  if (!client) {
    console.warn("[solapi] Credentials missing — mocking send.", { to: cleanTo, text: text.slice(0, 80) });
    return { ok: true, mocked: true, messageId: `mock-${Date.now()}` };
  }

  try {
    const res = await client.send({
      to: cleanTo,
      from,
      text,
      subject,
      autoTypeDetect: true,
    } as any);
    const anyRes = res as any;
    const messageId = anyRes?.groupInfo?.groupId || anyRes?.messageId || undefined;
    return { ok: true, messageId };
  } catch (e: any) {
    console.error("[solapi] send failed", e?.message);
    return { ok: false, error: e?.message || "unknown" };
  }
}

export function buildReportSms(params: { name: string; reportUrl: string; grade: string }) {
  return [
    `[스토리팜] ${params.name} 사장님, 무료 온라인 진단이 완료되었습니다.`,
    `등급: ${params.grade}`,
    `맞춤 리포트 → ${params.reportUrl}`,
    ``,
    `7년차 펜션 운영자 달팽이아지트 임솔이 직접 확인해드립니다.`,
  ].join("\n");
}

export function buildAdminAlertSms(params: { name: string; phone: string; kind: string; detail?: string }) {
  return [
    `[스토리팜 알림] 새 ${params.kind}`,
    `이름: ${params.name}`,
    `연락처: ${params.phone}`,
    params.detail ? `메모: ${params.detail}` : ``,
  ]
    .filter(Boolean)
    .join("\n");
}
