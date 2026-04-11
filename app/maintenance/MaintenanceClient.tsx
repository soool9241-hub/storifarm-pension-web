"use client";

import { useState } from "react";

export default function MaintenanceClient() {
  const [form, setForm] = useState({ name: "", phone: "", pension_name: "", plan: "standard" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/maintenance", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <div className="text-3xl">🐌</div>
        <h3 className="mt-2 text-lg font-bold">구독 문의가 접수되었습니다</h3>
        <p className="mt-1 text-sm text-ink-700">24시간 내 결제 안내 드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6">
      <h3 className="text-lg font-bold">유지보수 구독 문의</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          placeholder="성함"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <input
          placeholder="연락처"
          type="tel"
          value={form.phone}
          required
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <input
          placeholder="펜션명"
          value={form.pension_name}
          onChange={(e) => setForm({ ...form, pension_name: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        />
        <select
          value={form.plan}
          onChange={(e) => setForm({ ...form, plan: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        >
          <option value="basic">베이직 5만/월</option>
          <option value="standard">스탠다드 10만/월</option>
          <option value="premium">프리미엄 15만/월</option>
        </select>
      </div>
      {error && <div className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</div>}
      <button type="submit" className="btn-primary mt-4 w-full">
        구독 문의 보내기
      </button>
    </form>
  );
}
