const DATA = [
  { year: "1년차", revenue: 1210, bookings: 16, label: "OTA 의존" },
  { year: "2년차", revenue: 1850, bookings: 24, label: "홈페이지 개설" },
  { year: "3년차", revenue: 3120, bookings: 41, label: "네이버 광고 시작" },
  { year: "4년차", revenue: 4680, bookings: 58, label: "SMS 자동화" },
  { year: "5년차", revenue: 6350, bookings: 74, label: "재방문 트리거" },
  { year: "6년차", revenue: 7420, bookings: 86, label: "전환 최적화" },
  { year: "7년차", revenue: 8248, bookings: 94, label: "자체예약 58%" },
];

export default function RevenueChart() {
  const max = Math.max(...DATA.map((d) => d.revenue));

  return (
    <div className="card p-5 sm:p-8">
      {/* Chart */}
      <div className="flex items-end justify-between gap-1.5 sm:gap-3">
        {DATA.map((d, i) => {
          const h = (d.revenue / max) * 100;
          const isLast = i === DATA.length - 1;
          const isFirst = i === 0;
          return (
            <div key={d.year} className="flex flex-1 flex-col items-center">
              {/* Value label on top */}
              <div
                className={`mb-1 text-[9px] font-semibold leading-tight sm:text-[11px] ${
                  isLast ? "text-brand-900" : isFirst ? "text-ink-500" : "text-ink-700"
                }`}
              >
                {d.revenue.toLocaleString()}
              </div>
              {/* Bar */}
              <div className="relative flex h-[140px] w-full items-end sm:h-[220px]">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    isLast
                      ? "bg-gradient-to-t from-brand-700 to-brand-500"
                      : "bg-ink-100"
                  }`}
                  style={{ height: `${h}%` }}
                />
              </div>
              {/* Year label */}
              <div
                className={`mt-2 text-[10px] font-medium sm:text-xs ${
                  isLast ? "text-brand-900" : "text-ink-500"
                }`}
              >
                {d.year}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend / summary */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ink-100 pt-5 text-center sm:mt-8 sm:pt-6">
        <div>
          <div className="text-[10px] text-ink-500 sm:text-xs">시작</div>
          <div className="mt-0.5 text-base font-bold text-ink-900 sm:text-xl">
            1,210<span className="text-[10px] font-medium text-ink-500 sm:text-xs"> 만원</span>
          </div>
          <div className="mt-0.5 text-[10px] text-ink-500 sm:text-[11px]">예약 16건</div>
        </div>
        <div className="border-x border-ink-100">
          <div className="text-[10px] text-brand-700 sm:text-xs">성장률</div>
          <div className="mt-0.5 text-base font-bold text-brand-900 sm:text-xl">7배 ↑</div>
          <div className="mt-0.5 text-[10px] text-brand-700 sm:text-[11px]">7년간</div>
        </div>
        <div>
          <div className="text-[10px] text-ink-500 sm:text-xs">현재</div>
          <div className="mt-0.5 text-base font-bold text-brand-900 sm:text-xl">
            8,248<span className="text-[10px] font-medium text-ink-500 sm:text-xs"> 만원</span>
          </div>
          <div className="mt-0.5 text-[10px] text-ink-500 sm:text-[11px]">예약 94건</div>
        </div>
      </div>

      <p className="mt-5 text-center text-[11px] text-ink-500 sm:text-xs">
        * 자체 예약 비율 58%, OTA 의존도는 해마다 감소
      </p>
    </div>
  );
}
