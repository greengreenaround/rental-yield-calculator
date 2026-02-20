import type {
  CalculatorInput,
  CalculationResult,
  MonthlyBreakdown,
  CostBreakdownItem,
} from "@/types/calculator";

export function calculateResults(input: CalculatorInput): CalculationResult {
  // 1. 총 투자금액
  const totalInvestment =
    input.investment.securityDeposit +
    input.investment.keyMoney +
    input.investment.interiorCost;

  // 2. 월 총수익
  const extraGuestRevenue =
    input.revenue.extraGuestFee *
    input.revenue.averageExtraGuests *
    input.revenue.extraGuestFrequency;

  let monthlyGrossRevenue: number;
  if (input.rentalType === "airbnb") {
    // 에어비앤비: 평일 수익 + 주말 수익 + 인원 추가 수익
    const weekdayRevenue =
      input.revenue.weekdayRate * input.revenue.weekdayOccupancy;
    const weekendRevenue =
      input.revenue.weekendRate * input.revenue.weekendOccupancy;
    const totalOccupancyDays =
      input.revenue.weekdayOccupancy + input.revenue.weekendOccupancy;
    const monthlyExtraGuestRevenue = extraGuestRevenue * totalOccupancyDays;
    monthlyGrossRevenue =
      weekdayRevenue + weekendRevenue + monthlyExtraGuestRevenue;
  } else {
    // 단기임대: (7일 요금 + 인원추가(1주)) × 월 입실 건수
    // 단기임대는 extraGuestFee를 1주 단위로 해석
    monthlyGrossRevenue =
      (input.revenue.ratePerUnit + extraGuestRevenue) *
      input.revenue.expectedOccupancyPerMonth;
  }

  // 3. 월 비용 계산
  // 플랫폼 수수료
  let monthlyPlatformFees = 0;
  if (input.rentalType === "airbnb") {
    const airbnbFee = monthlyGrossRevenue * input.platformFees.airbnbFeeRate;
    const managementFee =
      monthlyGrossRevenue * input.platformFees.managementFeeRate;
    monthlyPlatformFees = airbnbFee + managementFee;
  } else {
    monthlyPlatformFees =
      monthlyGrossRevenue * input.platformFees.shortTermFeeRate;
  }

  // 청소비 (건당 × 횟수)
  const monthlyCleaningTotal =
    input.operatingCosts.cleaningCost *
    input.operatingCosts.cleaningFrequencyPerMonth;

  // 세금 (플랫폼 수수료 차감 후 과세)
  const taxableRevenue = monthlyGrossRevenue - monthlyPlatformFees;
  const monthlyTax = taxableRevenue * input.operatingCosts.taxRate;

  // 고정 월비용
  const monthlyFixedCosts =
    input.operatingCosts.monthlyRent +
    input.operatingCosts.monthlyManagementFee +
    input.operatingCosts.monthlyInsurance +
    input.operatingCosts.monthlyMaintenance +
    input.operatingCosts.monthlyUtilities;

  const monthlyTotalExpenses =
    monthlyPlatformFees +
    monthlyCleaningTotal +
    monthlyTax +
    monthlyFixedCosts;

  // 4. 연간 수치
  const operatingMonths = input.revenue.operatingMonthsPerYear;
  const annualGrossRevenue = monthlyGrossRevenue * operatingMonths;
  const annualTotalExpenses = monthlyTotalExpenses * operatingMonths;
  const annualNetProfit = annualGrossRevenue - annualTotalExpenses;
  // 12로 나눠서 실제 월평균 (비운영 월 포함)
  const monthlyNetProfit = operatingMonths > 0 ? annualNetProfit / 12 : 0;

  // 5. 수익률 지표 (보증금 포함)
  const grossYield =
    totalInvestment > 0 ? (annualGrossRevenue / totalInvestment) * 100 : 0;
  const netYield =
    totalInvestment > 0 ? (annualNetProfit / totalInvestment) * 100 : 0;
  const paybackPeriodMonths =
    annualNetProfit > 0 ? (totalInvestment / annualNetProfit) * 12 : Infinity;

  // 5-1. 수익률 지표 (보증금 제외 — 보증금은 돌려받으므로)
  const securityDeposit = input.investment.securityDeposit;
  const investmentExDeposit = totalInvestment - securityDeposit;
  const grossYieldExDeposit =
    investmentExDeposit > 0
      ? (annualGrossRevenue / investmentExDeposit) * 100
      : 0;
  const netYieldExDeposit =
    investmentExDeposit > 0
      ? (annualNetProfit / investmentExDeposit) * 100
      : 0;
  const paybackPeriodMonthsExDeposit =
    annualNetProfit > 0
      ? (investmentExDeposit / annualNetProfit) * 12
      : Infinity;

  // 6. 월별 breakdown (차트용)
  const monthlyBreakdown: MonthlyBreakdown[] = Array.from(
    { length: 12 },
    (_, i) => {
      const isOperating = i < operatingMonths;
      return {
        month: i + 1,
        grossRevenue: isOperating ? monthlyGrossRevenue : 0,
        rent: isOperating ? input.operatingCosts.monthlyRent : 0,
        platformFeeAmount: isOperating ? monthlyPlatformFees : 0,
        cleaningCostTotal: isOperating ? monthlyCleaningTotal : 0,
        managementFee: isOperating
          ? input.operatingCosts.monthlyManagementFee
          : 0,
        taxAmount: isOperating ? monthlyTax : 0,
        insurance: isOperating ? input.operatingCosts.monthlyInsurance : 0,
        maintenance: isOperating ? input.operatingCosts.monthlyMaintenance : 0,
        utilities: isOperating ? input.operatingCosts.monthlyUtilities : 0,
        totalExpenses: isOperating ? monthlyTotalExpenses : 0,
        netProfit: isOperating
          ? monthlyGrossRevenue - monthlyTotalExpenses
          : 0,
      };
    }
  );

  // 7. 비용 구성 (도넛 차트용)
  const costBreakdown: CostBreakdownItem[] = [
    {
      name: "월세",
      value: input.operatingCosts.monthlyRent * operatingMonths,
      color: "#FF8C42",
    },
    {
      name: "플랫폼 수수료",
      value: monthlyPlatformFees * operatingMonths,
      color: "#FF6B6B",
    },
    {
      name: "청소비",
      value: monthlyCleaningTotal * operatingMonths,
      color: "#4ECDC4",
    },
    {
      name: "관리비",
      value: input.operatingCosts.monthlyManagementFee * operatingMonths,
      color: "#45B7D1",
    },
    {
      name: "세금",
      value: monthlyTax * operatingMonths,
      color: "#96CEB4",
    },
    {
      name: "보험",
      value: input.operatingCosts.monthlyInsurance * operatingMonths,
      color: "#FFEAA7",
    },
    {
      name: "수선유지비",
      value: input.operatingCosts.monthlyMaintenance * operatingMonths,
      color: "#DDA0DD",
    },
    {
      name: "공과금",
      value: input.operatingCosts.monthlyUtilities * operatingMonths,
      color: "#98D8C8",
    },
  ].filter((item) => item.value > 0);

  return {
    totalInvestment,
    securityDeposit,
    investmentExDeposit,
    annualGrossRevenue,
    annualTotalExpenses,
    annualNetProfit,
    monthlyNetProfit,
    grossYield,
    netYield,
    paybackPeriodMonths,
    grossYieldExDeposit,
    netYieldExDeposit,
    paybackPeriodMonthsExDeposit,
    monthlyBreakdown,
    costBreakdown,
  };
}
