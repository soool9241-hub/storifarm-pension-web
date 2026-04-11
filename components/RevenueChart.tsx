const DATA = [
  { year: "2021", revenue: 1210, bookings: 16, direct: 0 },
  { year: "2022", revenue: 1850, bookings: 24, direct: 10 },
  { year: "2023", revenue: 3120, bookings: 41, direct: 28 },
  { year: "2024", revenue: 5480, bookings: 68, direct: 55 },
  { year: "2025", revenue: 8248, bookings: 94, direct: 100 },
];

export default function RevenueChart() {
  const max = Math.max(...DATA.map((d) => d.revenue));

  return (
    <div className="card p-5 sm:p-8">
      {/* Chart */}
      <div className="flex items-end justify-between gap-2 sm:gap-4">
        {DATA.map((d, i) => {
          const h = (d.revenue / max) * 100;
          const isLast = i === DATA.length - 1;
          const isFirst = i === 0;
          return (
            <div key={d.year} className="flex flex-1 flex-col items-center">
              {/* Value label on top */}
              <div
                className={`mb-1 text-[10px] font-bold leading-tight sm:text-[12px] ${
                  isLast ? "text-brand-900" : isFirst ? "text-ink-500" : "text-ink-700"
                }`}
              >
                {d.revenue.toLocaleString()}
              </div>
              {/* Bar */}
              <div className="relative flex h-[160px] w-full items-end sm:h-[240px]">
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    isLast
                      ? "bg-gradient-to-t from-brand-700 to-brand-500 shadow-lg shadow-brand-700/20"
                      : "bg-ink-100"
                  }`}
                  style={{ height: `${h}%` }}
                />
              </div>
              {/* Year label */}
              <div
                className={`mt-2 text-[11px] font-semibold sm:text-sm ${
                  isLast ? "text-brand-900" : "text-ink-500"
                }`}
              >
                {d.year}
              </div>
              {/* Bookings */}
              <div className="text-[9px] text-ink-500 sm:text-[11px]">
                {d.bookings}건
              </div>
            </div>
          );
        })}
      </div>

      {/* Before / After */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
        <div className="rounded-2xl border border-ink-100 p-4 sm:p-5">
          <div className="text-[10px] font-medium text-ink-500 sm:text-xs">BEFORE · 2021</div>
          <div className="mt-1 text-lg font-bold text-ink-900 sm:text-2xl">
            1,210<span className="text-[11px] font-medium text-ink-500 sm:text-sm"> 만원</span>
          </div>
          <div className="mt-1 text-[11px] text-ink-500 sm:text-xs">예약 16건</div>
          <div className="mt-2 inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700 sm:text-[11px]">
            OTA 플랫폼 100%
          </div>
        </div>
        <div className="rounded-2xl bg-brand-900 p-4 text-white sm:p-5">
          <div className="text-[10px] font-medium text-brand-100 sm:text-xs">AFTER · 2025</div>
          <div className="mt-1 text-lg font-bold sm:text-2xl">
            8,248<span className="text-[11px] font-medium text-brand-100 sm:text-sm"> 만원</span>
          </div>
          <div className="mt-1 text-[11px] text-brand-100 sm:text-xs">예약 94건</div>
          <div className="mt-2 inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-brand-900 sm:text-[11px]">
            자체 예약 100%
          </div>
        </div>
      </div>

      {/* Key impact: savings */}
      <div className="mt-4 rounded-2xl border-2 border-brand-500 bg-brand-50 p-4 text-center sm:p-5">
        <div className="text-[10px] font-semibold tracking-wider text-brand-700 sm:text-xs">
          7배 매출 성장 + 플랫폼 수수료 절감
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] font-bold text-brand-900 sm:text-lg">
          <span>건당 10만원</span>
          <span className="text-brand-500">×</span>
          <span>100건</span>
          <span className="text-brand-500">=</span>
          <span className="rounded-lg bg-brand-700 px-2.5 py-1 text-white">연 1,000만원 절감</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-brand-700 sm:text-xs">
          * 자체 홈페이지로 예약이 들어오면 OTA 수수료 0원 — 그게 곧 순이익입니다
        </p>
      </div>
    </div>
  );
}
