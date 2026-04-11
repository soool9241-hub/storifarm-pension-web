"use client";
import { useState } from "react";

export default function AcademyClient() {
  const [form, setForm] = useState({ name: "", phone: "", product: "academy" });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await fetch("/api/enroll", {
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
        <div className="text-3xl">🎓</div>
        <h3 className="mt-2 text-lg font-bold">수강 신청이 접수되었습니다</h3>
        <p className="mt-1 text-sm text-ink-700">기수 오픈 시 문자로 안내드립니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6">
      <h3 className="text-lg font-bold">수강 신청</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
        <select
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          className="rounded-xl border border-ink-100 px-4 py-3 text-sm outline-none focus:border-brand-500"
        >
          <option value="online">온라인 멤버십 9.9만/월</option>
          <option value="oneday">원데이 세미나 30만</option>
          <option value="academy">4주 아카데미 99만</option>
        </select>
      </div>
      {err && <div className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{err}</div>}
      <button type="submit" className="btn-primary mt-4 w-full">
        수강 신청하기
      </button>
    </form>
  );
}
