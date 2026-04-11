"use client";
import { useState } from "react";

export default function PartnersClient() {
  const [form, setForm] = useState({
    applicant_name: "",
    phone: "",
    region_wish: "",
    experience: "",
    academy_grad: false,
  });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await fetch("/api/partner", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <div className="text-3xl">🤝</div>
        <h3 className="mt-2 text-lg font-bold">파트너 지원이 접수되었습니다</h3>
        <p className="mt-1 text-sm text-ink-700">
          1차 서류 심사 후 1:1 인터뷰 일정으로 연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6">
      <h3 className="text-lg font-bold">파트너 지원</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          placeholder="성함"
          required
          value={form.applicant_name}
          onChange={(e) => setForm({ ...form, applicant_name: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <input
          placeholder="연락처"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <input
          placeholder="희망 지역 (예: 충남)"
          required
          value={form.region_wish}
          onChange={(e) => setForm({ ...form, region_wish: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 sm:col-span-2"
        />
        <textarea
          placeholder="간단한 경력 / 펜션 운영 경험 / 사업 계획"
          rows={4}
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500 sm:col-span-2"
        />
        <label className="col-span-2 flex items-center gap-2 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={form.academy_grad}
            onChange={(e) => setForm({ ...form, academy_grad: e.target.checked })}
          />
          4주 아카데미 수료(예정)
        </label>
      </div>
      {err && <div className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{err}</div>}
      <button type="submit" className="btn-primary mt-4 w-full">
        파트너 지원하기
      </button>
    </form>
  );
}
