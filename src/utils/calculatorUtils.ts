import type { BonusProjection } from "@/models/calculator";

export function calculateBonusProjection(
  weeklyBetAmount: number,
  cashbackRate: number,
  maxMonthlyCashbackCap: number,
): BonusProjection {
  const uncappedMonthlyCashback = (weeklyBetAmount * cashbackRate * 52) / 12;
  const monthlyCashback = Math.min(
    uncappedMonthlyCashback,
    maxMonthlyCashbackCap,
  );

  return {
    monthlyCashback: roundCurrency(monthlyCashback),
    yearlyCashback: roundCurrency(monthlyCashback * 12),
  };
}

export function formatCashbackRate(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

export function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function parseWeeklyBetAmount(value: string): number | null {
  const normalizedValue = value.replace(/[$,\s]/g, "");
  const parsedValue = Number(normalizedValue);

  if (!normalizedValue || Number.isNaN(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
}

export function sanitizeWeeklyBetAmountInput(value: string): string {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const [integerPart = "", ...decimalParts] = numericValue.split(".");

  if (decimalParts.length === 0) {
    return integerPart;
  }

  return `${integerPart}.${decimalParts.join("")}`;
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
