import type { CalculatorInput, CalculationResult } from "@/types/calculator";
import { MetricCardsGrid } from "./MetricCardsGrid";
import { CostSummary } from "./CostSummary";
import { DetailedBreakdown } from "./DetailedBreakdown";
import { MonthlyRevenueChart } from "./MonthlyRevenueChart";

interface Props {
  input: CalculatorInput;
  result: CalculationResult;
}

export function ResultsDashboard({ input, result }: Props) {
  return (
    <div className="space-y-4">
      <MetricCardsGrid result={result} />
      <DetailedBreakdown input={input} result={result} />
      <CostSummary result={result} />
      <MonthlyRevenueChart data={result.monthlyBreakdown} />
    </div>
  );
}
