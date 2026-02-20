"use client";

import { useState } from "react";
import type { CalculatorInput, CalculationResult } from "@/types/calculator";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  input: CalculatorInput;
  result: CalculationResult;
}

type ViewMode = "monthly" | "annual";

const f = (v: number) => `${formatCurrency(Math.round(v))}원`;

export function DetailedBreakdown({ input, result }: Props) {
  const [mode, setMode] = useState<ViewMode>("monthly");

  const m = result.monthlyBreakdown[0];
  const months = result.monthlyBreakdown.filter(
    (b) => b.grossRevenue > 0
  ).length;
  const multiplier = mode === "annual" ? months : 1;
  const suffix = mode === "annual" ? "연" : "월";

  // 수익 항목
  const revenueItems: { name: string; detail: string; value: number }[] = [];

  const extraGuestPerDay =
    input.revenue.extraGuestFee *
    input.revenue.averageExtraGuests *
    input.revenue.extraGuestFrequency;

  if (input.rentalType === "airbnb") {
    const weekdayTotal =
      input.revenue.weekdayRate * input.revenue.weekdayOccupancy;
    const weekendTotal =
      input.revenue.weekendRate * input.revenue.weekendOccupancy;
    const totalDays =
      input.revenue.weekdayOccupancy + input.revenue.weekendOccupancy;
    const extraGuestTotal = extraGuestPerDay * totalDays;

    revenueItems.push({
      name: "평일 숙박",
      detail: `${f(input.revenue.weekdayRate)} × ${input.revenue.weekdayOccupancy}일`,
      value: weekdayTotal * multiplier,
    });
    revenueItems.push({
      name: "주말 숙박",
      detail: `${f(input.revenue.weekendRate)} × ${input.revenue.weekendOccupancy}일`,
      value: weekendTotal * multiplier,
    });
    if (extraGuestTotal > 0) {
      const freq = Math.round(input.revenue.extraGuestFrequency * 100);
      revenueItems.push({
        name: "인원 추가",
        detail: `${f(input.revenue.extraGuestFee)} × ${input.revenue.averageExtraGuests}명 × ${totalDays}일 × ${freq}%`,
        value: extraGuestTotal * multiplier,
      });
    }
  } else {
    const baseTotal =
      input.revenue.ratePerUnit * input.revenue.expectedOccupancyPerMonth;
    revenueItems.push({
      name: "단기임대",
      detail: `${f(input.revenue.ratePerUnit)} × ${input.revenue.expectedOccupancyPerMonth}건`,
      value: baseTotal * multiplier,
    });
    // 단기임대: extraGuestFee는 1주 단위
    const extraPerUnit = extraGuestPerDay;
    if (extraPerUnit > 0) {
      const freq = Math.round(input.revenue.extraGuestFrequency * 100);
      revenueItems.push({
        name: "인원 추가",
        detail: `${f(input.revenue.extraGuestFee)}/주 × ${input.revenue.averageExtraGuests}명 × ${freq}% × ${input.revenue.expectedOccupancyPerMonth}건`,
        value: extraPerUnit * input.revenue.expectedOccupancyPerMonth * multiplier,
      });
    }
  }

  const totalRevenue = m.grossRevenue * multiplier;

  // 비용 항목
  const expenseItems: { name: string; detail: string; value: number }[] = [];

  if (m.rent > 0) {
    expenseItems.push({
      name: "월세",
      detail: mode === "annual" ? `${f(m.rent)} × ${months}개월` : "",
      value: m.rent * multiplier,
    });
  }

  if (m.platformFeeAmount > 0) {
    let feeDetail: string;
    if (input.rentalType === "airbnb") {
      const totalFeeRate =
        input.platformFees.airbnbFeeRate + input.platformFees.managementFeeRate;
      feeDetail =
        input.platformFees.managementFeeRate > 0
          ? `에어비앤비 ${(input.platformFees.airbnbFeeRate * 100).toFixed(0)}% + 대행 ${(input.platformFees.managementFeeRate * 100).toFixed(0)}%`
          : `${(totalFeeRate * 100).toFixed(0)}%`;
    } else {
      feeDetail = `${(input.platformFees.shortTermFeeRate * 100).toFixed(1)}%`;
    }
    expenseItems.push({
      name: input.rentalType === "airbnb" ? "플랫폼 수수료" : "계약 수수료",
      detail: feeDetail,
      value: m.platformFeeAmount * multiplier,
    });
  }

  if (m.managementFee > 0) {
    expenseItems.push({
      name: "관리비",
      detail: mode === "annual" ? `${f(m.managementFee)} × ${months}개월` : "",
      value: m.managementFee * multiplier,
    });
  }

  if (m.cleaningCostTotal > 0) {
    const cleanDetail =
      input.rentalType === "airbnb"
        ? `${f(input.operatingCosts.cleaningCost)} × ${input.operatingCosts.cleaningFrequencyPerMonth}회`
        : "";
    expenseItems.push({
      name: "청소비",
      detail: cleanDetail,
      value: m.cleaningCostTotal * multiplier,
    });
  }

  if (m.insurance > 0) {
    expenseItems.push({
      name: "보험",
      detail: mode === "annual" ? `${f(m.insurance)} × ${months}개월` : "",
      value: m.insurance * multiplier,
    });
  }

  if (m.maintenance > 0) {
    expenseItems.push({
      name: "수선유지비",
      detail:
        mode === "annual" ? `${f(m.maintenance)} × ${months}개월` : "",
      value: m.maintenance * multiplier,
    });
  }

  if (m.utilities > 0) {
    expenseItems.push({
      name: "공과금",
      detail: mode === "annual" ? `${f(m.utilities)} × ${months}개월` : "",
      value: m.utilities * multiplier,
    });
  }

  if (m.taxAmount > 0) {
    expenseItems.push({
      name: "세금",
      detail: `${(input.operatingCosts.taxRate * 100).toFixed(1)}%`,
      value: m.taxAmount * multiplier,
    });
  }

  const totalExpenses = m.totalExpenses * multiplier;
  const netProfit = m.netProfit * multiplier;

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      {/* 헤더 + 토글 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          손익 상세
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

      {/* 수익 섹션 */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            수익
          </span>
        </div>
        <div className="space-y-1.5 pl-4">
          {revenueItems.map((item) => (
            <div
              key={item.name}
              className="flex items-baseline justify-between text-sm"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-gray-700">{item.name}</span>
                {item.detail && (
                  <span className="text-[11px] text-gray-400">
                    {item.detail}
                  </span>
                )}
              </div>
              <span className="font-medium text-gray-900">
                {f(item.value)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between border-t border-blue-100 pl-4 pt-2">
          <span className="text-sm font-semibold text-blue-700">
            {suffix} 총수익
          </span>
          <span className="text-sm font-bold text-blue-700">
            {f(totalRevenue)}
          </span>
        </div>
      </div>

      {/* 비용 섹션 */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
            비용
          </span>
        </div>
        <div className="space-y-1.5 pl-4">
          {expenseItems.map((item) => (
            <div
              key={item.name}
              className="flex items-baseline justify-between text-sm"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-gray-700">{item.name}</span>
                {item.detail && (
                  <span className="text-[11px] text-gray-400">
                    {item.detail}
                  </span>
                )}
              </div>
              <span className="font-medium text-gray-900">
                {f(item.value)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between border-t border-red-100 pl-4 pt-2">
          <span className="text-sm font-semibold text-red-600">
            {suffix} 총비용
          </span>
          <span className="text-sm font-bold text-red-600">
            {f(totalExpenses)}
          </span>
        </div>
      </div>

      {/* 순수익 */}
      <div
        className={`flex justify-between rounded-lg px-4 py-3 ${
          netProfit >= 0 ? "bg-emerald-50" : "bg-red-50"
        }`}
      >
        <span
          className={`text-sm font-bold ${
            netProfit >= 0 ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {suffix} 순수익
        </span>
        <span
          className={`text-sm font-bold ${
            netProfit >= 0 ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {netProfit >= 0 ? "+" : ""}
          {f(netProfit)}
        </span>
      </div>
    </div>
  );
}
