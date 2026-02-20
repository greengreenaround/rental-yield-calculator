"use client";

import { useState } from "react";

interface FormulaLine {
  label: string;
  value: string;
}

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  variant?: "default" | "success" | "danger" | "warning";
  size?: "normal" | "large";
  formula?: {
    expression: string; // e.g. "연 총수익 ÷ 총 투자금 × 100"
    steps: FormulaLine[];
  };
}

const variantStyles = {
  default: "bg-white",
  success: "bg-emerald-50 border-emerald-200",
  danger: "bg-red-50 border-red-200",
  warning: "bg-amber-50 border-amber-200",
};

const valueStyles = {
  default: "text-gray-900",
  success: "text-emerald-700",
  danger: "text-red-600",
  warning: "text-amber-700",
};

export function MetricCard({
  label,
  value,
  sublabel,
  variant = "default",
  size = "normal",
  formula,
}: MetricCardProps) {
  const [showFormula, setShowFormula] = useState(false);

  return (
    <div
      className={`relative rounded-xl border p-4 shadow-sm transition-all duration-300 ${variantStyles[variant]} ${formula ? "cursor-pointer" : ""}`}
      onMouseEnter={() => formula && setShowFormula(true)}
      onMouseLeave={() => setShowFormula(false)}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        {formula && (
          <span className="text-[10px] text-gray-300">ⓘ</span>
        )}
      </div>
      {sublabel && (
        <div className="text-[10px] text-gray-400">{sublabel}</div>
      )}
      <div
        className={`mt-1 font-bold ${size === "large" ? "text-2xl" : "text-xl"} ${valueStyles[variant]}`}
      >
        {value}
      </div>

      {/* 호버 시 공식 표시 */}
      {formula && showFormula && (
        <div className="absolute left-0 top-full z-20 mt-1 w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <div className="mb-2 text-[11px] font-semibold text-gray-700">
            {formula.expression}
          </div>
          <div className="space-y-1 border-t pt-2">
            {formula.steps.map((step, i) => (
              <div
                key={i}
                className={`flex justify-between text-[11px] ${
                  i === formula.steps.length - 1
                    ? "border-t pt-1 font-semibold text-gray-900"
                    : "text-gray-500"
                }`}
              >
                <span>{step.label}</span>
                <span className="font-medium">{step.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
