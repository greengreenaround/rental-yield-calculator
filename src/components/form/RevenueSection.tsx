import type { RentalType, RevenueInput } from "@/types/calculator";
import { SectionCard } from "@/components/ui/SectionCard";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { InputField } from "@/components/ui/InputField";
import { PercentageInput } from "@/components/ui/PercentageInput";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  rentalType: RentalType;
  value: RevenueInput;
  onChange: (partial: Partial<RevenueInput>) => void;
}

export function RevenueSection({ rentalType, value, onChange }: Props) {
  const isAirbnb = rentalType === "airbnb";

  // 인원 추가 수익 계산 (발생 비율 반영)
  const extraGuestPerDay =
    value.extraGuestFee * value.averageExtraGuests * value.extraGuestFrequency;

  if (isAirbnb) {
    const weekdayTotal = value.weekdayRate * value.weekdayOccupancy;
    const weekendTotal = value.weekendRate * value.weekendOccupancy;
    const totalDays = value.weekdayOccupancy + value.weekendOccupancy;
    const extraGuestTotal = extraGuestPerDay * totalDays;
    const monthlyTotal = weekdayTotal + weekendTotal + extraGuestTotal;

    return (
      <SectionCard title="수익 설정">
        <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
          평일/주말 요금을 분리하여 더 정확하게 계산합니다
        </div>

        {/* 평일 */}
        <div className="space-y-2 rounded-lg border border-gray-100 p-3">
          <div className="text-xs font-semibold text-gray-500">평일 (월~목)</div>
          <CurrencyInput
            label="1일 요금"
            value={value.weekdayRate}
            onChange={(v) => onChange({ weekdayRate: v })}
          />
          <InputField
            label="월 입실일수"
            value={value.weekdayOccupancy}
            onChange={(v) => onChange({ weekdayOccupancy: v })}
            suffix="일"
            min={0}
            max={22}
            tooltip="한 달 평일 중 실제 투숙일수 (평일 약 22일)"
          />
          <div className="text-right text-xs text-gray-400">
            평일 수익: {formatCurrency(weekdayTotal)}원
          </div>
        </div>

        {/* 주말 */}
        <div className="space-y-2 rounded-lg border border-gray-100 p-3">
          <div className="text-xs font-semibold text-gray-500">주말 (금~일)</div>
          <CurrencyInput
            label="1일 요금"
            value={value.weekendRate}
            onChange={(v) => onChange({ weekendRate: v })}
          />
          <InputField
            label="월 입실일수"
            value={value.weekendOccupancy}
            onChange={(v) => onChange({ weekendOccupancy: v })}
            suffix="일"
            min={0}
            max={13}
            tooltip="한 달 주말 입실일수 (금,토 기준 약 8~9일)"
          />
          <div className="text-right text-xs text-gray-400">
            주말 수익: {formatCurrency(weekendTotal)}원
          </div>
        </div>

        {/* 인원 추가 요금 */}
        <div className="space-y-2 rounded-lg border border-gray-100 p-3">
          <div className="text-xs font-semibold text-gray-500">인원 추가 요금</div>
          <CurrencyInput
            label="인당 추가 요금"
            value={value.extraGuestFee}
            onChange={(v) => onChange({ extraGuestFee: v })}
            tooltip="기본 인원 초과 시 1인당 추가 요금"
          />
          <InputField
            label="평균 추가 인원"
            value={value.averageExtraGuests}
            onChange={(v) => onChange({ averageExtraGuests: v })}
            suffix="명"
            min={0}
            max={10}
            tooltip="기본 인원 대비 평균 추가 투숙 인원"
          />
          <PercentageInput
            label="인원 추가 발생 비율"
            value={value.extraGuestFrequency}
            onChange={(v) => onChange({ extraGuestFrequency: v })}
            tooltip="전체 예약 중 추가 인원이 발생하는 비율"
          />
          {extraGuestTotal > 0 && (
            <div className="text-right text-xs text-gray-400">
              인원 추가 수익: {formatCurrency(Math.round(extraGuestTotal))}원
            </div>
          )}
        </div>

        {/* 월 합계 */}
        <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">월 예상 총수익</span>
            <span className="font-bold text-gray-900">
              {formatCurrency(monthlyTotal)}원
            </span>
          </div>
        </div>

        <InputField
          label="연간 운영 개월수"
          value={value.operatingMonthsPerYear}
          onChange={(v) => onChange({ operatingMonthsPerYear: v })}
          suffix="개월"
          min={1}
          max={12}
        />
      </SectionCard>
    );
  }

  // 단기임대: extraGuestFee를 1주 단위로 해석
  const shortTermExtraGuest = extraGuestPerDay; // 이미 1주 단위
  const shortTermPerUnit = value.ratePerUnit + shortTermExtraGuest;

  return (
    <SectionCard title="수익 설정">
      <CurrencyInput
        label="7일 요금"
        value={value.ratePerUnit}
        onChange={(v) => onChange({ ratePerUnit: v })}
        tooltip="7일 단위 임대 요금"
      />

      {/* 인원 추가 요금 */}
      <div className="space-y-2 rounded-lg border border-gray-100 p-3">
        <div className="text-xs font-semibold text-gray-500">인원 추가 요금</div>
        <CurrencyInput
          label="인당 추가 요금 (1주)"
          value={value.extraGuestFee}
          onChange={(v) => onChange({ extraGuestFee: v })}
          tooltip="기본 인원 초과 시 1인당 1주 추가 요금"
        />
        <InputField
          label="평균 추가 인원"
          value={value.averageExtraGuests}
          onChange={(v) => onChange({ averageExtraGuests: v })}
          suffix="명"
          min={0}
          max={10}
        />
        <PercentageInput
          label="인원 추가 발생 비율"
          value={value.extraGuestFrequency}
          onChange={(v) => onChange({ extraGuestFrequency: v })}
          tooltip="전체 예약 중 추가 인원이 발생하는 비율"
        />
        {shortTermExtraGuest > 0 && (
          <div className="text-right text-xs text-gray-400">
            건당 추가 수익: {formatCurrency(Math.round(shortTermExtraGuest))}원
          </div>
        )}
      </div>

      {shortTermExtraGuest > 0 && (
        <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
          건당 총 요금: {formatCurrency(Math.round(shortTermPerUnit))}원
        </div>
      )}

      <InputField
        label="월 예상 입실 건수"
        value={value.expectedOccupancyPerMonth}
        onChange={(v) => onChange({ expectedOccupancyPerMonth: v })}
        suffix="건"
        min={0}
        max={5}
        tooltip="한 달 동안 7일 단위 임대 건수"
      />
      <InputField
        label="연간 운영 개월수"
        value={value.operatingMonthsPerYear}
        onChange={(v) => onChange({ operatingMonthsPerYear: v })}
        suffix="개월"
        min={1}
        max={12}
      />
    </SectionCard>
  );
}
