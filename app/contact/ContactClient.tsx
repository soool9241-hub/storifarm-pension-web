"use client";

import { useState } from "react";

type Tier = "light" | "standard" | "premium";

export default function ContactClient({
  defaultTier,
  leadId,
}: {
  defaultTier?: Tier;
  leadId?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pension_name: "",
    region: "",
    channel: "phone" as "phone" | "kakao" | "zoom",
    tier: (defaultTier as Tier | undefined) || ("standard" as Tier),
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, lead_id: leadId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "서버 오류");
      setStatus("done");
    } catch (e: any) {
      setError(e.message);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card p-8 text-center">
        <div className="text-5xl">✅</div>
        <h2 className="mt-3 text-xl font-bold">상담 신청이 접수되었습니다</h2>
        <p className="mt-2 text-sm text-ink-700">
          임솔 대표가 24시간 내 직접 연락드립니다.
          <br />
          그동안 먼저{" "}
          <a href="https://dalpaengi-five.vercel.app" target="_blank" rel="noopener" className="underline">
            달팽이아지트 실사이트
          </a>
          를 구경해보세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <Row>
        <Field label="성함" v={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field label="연락처" type="tel" v={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
      </Row>
      <Row>
        <Field label="펜션명 (선택)" v={form.pension_name} onChange={(v) => setForm({ ...form, pension_name: v })} />
        <Field label="지역 (선택)" v={form.region} onChange={(v) => setForm({ ...form, region: v })} />
      </Row>

      <div>
        <div className="label mb-2">관심 Tier</div>
        <div className="grid grid-cols-3 gap-2">
          {(["light", "standard", "premium"] as Tier[]).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setForm({ ...form, tier: t })}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                form.tier === t
                  ? "border-brand-500 bg-brand-50 font-semibold text-brand-900"
                  : "border-ink-100 bg-white text-ink-700"
              }`}
            >
              {t === "light" ? "라이트 150만" : t === "standard" ? "스탠다드 300만" : "프리미엄 500만"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="label mb-2">선호 상담 채널</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { k: "phone", t: "전화 30분" },
            { k: "kakao", t: "카카오톡" },
            { k: "zoom", t: "Zoom 영상" },
          ].map((c) => (
            <button
              type="button"
              key={c.k}
              onClick={() => setForm({ ...form, channel: c.k as any })}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                form.channel === c.k
                  ? "border-brand-500 bg-brand-50 font-semibold text-brand-900"
                  : "border-ink-100 bg-white text-ink-700"
              }`}
            >
              {c.t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="label mb-1">남길 말 (선택)</div>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="현재 쓰는 홈페이지 주소, 광고비 규모 등 편하게 남겨주세요"
          rows={4}
          className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</div>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full"
      >
        {status === "sending" ? "전송 중..." : "상담 신청하기"}
      </button>
      <p className="text-center text-[11px] text-ink-500">
        * 제출 후 24시간 내 임솔 대표가 직접 연락드립니다.
      </p>
    </form>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  v,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  v: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="label mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </div>
      <input
        type={type}
        value={v}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
      />
    </label>
  );
}
