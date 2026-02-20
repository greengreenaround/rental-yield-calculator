import type { CalculatorInput, RentalType, ManagementPlatform } from "@/types/calculator";
import { DEFAULT_INPUT } from "@/lib/constants";

/**
 * URL 파라미터 키 매핑 (짧은 키로 URL 길이 최소화)
 */
const KEYS = {
  rentalType: "t",
  // investment
  securityDeposit: "sd",
  keyMoney: "km",
  interiorCost: "ic",
  // revenue
  weekdayRate: "wr",
  weekdayOccupancy: "wo",
  weekendRate: "er",
  weekendOccupancy: "eo",
  ratePerUnit: "ru",
  expectedOccupancyPerMonth: "em",
  extraGuestFee: "gf",
  averageExtraGuests: "ag",
  extraGuestFrequency: "gq",
  operatingMonthsPerYear: "om",
  // platformFees
  airbnbFeeRate: "af",
  managementPlatform: "mp",
  managementFeeRate: "mf",
  shortTermFeeRate: "sf",
  // operatingCosts
  monthlyRent: "mr",
  monthlyManagementFee: "mm",
  cleaningCost: "cc",
  cleaningFrequencyPerMonth: "cf",
  taxRate: "tr",
  monthlyInsurance: "mi",
  monthlyMaintenance: "mt",
  monthlyUtilities: "mu",
} as const;

const RENTAL_TYPE_SHORT: Record<RentalType, string> = {
  airbnb: "a",
  shortTerm: "s",
};
const RENTAL_TYPE_LONG: Record<string, RentalType> = {
  a: "airbnb",
  s: "shortTerm",
};

const PLATFORM_SHORT: Record<ManagementPlatform, string> = {
  none: "n",
  mrMention: "m",
  wehome: "w",
  custom: "c",
};
const PLATFORM_LONG: Record<string, ManagementPlatform> = {
  n: "none",
  m: "mrMention",
  w: "wehome",
  c: "custom",
};

/** CalculatorInput → URL search params string */
export function encodeInputToParams(input: CalculatorInput): string {
  const p = new URLSearchParams();

  p.set(KEYS.rentalType, RENTAL_TYPE_SHORT[input.rentalType]);

  // investment
  p.set(KEYS.securityDeposit, String(input.investment.securityDeposit));
  p.set(KEYS.keyMoney, String(input.investment.keyMoney));
  p.set(KEYS.interiorCost, String(input.investment.interiorCost));

  // revenue
  p.set(KEYS.weekdayRate, String(input.revenue.weekdayRate));
  p.set(KEYS.weekdayOccupancy, String(input.revenue.weekdayOccupancy));
  p.set(KEYS.weekendRate, String(input.revenue.weekendRate));
  p.set(KEYS.weekendOccupancy, String(input.revenue.weekendOccupancy));
  p.set(KEYS.ratePerUnit, String(input.revenue.ratePerUnit));
  p.set(KEYS.expectedOccupancyPerMonth, String(input.revenue.expectedOccupancyPerMonth));
  p.set(KEYS.extraGuestFee, String(input.revenue.extraGuestFee));
  p.set(KEYS.averageExtraGuests, String(input.revenue.averageExtraGuests));
  p.set(KEYS.extraGuestFrequency, String(input.revenue.extraGuestFrequency));
  p.set(KEYS.operatingMonthsPerYear, String(input.revenue.operatingMonthsPerYear));

  // platformFees
  p.set(KEYS.airbnbFeeRate, String(input.platformFees.airbnbFeeRate));
  p.set(KEYS.managementPlatform, PLATFORM_SHORT[input.platformFees.managementPlatform]);
  p.set(KEYS.managementFeeRate, String(input.platformFees.managementFeeRate));
  p.set(KEYS.shortTermFeeRate, String(input.platformFees.shortTermFeeRate));

  // operatingCosts
  p.set(KEYS.monthlyRent, String(input.operatingCosts.monthlyRent));
  p.set(KEYS.monthlyManagementFee, String(input.operatingCosts.monthlyManagementFee));
  p.set(KEYS.cleaningCost, String(input.operatingCosts.cleaningCost));
  p.set(KEYS.cleaningFrequencyPerMonth, String(input.operatingCosts.cleaningFrequencyPerMonth));
  p.set(KEYS.taxRate, String(input.operatingCosts.taxRate));
  p.set(KEYS.monthlyInsurance, String(input.operatingCosts.monthlyInsurance));
  p.set(KEYS.monthlyMaintenance, String(input.operatingCosts.monthlyMaintenance));
  p.set(KEYS.monthlyUtilities, String(input.operatingCosts.monthlyUtilities));

  return p.toString();
}

/** URL search params → CalculatorInput (없는 값은 기본값 사용) */
export function decodeParamsToInput(search: string): CalculatorInput | null {
  const p = new URLSearchParams(search);

  // URL에 파라미터가 없으면 null 반환
  if (!p.has(KEYS.rentalType)) return null;

  const num = (key: string, fallback: number): number => {
    const v = p.get(key);
    if (v === null) return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const d = DEFAULT_INPUT;

  const rentalType: RentalType =
    RENTAL_TYPE_LONG[p.get(KEYS.rentalType) ?? ""] ?? d.rentalType;

  const managementPlatform: ManagementPlatform =
    PLATFORM_LONG[p.get(KEYS.managementPlatform) ?? ""] ?? d.platformFees.managementPlatform;

  return {
    rentalType,
    investment: {
      securityDeposit: num(KEYS.securityDeposit, d.investment.securityDeposit),
      keyMoney: num(KEYS.keyMoney, d.investment.keyMoney),
      interiorCost: num(KEYS.interiorCost, d.investment.interiorCost),
    },
    revenue: {
      weekdayRate: num(KEYS.weekdayRate, d.revenue.weekdayRate),
      weekdayOccupancy: num(KEYS.weekdayOccupancy, d.revenue.weekdayOccupancy),
      weekendRate: num(KEYS.weekendRate, d.revenue.weekendRate),
      weekendOccupancy: num(KEYS.weekendOccupancy, d.revenue.weekendOccupancy),
      ratePerUnit: num(KEYS.ratePerUnit, d.revenue.ratePerUnit),
      expectedOccupancyPerMonth: num(KEYS.expectedOccupancyPerMonth, d.revenue.expectedOccupancyPerMonth),
      extraGuestFee: num(KEYS.extraGuestFee, d.revenue.extraGuestFee),
      averageExtraGuests: num(KEYS.averageExtraGuests, d.revenue.averageExtraGuests),
      extraGuestFrequency: num(KEYS.extraGuestFrequency, d.revenue.extraGuestFrequency),
      operatingMonthsPerYear: num(KEYS.operatingMonthsPerYear, d.revenue.operatingMonthsPerYear),
    },
    platformFees: {
      airbnbFeeRate: num(KEYS.airbnbFeeRate, d.platformFees.airbnbFeeRate),
      managementPlatform,
      managementFeeRate: num(KEYS.managementFeeRate, d.platformFees.managementFeeRate),
      shortTermFeeRate: num(KEYS.shortTermFeeRate, d.platformFees.shortTermFeeRate),
    },
    operatingCosts: {
      monthlyRent: num(KEYS.monthlyRent, d.operatingCosts.monthlyRent),
      monthlyManagementFee: num(KEYS.monthlyManagementFee, d.operatingCosts.monthlyManagementFee),
      cleaningCost: num(KEYS.cleaningCost, d.operatingCosts.cleaningCost),
      cleaningFrequencyPerMonth: num(KEYS.cleaningFrequencyPerMonth, d.operatingCosts.cleaningFrequencyPerMonth),
      taxRate: num(KEYS.taxRate, d.operatingCosts.taxRate),
      monthlyInsurance: num(KEYS.monthlyInsurance, d.operatingCosts.monthlyInsurance),
      monthlyMaintenance: num(KEYS.monthlyMaintenance, d.operatingCosts.monthlyMaintenance),
      monthlyUtilities: num(KEYS.monthlyUtilities, d.operatingCosts.monthlyUtilities),
    },
  };
}
