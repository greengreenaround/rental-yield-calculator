import type { MonthlyBreakdown } from "@/types/calculator";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  data: MonthlyBreakdown;
  monthlyGrossRevenue: number;
}

interface CostRow {
  name: string;
  value: number;
  color: string;
}

export function MonthlyCostSummary({ data, monthlyGrossRevenue }: Props) {
  const costs: CostRow[] = [
    { name: "월세", value: data.rent, color: "#FF8C42" },
    { name: "관리비", value: data.managementFee, color: "#45B7D1" },
    { name: "청소비", value: data.cleaningCostTotal, color: "#4ECDC4" },
    { name: "플랫폼 수수료", value: data.platformFeeAmount, color: "#FF6B6B" },
    { name: "보험", value: data.insurance, color: "#FFEAA7" },
    { name: "수선유지비", value: data.maintenance, color: "#DDA0DD" },
    { name: "공과금", value: data.utilities, color: "#98D8C8" },
  ].filter((c) => c.value > 0);

  const total = data.totalExpenses;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        월간 비용 구성
      </h3>
      <div className="mb-3 text-xs text-gray-400">
        총 {formatCurrency(Math.round(total))}원 / 월
      </div>

      {/* 수익 vs 비용 요약 */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-blue-50 px-3 py-2">
          <div className="text-[10px] text-blue-500">월 총수익</div>
          <div className="text-sm font-bold text-blue-700">
            {formatCurrency(Math.round(monthlyGrossRevenue))}원
          </div>
        </div>
        <div className="rounded-lg bg-red-50 px-3 py-2">
          <div className="text-[10px] text-red-400">월 총비용</div>
          <div className="text-sm font-bold text-red-600">
            {formatCurrency(Math.round(total))}원
          </div>
        </div>
        <div
          className={`rounded-lg px-3 py-2 ${data.netProfit >= 0 ? "bg-emerald-50" : "bg-red-50"}`}
        >
          <div
            className={`text-[10px] ${data.netProfit >= 0 ? "text-emerald-500" : "text-red-400"}`}
          >
            월 순수익
          </div>
          <div
            className={`text-sm font-bold ${data.netProfit >= 0 ? "text-emerald-700" : "text-red-600"}`}
          >
            {data.netProfit >= 0 ? "+" : ""}
            {formatCurrency(Math.round(data.netProfit))}원
          </div>
        </div>
      </div>

      {/* 전체 비율 스택 바 */}
      {costs.length > 0 && (
        <div className="mb-4 flex h-4 w-full overflow-hidden rounded-full">
          {costs.map((cost) => (
            <div
              key={cost.name}
              className="h-full transition-all duration-300"
              style={{
                width: `${(cost.value / total) * 100}%`,
                backgroundColor: cost.color,
              }}
            />
          ))}
        </div>
      )}

      {/* 항목별 리스트 */}
      <div className="space-y-2">
        {costs.map((cost) => {
          const pct = total > 0 ? ((cost.value / total) * 100).toFixed(1) : "0";
          return (
            <div key={cost.name} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: cost.color }}
              />
              <span className="flex-1 text-gray-600">{cost.name}</span>
              <span className="text-xs text-gray-400">{pct}%</span>
              <span className="w-24 text-right font-medium text-gray-900">
                {formatCurrency(Math.round(cost.value))}원
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
