import type {
  CalculatorInput,
  RentalType,
  InitialInvestment,
  RevenueInput,
  PlatformFees,
  OperatingCosts,
} from "@/types/calculator";
import { RentalTypeSelector } from "./RentalTypeSelector";
import { InitialInvestmentSection } from "./InitialInvestmentSection";
import { RevenueSection } from "./RevenueSection";
import { PlatformFeeSection } from "./PlatformFeeSection";
import { OperatingCostSection } from "./OperatingCostSection";

interface Props {
  input: CalculatorInput;
  onUpdateRentalType: (type: RentalType) => void;
  onUpdateInvestment: (partial: Partial<InitialInvestment>) => void;
  onUpdateRevenue: (partial: Partial<RevenueInput>) => void;
  onUpdatePlatformFees: (partial: Partial<PlatformFees>) => void;
  onUpdateOperatingCosts: (partial: Partial<OperatingCosts>) => void;
}

export function CalculatorForm({
  input,
  onUpdateRentalType,
  onUpdateInvestment,
  onUpdateRevenue,
  onUpdatePlatformFees,
  onUpdateOperatingCosts,
}: Props) {
  return (
    <div className="space-y-4">
      <RentalTypeSelector
        value={input.rentalType}
        onChange={onUpdateRentalType}
      />
      <InitialInvestmentSection
        value={input.investment}
        onChange={onUpdateInvestment}
      />
      <RevenueSection
        rentalType={input.rentalType}
        value={input.revenue}
        onChange={onUpdateRevenue}
      />
      <PlatformFeeSection
        rentalType={input.rentalType}
        value={input.platformFees}
        onChange={onUpdatePlatformFees}
      />
      <OperatingCostSection
        rentalType={input.rentalType}
        value={input.operatingCosts}
        onChange={onUpdateOperatingCosts}
      />
    </div>
  );
}
