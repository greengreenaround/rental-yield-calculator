"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyBreakdown } from "@/types/calculator";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  data: MonthlyBreakdown[];
}

export function MonthlyRevenueChart({ data }: Props) {
  const chartData = data.map((d) => ({
    name: `${d.month}월`,
    총수익: d.grossRevenue,
    순수익: d.netProfit,
  }));

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        월별 수익 현황
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
            />
            <Tooltip
              formatter={(value) => `${formatCurrency(Number(value))}원`}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="총수익"
              fill="#93C5FD"
              radius={[4, 4, 0, 0]}
              animationDuration={300}
            />
            <Bar
              dataKey="순수익"
              fill="#6EE7B7"
              radius={[4, 4, 0, 0]}
              animationDuration={300}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
