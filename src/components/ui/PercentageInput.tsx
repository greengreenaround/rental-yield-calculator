"use client";

import { useState, useEffect, useRef } from "react";

interface PercentageInputProps {
  label: string;
  value: number; // 소수점 형태 (0.03 = 3%)
  onChange: (value: number) => void;
  tooltip?: string;
}

export function PercentageInput({
  label,
  value,
  onChange,
  tooltip,
}: PercentageInputProps) {
  const [localValue, setLocalValue] = useState(() =>
    formatDisplay(value * 100)
  );
  const isFocused = useRef(false);

  // 외부 value 변경 시 (타입 전환 등) — 포커스 중이 아닐 때만 동기화
  useEffect(() => {
    if (!isFocused.current) {
      setLocalValue(formatDisplay(value * 100));
    }
  }, [value]);

  function formatDisplay(v: number): string {
    // 정수면 소수점 없이, 소수면 소수점 한자리
    return v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
  }

  return (
    <div>
      <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
        {tooltip && (
          <span className="group relative cursor-help">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[10px] text-gray-500">
              ?
            </span>
            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {tooltip}
            </span>
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          step="1"
          min="0"
          max="100"
          value={localValue}
          onFocus={() => {
            isFocused.current = true;
          }}
          onChange={(e) => {
            setLocalValue(e.target.value);
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) {
              onChange(Math.min(parsed, 100) / 100);
            }
          }}
          onBlur={() => {
            isFocused.current = false;
            const parsed = parseFloat(localValue);
            if (!isNaN(parsed)) {
              const clamped = Math.min(parsed, 100);
              onChange(clamped / 100);
              setLocalValue(formatDisplay(clamped));
            } else {
              setLocalValue(formatDisplay(value * 100));
            }
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 text-right text-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400">
          %
        </span>
      </div>
    </div>
  );
}
