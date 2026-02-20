"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { CostBreakdownItem } from "@/types/calculator";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  data: CostBreakdownItem[];
  totalExpenses: number;
}

export function CostBreakdownChart({ data, totalExpenses }: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
          연간 비용 구성
        </h3>
        <div className="flex h-48 items-center justify-center text-sm text-gray-400">
          비용 항목이 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        연간 비용 구성
      </h3>
      <div className="mb-3 text-xs text-gray-400">
        총 {formatCurrency(Math.round(totalExpenses))}원
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              animationDuration={300}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${formatCurrency(Math.round(Number(value)))}원`}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              formatter={(value: string) => (
                <span className="text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
