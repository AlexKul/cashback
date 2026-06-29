export type BetType = {
  id: string;
  label: string;
  cashbackRate: number;
};

export type BonusProjection = {
  monthlyCashback: number;
  yearlyCashback: number;
};

export const betTypes: BetType[] = [
  {
    id: "straight",
    label: "Straight",
    cashbackRate: 0.005,
  },
  {
    id: "two-leg-parlay",
    label: "2-Leg Parlay",
    cashbackRate: 0.024,
  },
  {
    id: "three-leg-plus-parlay",
    label: "3-Leg+ Parlay",
    cashbackRate: 0.04,
  },
];

export function calculateBonusProjection(
  weeklyBetAmount: number,
  cashbackRate: number,
): BonusProjection {
  const yearlyCashback = roundCurrency(weeklyBetAmount * cashbackRate * 52);

  return {
    monthlyCashback: roundCurrency(yearlyCashback / 12),
    yearlyCashback,
  };
}

export function formatCashbackRate(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
