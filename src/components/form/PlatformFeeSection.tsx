import type {
  RentalType,
  PlatformFees,
  ManagementPlatform,
} from "@/types/calculator";
import { SectionCard } from "@/components/ui/SectionCard";
import { PercentageInput } from "@/components/ui/PercentageInput";
import { PLATFORM_PRESETS } from "@/lib/constants";

interface Props {
  rentalType: RentalType;
  value: PlatformFees;
  onChange: (partial: Partial<PlatformFees>) => void;
}

export function PlatformFeeSection({ rentalType, value, onChange }: Props) {
  const handlePlatformChange = (platform: ManagementPlatform) => {
    const preset = PLATFORM_PRESETS[platform];
    onChange({
      managementPlatform: platform,
      managementFeeRate: preset.rate,
    });
  };

  if (rentalType === "shortTerm") {
    return (
      <SectionCard title="플랫폼 수수료">
        <PercentageInput
          label="계약 수수료"
          value={value.shortTermFeeRate}
          onChange={(v) => onChange({ shortTermFeeRate: v })}
          tooltip="단기임대 플랫폼 수수료 (보통 3.3%)"
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="플랫폼 수수료">
      <PercentageInput
        label="에어비앤비 수수료"
        value={value.airbnbFeeRate}
        onChange={(v) => onChange({ airbnbFeeRate: v })}
        tooltip="호스트 서비스 수수료 (보통 3%)"
      />
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          대행 플랫폼
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(
            Object.entries(PLATFORM_PRESETS) as [
              ManagementPlatform,
              { label: string; rate: number },
            ][]
          ).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePlatformChange(key)}
              className={`rounded-lg border px-3 py-2 text-xs transition-all ${
                value.managementPlatform === key
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {preset.label}
              {preset.rate > 0 && (
                <span className="ml-1 text-gray-400">
                  {(preset.rate * 100).toFixed(0)}%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {value.managementPlatform === "custom" && (
        <PercentageInput
          label="대행 수수료율"
          value={value.managementFeeRate}
          onChange={(v) => onChange({ managementFeeRate: v })}
        />
      )}
      {value.managementPlatform !== "none" && (
        <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
          총 수수료: 에어비앤비 {(value.airbnbFeeRate * 100).toFixed(0)}% +{" "}
          {PLATFORM_PRESETS[value.managementPlatform].label}{" "}
          {(value.managementFeeRate * 100).toFixed(0)}% ={" "}
          <span className="font-semibold text-gray-700">
            {((value.airbnbFeeRate + value.managementFeeRate) * 100).toFixed(0)}%
          </span>
        </div>
      )}
    </SectionCard>
  );
}
