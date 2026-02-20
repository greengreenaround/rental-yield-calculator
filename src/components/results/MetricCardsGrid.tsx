"use client";

import { useState } from "react";
import type { CalculationResult } from "@/types/calculator";
import {
  formatCurrency,
  formatPercent,
  formatPaybackPeriod,
} from "@/lib/formatters";
import { MetricCard } from "./MetricCard";

interface Props {
  result: CalculationResult;
}

type DepositMode = "include" | "exclude";

const f = (v: number) => `${formatCurrency(Math.round(v))}원`;

export function MetricCardsGrid({ result }: Props) {
  const [depositMode, setDepositMode] = useState<DepositMode>("exclude");

  const isProfit = result.annualNetProfit > 0;
  const yieldVariant = (v: number) =>
    v > 0 ? "success" : v < 0 ? "danger" : "default";

  const exDeposit = depositMode === "exclude";
  const investment = exDeposit
    ? result.investmentExDeposit
    : result.totalInvestment;
  const grossYield = exDeposit
    ? result.grossYieldExDeposit
    : result.grossYield;
  const netYield = exDeposit ? result.netYieldExDeposit : result.netYield;
  const payback = exDeposit
    ? result.paybackPeriodMonthsExDeposit
    : result.paybackPeriodMonths;

  const investLabel = exDeposit ? "투자금 (보증금 제외)" : "총 투자금";
  const hasDeposit = result.securityDeposit > 0;

  return (
    <div className="space-y-3">
      {/* 보증금 포함/미포함 토글 */}
      {hasDeposit && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            보증금 {f(result.securityDeposit)}{" "}
            {exDeposit ? "제외" : "포함"} 기준
          </div>
          <div className="flex rounded-lg bg-gray-100 p-0.5">
            <button
              onClick={() => setDepositMode("include")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                depositMode === "include"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              보증금 포함
            </button>
            <button
              onClick={() => setDepositMode("exclude")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                depositMode === "exclude"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              보증금 제외
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="총수익률"
          sublabel="Gross Yield"
          value={formatPercent(grossYield)}
          variant={yieldVariant(grossYield)}
          formula={{
            expression: `연 총수익 ÷ ${investLabel} × 100`,
            steps: [
              { label: "연 총수익", value: f(result.annualGrossRevenue) },
              { label: investLabel, value: f(investment) },
              {
                label: "총수익률",
                value: formatPercent(grossYield),
              },
            ],
          }}
        />
        <MetricCard
          label="순수익률"
          sublabel="Net Yield"
          value={formatPercent(netYield)}
          variant={yieldVariant(netYield)}
          formula={{
            expression: `연 순수익 ÷ ${investLabel} × 100`,
            steps: [
              { label: "연 총수익", value: f(result.annualGrossRevenue) },
              {
                label: "연 총비용",
                value: `- ${f(result.annualTotalExpenses)}`,
              },
              { label: "연 순수익", value: f(result.annualNetProfit) },
              { label: investLabel, value: f(investment) },
              { label: "순수익률", value: formatPercent(netYield) },
            ],
          }}
        />
        <MetricCard
          label="투자회수기간"
          sublabel="Payback Period"
          value={formatPaybackPeriod(payback)}
          variant={isProfit ? "warning" : "danger"}
          formula={{
            expression: `${investLabel} ÷ 연 순수익 × 12`,
            steps: [
              { label: investLabel, value: f(investment) },
              { label: "연 순수익", value: f(result.annualNetProfit) },
              {
                label: "회수기간",
                value: formatPaybackPeriod(payback),
              },
            ],
          }}
        />
        <MetricCard
          label="월 순수익"
          sublabel="Monthly Net"
          value={`${formatCurrency(Math.round(result.monthlyNetProfit))}원`}
          variant={result.monthlyNetProfit > 0 ? "success" : "danger"}
          formula={{
            expression: "연 순수익 ÷ 12개월",
            steps: [
              { label: "연 순수익", value: f(result.annualNetProfit) },
              { label: "÷ 12개월", value: "" },
              {
                label: "월 순수익",
                value: f(result.monthlyNetProfit),
              },
            ],
          }}
        />
      </div>
      <MetricCard
        label="연 순수익"
        sublabel="Annual Net Profit"
        value={`${formatCurrency(Math.round(result.annualNetProfit))}원`}
        variant={isProfit ? "success" : "danger"}
        size="large"
        formula={{
          expression: "연 총수익 - 연 총비용",
          steps: [
            { label: "연 총수익", value: f(result.annualGrossRevenue) },
            {
              label: "연 총비용",
              value: `- ${f(result.annualTotalExpenses)}`,
            },
            { label: "연 순수익", value: f(result.annualNetProfit) },
          ],
        }}
      />
    </div>
  );
}
