"use client";

import { useState } from "react";
import type { CalculationResult } from "@/types/calculator";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  result: CalculationResult;
}

type ViewMode = "monthly" | "annual";

interface CostRow {
  name: string;
  monthly: number;
  color: string;
}

export function CostSummary({ result }: Props) {
  const [mode, setMode] = useState<ViewMode>("monthly");

  const m = result.monthlyBreakdown[0];
  const months = result.monthlyBreakdown.filter((b) => b.grossRevenue > 0).length;
  const multiplier = mode === "annual" ? months : 1;
  const suffix = mode === "annual" ? "연" : "월";

  const costs: CostRow[] = [
    { name: "월세", monthly: m.rent, color: "#FF8C42" },
    { name: "관리비", monthly: m.managementFee, color: "#45B7D1" },
    { name: "청소비", monthly: m.cleaningCostTotal, color: "#4ECDC4" },
    { name: "플랫폼 수수료", monthly: m.platformFeeAmount, color: "#FF6B6B" },
    { name: "보험", monthly: m.insurance, color: "#FFEAA7" },
    { name: "수선유지비", monthly: m.maintenance, color: "#DDA0DD" },
    { name: "공과금", monthly: m.utilities, color: "#98D8C8" },
  ].filter((c) => c.monthly > 0);

  const totalRevenue = m.grossRevenue * multiplier;
  const totalExpenses = m.totalExpenses * multiplier;
  const netProfit = m.netProfit * multiplier;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      {/* 헤더 + 토글 */}
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          비용 구성
        </h3>
        <div className="flex rounded-lg bg-gray-100 p-0.5">
          <button
            onClick={() => setMode("monthly")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              mode === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            월간
          </button>
          <button
            onClick={() => setMode("annual")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              mode === "annual"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            연간
          </button>
        </div>
      </div>
      <div className="mb-3 text-xs text-gray-400">
        총 {formatCurrency(Math.round(totalExpenses))}원 / {suffix}
        {mode === "annual" && ` (${months}개월 운영)`}
      </div>

      {/* 수익 vs 비용 요약 */}
      <div className="mb-4 grid grid-cols-3 gap-1.5 sm:gap-2">
        <div className="rounded-lg bg-blue-50 px-2 py-2 sm:px-3">
          <div className="text-[10px] text-blue-500">{suffix} 총수익</div>
          <div className="text-xs font-bold text-blue-700 sm:text-sm">
            {formatCurrency(Math.round(totalRevenue))}원
          </div>
        </div>
        <div className="rounded-lg bg-red-50 px-2 py-2 sm:px-3">
          <div className="text-[10px] text-red-400">{suffix} 총비용</div>
          <div className="text-xs font-bold text-red-600 sm:text-sm">
            {formatCurrency(Math.round(totalExpenses))}원
          </div>
        </div>
        <div
          className={`rounded-lg px-2 py-2 sm:px-3 ${netProfit >= 0 ? "bg-emerald-50" : "bg-red-50"}`}
        >
          <div
            className={`text-[10px] ${netProfit >= 0 ? "text-emerald-500" : "text-red-400"}`}
          >
            {suffix} 순수익
          </div>
          <div
            className={`text-xs font-bold sm:text-sm ${netProfit >= 0 ? "text-emerald-700" : "text-red-600"}`}
          >
            {netProfit >= 0 ? "+" : ""}
            {formatCurrency(Math.round(netProfit))}원
          </div>
        </div>
      </div>

      {/* 스택 바 */}
      {costs.length > 0 && (
        <div className="mb-4 flex h-4 w-full overflow-hidden rounded-full">
          {costs.map((cost) => (
            <div
              key={cost.name}
              className="h-full transition-all duration-300"
              style={{
                width: `${(cost.monthly / m.totalExpenses) * 100}%`,
                backgroundColor: cost.color,
              }}
            />
          ))}
        </div>
      )}

      {/* 항목별 리스트 */}
      <div className="space-y-2">
        {costs.map((cost) => {
          const value = cost.monthly * multiplier;
          const pct =
            totalExpenses > 0
              ? ((value / totalExpenses) * 100).toFixed(1)
              : "0";
          return (
            <div key={cost.name} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: cost.color }}
              />
              <span className="flex-1 text-gray-600">{cost.name}</span>
              <span className="text-xs text-gray-400">{pct}%</span>
              <span className="text-right font-medium text-gray-900">
                {formatCurrency(Math.round(value))}원
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
