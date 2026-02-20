/** 임대 유형 */
export type RentalType = "airbnb" | "shortTerm";

/** 대행 플랫폼 종류 */
export type ManagementPlatform = "none" | "mrMention" | "wehome" | "custom";

/** 초기 투자비용 */
export interface InitialInvestment {
  securityDeposit: number; // 보증금 (원)
  keyMoney: number; // 권리금 (원)
  interiorCost: number; // 인테리어비 (원)
}

/** 수익 관련 입력 */
export interface RevenueInput {
  // 에어비앤비: 평일/주말 분리
  weekdayRate: number; // 평일 1일 요금 (원)
  weekdayOccupancy: number; // 월 평일 입실일수
  weekendRate: number; // 주말 1일 요금 (원)
  weekendOccupancy: number; // 월 주말 입실일수 (금,토 기준 약 8~9일)
  // 단기임대
  ratePerUnit: number; // 7일 요금 (원)
  expectedOccupancyPerMonth: number; // 월 입실 건수
  // 인원 추가 요금
  extraGuestFee: number; // 인당 추가 요금 (원)
  averageExtraGuests: number; // 평균 추가 인원 (명)
  extraGuestFrequency: number; // 인원 추가 발생 비율 (0.5 = 50%)
  // 공통
  operatingMonthsPerYear: number; // 연간 운영 개월수 (기본 12)
}

/** 플랫폼 수수료 설정 */
export interface PlatformFees {
  airbnbFeeRate: number; // 에어비앤비 수수료율 (0.03 = 3%)
  managementPlatform: ManagementPlatform;
  managementFeeRate: number; // 대행 플랫폼 수수료율
  shortTermFeeRate: number; // 단기임대 플랫폼 수수료율 (0.033 = 3.3%)
}

/** 월 운영비용 */
export interface OperatingCosts {
  monthlyRent: number; // 월세 (원)
  monthlyManagementFee: number; // 월 관리비 (원)
  cleaningCost: number; // 청소비 (원)
  cleaningFrequencyPerMonth: number; // 월 청소 횟수 (에어비앤비용)
  taxRate: number; // 세율 (0.033 = 3.3%)
  monthlyInsurance: number; // 월 보험료 (원)
  monthlyMaintenance: number; // 월 수선유지비 (원)
  monthlyUtilities: number; // 월 공과금 (원)
}

/** 전체 계산기 입력 */
export interface CalculatorInput {
  rentalType: RentalType;
  investment: InitialInvestment;
  revenue: RevenueInput;
  platformFees: PlatformFees;
  operatingCosts: OperatingCosts;
}

/** 월별 상세 분석 */
export interface MonthlyBreakdown {
  month: number;
  grossRevenue: number;
  rent: number;
  platformFeeAmount: number;
  cleaningCostTotal: number;
  managementFee: number;
  taxAmount: number;
  insurance: number;
  maintenance: number;
  utilities: number;
  totalExpenses: number;
  netProfit: number;
}

/** 비용 구성 항목 (파이차트용) */
export interface CostBreakdownItem {
  name: string;
  value: number;
  color: string;
}

/** 계산 결과 */
export interface CalculationResult {
  totalInvestment: number;
  securityDeposit: number;
  investmentExDeposit: number; // 보증금 제외 투자금
  annualGrossRevenue: number;
  annualTotalExpenses: number;
  annualNetProfit: number;
  monthlyNetProfit: number;
  grossYield: number; // %
  netYield: number; // %
  paybackPeriodMonths: number;
  // 보증금 제외 수익률
  grossYieldExDeposit: number; // %
  netYieldExDeposit: number; // %
  paybackPeriodMonthsExDeposit: number;
  monthlyBreakdown: MonthlyBreakdown[];
  costBreakdown: CostBreakdownItem[];
}
