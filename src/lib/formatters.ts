export function formatCurrency(value: number): string {
  return value.toLocaleString("ko-KR");
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatPaybackPeriod(months: number): string {
  if (!isFinite(months) || months <= 0) return "회수 불가";
  const years = Math.floor(months / 12);
  const remainingMonths = Math.round(months % 12);
  if (years === 0) return `${remainingMonths}개월`;
  if (remainingMonths === 0) return `${years}년`;
  return `${years}년 ${remainingMonths}개월`;
}

export function parseCurrencyInput(raw: string): number {
  return parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
}
