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

/** 기본값과 다른 값만 URL에 포함 (URL 길이 최소화) */
export function encodeInputToParams(input: CalculatorInput): string {
  const p = new URLSearchParams();
  const d = DEFAULT_INPUT;

  const set = (key: string, val: string, def: string) => {
    if (val !== def) p.set(key, val);
  };

  set(KEYS.rentalType, RENTAL_TYPE_SHORT[input.rentalType], RENTAL_TYPE_SHORT[d.rentalType]);

  // investment
  set(KEYS.securityDeposit, String(input.investment.securityDeposit), String(d.investment.securityDeposit));
  set(KEYS.keyMoney, String(input.investment.keyMoney), String(d.investment.keyMoney));
  set(KEYS.interiorCost, String(input.investment.interiorCost), String(d.investment.interiorCost));

  // revenue
  set(KEYS.weekdayRate, String(input.revenue.weekdayRate), String(d.revenue.weekdayRate));
  set(KEYS.weekdayOccupancy, String(input.revenue.weekdayOccupancy), String(d.revenue.weekdayOccupancy));
  set(KEYS.weekendRate, String(input.revenue.weekendRate), String(d.revenue.weekendRate));
  set(KEYS.weekendOccupancy, String(input.revenue.weekendOccupancy), String(d.revenue.weekendOccupancy));
  set(KEYS.ratePerUnit, String(input.revenue.ratePerUnit), String(d.revenue.ratePerUnit));
  set(KEYS.expectedOccupancyPerMonth, String(input.revenue.expectedOccupancyPerMonth), String(d.revenue.expectedOccupancyPerMonth));
  set(KEYS.extraGuestFee, String(input.revenue.extraGuestFee), String(d.revenue.extraGuestFee));
  set(KEYS.averageExtraGuests, String(input.revenue.averageExtraGuests), String(d.revenue.averageExtraGuests));
  set(KEYS.extraGuestFrequency, String(input.revenue.extraGuestFrequency), String(d.revenue.extraGuestFrequency));
  set(KEYS.operatingMonthsPerYear, String(input.revenue.operatingMonthsPerYear), String(d.revenue.operatingMonthsPerYear));

  // platformFees
  set(KEYS.airbnbFeeRate, String(input.platformFees.airbnbFeeRate), String(d.platformFees.airbnbFeeRate));
  set(KEYS.managementPlatform, PLATFORM_SHORT[input.platformFees.managementPlatform], PLATFORM_SHORT[d.platformFees.managementPlatform]);
  set(KEYS.managementFeeRate, String(input.platformFees.managementFeeRate), String(d.platformFees.managementFeeRate));
  set(KEYS.shortTermFeeRate, String(input.platformFees.shortTermFeeRate), String(d.platformFees.shortTermFeeRate));

  // operatingCosts
  set(KEYS.monthlyRent, String(input.operatingCosts.monthlyRent), String(d.operatingCosts.monthlyRent));
  set(KEYS.monthlyManagementFee, String(input.operatingCosts.monthlyManagementFee), String(d.operatingCosts.monthlyManagementFee));
  set(KEYS.cleaningCost, String(input.operatingCosts.cleaningCost), String(d.operatingCosts.cleaningCost));
  set(KEYS.cleaningFrequencyPerMonth, String(input.operatingCosts.cleaningFrequencyPerMonth), String(d.operatingCosts.cleaningFrequencyPerMonth));
  set(KEYS.taxRate, String(input.operatingCosts.taxRate), String(d.operatingCosts.taxRate));
  set(KEYS.monthlyInsurance, String(input.operatingCosts.monthlyInsurance), String(d.operatingCosts.monthlyInsurance));
  set(KEYS.monthlyMaintenance, String(input.operatingCosts.monthlyMaintenance), String(d.operatingCosts.monthlyMaintenance));
  set(KEYS.monthlyUtilities, String(input.operatingCosts.monthlyUtilities), String(d.operatingCosts.monthlyUtilities));

  return p.toString();
}

/** URL search params → CalculatorInput (없는 값은 기본값 사용) */
export function decodeParamsToInput(search: string): CalculatorInput | null {
  const p = new URLSearchParams(search);

  // URL에 파라미터가 하나도 없으면 null 반환
  if (p.size === 0) return null;

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
