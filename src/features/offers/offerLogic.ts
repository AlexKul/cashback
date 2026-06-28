export type CashbackOffer = {
  id: string;
  merchant: string;
  category: string;
  cashbackRate: number;
  minimumSpend: number;
  averageSpend: number;
  expiresInDays: number;
};

export type OfferSummary = CashbackOffer & {
  expectedCashback: number;
  eligibilityGap: number;
  isEligible: boolean;
};

export type OfferFilter = "all" | "eligible" | "endingSoon";

export const offers: CashbackOffer[] = [
  {
    id: "grocery-market",
    merchant: "Fresh Market",
    category: "Groceries",
    cashbackRate: 0.05,
    minimumSpend: 40,
    averageSpend: 86,
    expiresInDays: 5,
  },
  {
    id: "coffee-club",
    merchant: "Coffee Club",
    category: "Dining",
    cashbackRate: 0.08,
    minimumSpend: 15,
    averageSpend: 12,
    expiresInDays: 2,
  },
  {
    id: "ride-share",
    merchant: "Metro Rides",
    category: "Travel",
    cashbackRate: 0.04,
    minimumSpend: 25,
    averageSpend: 32,
    expiresInDays: 12,
  },
  {
    id: "home-supply",
    merchant: "Home Supply Co.",
    category: "Home",
    cashbackRate: 0.06,
    minimumSpend: 75,
    averageSpend: 64,
    expiresInDays: 7,
  },
];

export function summarizeOffer(offer: CashbackOffer): OfferSummary {
  const isEligible = offer.averageSpend >= offer.minimumSpend;
  const eligibleSpend = isEligible ? offer.averageSpend : 0;

  return {
    ...offer,
    expectedCashback: roundCurrency(eligibleSpend * offer.cashbackRate),
    eligibilityGap: roundCurrency(Math.max(offer.minimumSpend - offer.averageSpend, 0)),
    isEligible,
  };
}

export function filterOfferSummaries(
  summaries: OfferSummary[],
  filter: OfferFilter,
): OfferSummary[] {
  switch (filter) {
    case "eligible":
      return summaries.filter((offer) => offer.isEligible);
    case "endingSoon":
      return summaries.filter((offer) => offer.expiresInDays <= 7);
    case "all":
      return summaries;
  }
}

export function getTotalExpectedCashback(summaries: OfferSummary[]): number {
  return roundCurrency(
    summaries.reduce((total, offer) => total + offer.expectedCashback, 0),
  );
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatCashbackRate(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
