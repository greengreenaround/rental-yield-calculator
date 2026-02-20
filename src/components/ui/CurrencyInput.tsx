import { formatCurrency, parseCurrencyInput } from "@/lib/formatters";

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tooltip?: string;
}

export function CurrencyInput({
  label,
  value,
  onChange,
  tooltip,
}: CurrencyInputProps) {
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
          type="text"
          inputMode="numeric"
          value={formatCurrency(value)}
          onChange={(e) => onChange(parseCurrencyInput(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 text-right text-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400">
          원
        </span>
      </div>
    </div>
  );
}
