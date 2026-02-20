import type {
  CalculatorInput,
  RentalType,
  ManagementPlatform,
} from "@/types/calculator";

export const DEFAULT_INPUT: CalculatorInput = {
  rentalType: "airbnb",
  investment: {
    securityDeposit: 10_000_000,
    keyMoney: 0,
    interiorCost: 15_000_000,
  },
  revenue: {
    weekdayRate: 90_000,
    weekdayOccupancy: 16,
    weekendRate: 180_000,
    weekendOccupancy: 8,
    ratePerUnit: 350_000,
    expectedOccupancyPerMonth: 3,
    extraGuestFee: 30_000,
    averageExtraGuests: 2,
    extraGuestFrequency: 0.6,
    operatingMonthsPerYear: 12,
  },
  platformFees: {
    airbnbFeeRate: 0.03,
    managementPlatform: "none",
    managementFeeRate: 0,
    shortTermFeeRate: 0.033,
  },
  operatingCosts: {
    monthlyRent: 800_000,
    monthlyManagementFee: 100_000,
    cleaningCost: 30_000,
    cleaningFrequencyPerMonth: 20,
    taxRate: 0,
    monthlyInsurance: 0,
    monthlyMaintenance: 20_000,
    monthlyUtilities: 100_000,
  },
};

/** 타입 전환 시 적용되는 기본값 */
export const TYPE_DEFAULTS: Record<RentalType, Partial<CalculatorInput>> = {
  airbnb: {
    investment: {
      securityDeposit: 10_000_000,
      keyMoney: 0,
      interiorCost: 15_000_000,
    },
    platformFees: {
      airbnbFeeRate: 0.03,
      managementPlatform: "none" as const,
      managementFeeRate: 0,
      shortTermFeeRate: 0.033,
    },
    revenue: {
      weekdayRate: 90_000,
      weekdayOccupancy: 16,
      weekendRate: 180_000,
      weekendOccupancy: 8,
      ratePerUnit: 350_000,
      expectedOccupancyPerMonth: 3,
      extraGuestFee: 30_000,
      averageExtraGuests: 2,
      extraGuestFrequency: 0.6,
      operatingMonthsPerYear: 12,
    },
    operatingCosts: {
      monthlyRent: 800_000,
      monthlyManagementFee: 100_000,
      cleaningCost: 30_000,
      cleaningFrequencyPerMonth: 20,
      taxRate: 0,
      monthlyInsurance: 0,
      monthlyMaintenance: 20_000,
      monthlyUtilities: 100_000,
    },
  },
  shortTerm: {
    investment: {
      securityDeposit: 10_000_000,
      keyMoney: 0,
      interiorCost: 3_000_000,
    },
    platformFees: {
      airbnbFeeRate: 0.03,
      managementPlatform: "none" as const,
      managementFeeRate: 0,
      shortTermFeeRate: 0.033,
    },
    revenue: {
      weekdayRate: 90_000,
      weekdayOccupancy: 15,
      weekendRate: 180_000,
      weekendOccupancy: 8,
      ratePerUnit: 390_000,
      expectedOccupancyPerMonth: 4,
      extraGuestFee: 100_000,
      averageExtraGuests: 2,
      extraGuestFrequency: 0,
      operatingMonthsPerYear: 12,
    },
    operatingCosts: {
      monthlyRent: 700_000,
      monthlyManagementFee: 0,
      cleaningCost: 30_000,
      cleaningFrequencyPerMonth: 3,
      taxRate: 0,
      monthlyInsurance: 0,
      monthlyMaintenance: 20_000,
      monthlyUtilities: 150_000,
    },
  },
};

export const PLATFORM_PRESETS: Record<
  ManagementPlatform,
  { label: string; rate: number }
> = {
  none: { label: "직접 운영", rate: 0 },
  mrMention: { label: "미스터멘션", rate: 0.05 },
  wehome: { label: "위홈", rate: 0.03 },
  custom: { label: "직접 입력", rate: 0 },
};
