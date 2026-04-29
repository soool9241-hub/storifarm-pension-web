"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, TOTAL_MAX, scoreDiagnostic, gradeOf } from "@/lib/scoring";
import type { DiagnosticAnswers } from "@/lib/types";

type Step = "quiz" | "contact" | "submitting" | "done";

export default function DiagnosticClient() {
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [step, setStep] = useState<Step>("quiz");
  const [form, setForm] = useState({ name: "", phone: "", pension_name: "", region: "" });
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const result = useMemo(() => scoreDiagnostic(answers), [answers]);
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const grade = gradeOf(result.pct);

  function toggle(id: string) {
    setAnswers((a) => ({ ...a, [id]: !a[id] }));
  }

  async function submit() {
    setError(null);
    if (!form.name.trim() || !form.phone.trim()) {
      setError("성함과 연락처는 필수입니다.");
      return;
    }
    setStep("submitting");
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "서버 오류");
      setResultUrl(data.reportUrl);
      setStep("done");
    } catch (e: any) {
      setError(e.message);
      setStep("contact");
    }
  }

  if (step === "done") {
    return (
      <div className="card overflow-hidden">
        <div className="bg-brand-50 px-6 py-8 text-center">
          <div className="label text-brand-700">체크 다 끝났어요</div>
          <div className="mt-1 text-4xl font-bold text-brand-900">{grade.grade}등급</div>
          <div className="mt-1 text-sm text-brand-700">{grade.label} · {result.pct}점</div>
        </div>
        <div className="p-6 text-sm text-ink-700">
          <p className="mb-4">{grade.msg}</p>
          <p className="mb-4">
            방금 <b>{form.phone}</b> 번호로 결과지 보는 링크를 문자로 보내드렸어요.
            잠시 뒤 휴대폰 문자함을 확인해 주세요.
          </p>
          {resultUrl && (
            <a href={resultUrl} className="btn-primary w-full">
              지금 바로 결과지 보러 가기
            </a>
          )}
        </div>
      </div>
    );
  }

  if (step === "contact" || step === "submitting") {
    return (
      <div className="card p-6">
        <div className="mb-5 rounded-xl bg-brand-50 p-4 text-center">
          <div className="label text-brand-700">예상 등급</div>
          <div className="mt-1 text-3xl font-bold text-brand-900">{grade.grade} · {result.pct}점</div>
          <div className="mt-1 text-xs text-brand-700">{grade.label}</div>
        </div>
        <h2 className="text-lg font-semibold">결과지를 어디로 보내드릴까요?</h2>
        <p className="mt-1 text-xs text-ink-500">
          알려주신 번호로 결과지만 한 번 보내드려요. 광고 전화는 절대 드리지 않습니다.
        </p>

        <div className="mt-5 grid gap-3">
          <Field label="사장님 성함" v={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="예) 김사장" />
          <Field
            label="문자 받으실 휴대폰 번호"
            v={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            placeholder="010-0000-0000"
            type="tel"
          />
          <Field label="펜션 이름 (안 적으셔도 돼요)" v={form.pension_name} onChange={(v) => setForm({ ...form, pension_name: v })} placeholder="예) 달팽이아지트" />
          <Field label="펜션 지역 (안 적으셔도 돼요)" v={form.region} onChange={(v) => setForm({ ...form, region: v })} placeholder="예) 전북 완주" />
        </div>

        {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</div>}

        <div className="mt-6 flex gap-2">
          <button onClick={() => setStep("quiz")} className="btn-ghost flex-1" disabled={step === "submitting"}>
            ← 다시 체크하러 가기
          </button>
          <button onClick={submit} className="btn-primary flex-1" disabled={step === "submitting"}>
            {step === "submitting" ? "보내는 중..." : "결과지 받아보기"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="label">지금까지 체크하신 것</div>
            <div className="text-sm font-semibold">
              {answeredCount}개 체크 · 지금 점수 {result.pct}점 ({grade.grade}등급)
            </div>
          </div>
          <div className="text-right">
            <div className="label">전체 점수</div>
            <div className="text-lg font-bold text-brand-900">
              {result.score} / {TOTAL_MAX}
            </div>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full bg-brand-500 transition-all"
            style={{ width: `${result.pct}%` }}
          />
        </div>
      </div>

      {/* Categories */}
      {CATEGORIES.map((cat) => {
        const cs = result.categoryScores[cat.id];
        const isPain = cat.id === "pain";
        const checkedCount = cat.items.filter((i) => answers[i.id]).length;
        return (
          <div key={cat.id} className="card overflow-hidden">
            <div
              className={`flex items-center justify-between border-b border-ink-100 px-5 py-3 ${
                isPain ? "bg-red-50" : "bg-ink-100/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-semibold">{cat.title}</span>
              </div>
              <div className="text-xs text-ink-500">
                {isPain ? `${checkedCount}개 해당` : `${cs.score}/${cs.max}점`}
              </div>
            </div>
            {isPain && (
              <div className="border-b border-ink-100 bg-red-50/40 px-5 py-2.5 text-[11px] leading-relaxed text-red-900 sm:text-xs">
                해당되는 고민에 체크해주시면, 리포트에 사장님 상황에 맞는 해결책을 우선순위로 정리해드립니다. (점수에는 반영되지 않습니다)
              </div>
            )}
            <ul className="divide-y divide-ink-100">
              {cat.items.map((item) => {
                const checked = !!answers[item.id];
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={`flex w-full items-start gap-3 px-5 py-4 text-left transition ${
                        checked
                          ? isPain
                            ? "bg-red-50/60"
                            : "bg-brand-50/50"
                          : "hover:bg-ink-100/30"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[11px] ${
                          checked
                            ? isPain
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-brand-500 bg-brand-500 text-white"
                            : "border-ink-300 bg-white"
                        }`}
                      >
                        {checked ? "✓" : ""}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-ink-900">{item.label}</div>
                        {item.desc && (
                          <div className="mt-0.5 text-xs text-ink-500">{item.desc}</div>
                        )}
                      </div>
                      {item.score > 0 && (
                        <span className="shrink-0 text-xs text-ink-500">+{item.score}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div className="sticky bottom-4 z-10">
        <button onClick={() => setStep("contact")} className="btn-primary w-full">
          결과 보러 가기 →
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  v,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  v: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="label mb-1">{label}</div>
      <input
        type={type}
        value={v}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
      />
    </label>
  );
}
