import type { InitialInvestment } from "@/types/calculator";
import { SectionCard } from "@/components/ui/SectionCard";
import { CurrencyInput } from "@/components/ui/CurrencyInput";

interface Props {
  value: InitialInvestment;
  onChange: (partial: Partial<InitialInvestment>) => void;
}

export function InitialInvestmentSection({ value, onChange }: Props) {
  return (
    <SectionCard title="초기 투자비용">
      <CurrencyInput
        label="보증금"
        value={value.securityDeposit}
        onChange={(v) => onChange({ securityDeposit: v })}
      />
      <CurrencyInput
        label="권리금"
        value={value.keyMoney}
        onChange={(v) => onChange({ keyMoney: v })}
      />
      <CurrencyInput
        label="인테리어비"
        value={value.interiorCost}
        onChange={(v) => onChange({ interiorCost: v })}
        tooltip="초기 공사 및 가구/가전 비용"
      />
    </SectionCard>
  );
}
