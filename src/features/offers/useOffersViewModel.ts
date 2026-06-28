import { useMemo, useState } from "react";

import {
  type OfferFilter,
  filterOfferSummaries,
  formatCashbackRate,
  formatCurrency,
  getTotalExpectedCashback,
  offers,
  summarizeOffer,
} from "./offerLogic";

export type OfferListItemViewData = {
  id: string;
  merchant: string;
  category: string;
  cashbackRateLabel: string;
  expectedCashbackLabel: string;
  eligibilityLabel: string;
  expiryLabel: string;
  isEligible: boolean;
};

export function useOffersViewModel() {
  const [filter, setFilter] = useState<OfferFilter>("all");

  const summaries = useMemo(() => offers.map(summarizeOffer), []);
  const visibleSummaries = useMemo(
    () => filterOfferSummaries(summaries, filter),
    [filter, summaries],
  );

  const items = useMemo<OfferListItemViewData[]>(
    () =>
      visibleSummaries.map((offer) => ({
        id: offer.id,
        merchant: offer.merchant,
        category: offer.category,
        cashbackRateLabel: formatCashbackRate(offer.cashbackRate),
        expectedCashbackLabel: formatCurrency(offer.expectedCashback),
        eligibilityLabel: offer.isEligible
          ? "Ready to use"
          : `${formatCurrency(offer.eligibilityGap)} more to qualify`,
        expiryLabel:
          offer.expiresInDays === 1
            ? "Ends tomorrow"
            : `Ends in ${offer.expiresInDays} days`,
        isEligible: offer.isEligible,
      })),
    [visibleSummaries],
  );

  const totalExpectedCashbackLabel = useMemo(
    () => formatCurrency(getTotalExpectedCashback(visibleSummaries)),
    [visibleSummaries],
  );

  return {
    activeFilter: filter,
    filters: [
      { label: "All", value: "all" },
      { label: "Ready", value: "eligible" },
      { label: "Ending", value: "endingSoon" },
    ] satisfies { label: string; value: OfferFilter }[],
    items,
    setFilter,
    totalExpectedCashbackLabel,
  };
}
