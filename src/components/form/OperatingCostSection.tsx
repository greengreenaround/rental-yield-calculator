import type { RentalType, OperatingCosts } from "@/types/calculator";
import { SectionCard } from "@/components/ui/SectionCard";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { InputField } from "@/components/ui/InputField";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  rentalType: RentalType;
  value: OperatingCosts;
  onChange: (partial: Partial<OperatingCosts>) => void;
}

export function OperatingCostSection({ rentalType, value, onChange }: Props) {
  const totalCleaning = value.cleaningCost * value.cleaningFrequencyPerMonth;

  return (
    <SectionCard title="월 운영비용">
      <CurrencyInput
        label="월세"
        value={value.monthlyRent}
        onChange={(v) => onChange({ monthlyRent: v })}
      />
      <CurrencyInput
        label="관리비"
        value={value.monthlyManagementFee}
        onChange={(v) => onChange({ monthlyManagementFee: v })}
      />
      <CurrencyInput
        label="공과금"
        value={value.monthlyUtilities}
        onChange={(v) => onChange({ monthlyUtilities: v })}
        tooltip="전기, 수도, 가스, 인터넷 등"
      />
      <CurrencyInput
        label="청소비 (1건당)"
        value={value.cleaningCost}
        onChange={(v) => onChange({ cleaningCost: v })}
      />
      <InputField
        label="월 청소 횟수"
        value={value.cleaningFrequencyPerMonth}
        onChange={(v) => onChange({ cleaningFrequencyPerMonth: v })}
        suffix="회"
        min={0}
        max={31}
      />
      <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
        월 청소비 합계:{" "}
        <span className="font-medium text-gray-700">
          {formatCurrency(totalCleaning)}원
        </span>
      </div>
      <CurrencyInput
        label="보험료"
        value={value.monthlyInsurance}
        onChange={(v) => onChange({ monthlyInsurance: v })}
      />
      <CurrencyInput
        label="수선유지비"
        value={value.monthlyMaintenance}
        onChange={(v) => onChange({ monthlyMaintenance: v })}
        tooltip="월 평균 수리/유지보수 비용"
      />
    </SectionCard>
  );
}
