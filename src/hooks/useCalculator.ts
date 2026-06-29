import { useMemo, useState } from "react";

import {
  type BetType,
  betTypes,
  calculateBonusProjection,
  formatCashbackRate,
  formatCurrency,
  parseWeeklyBetAmount,
} from "../features/calculator/calculatorLogic";

export type BetTypeOptionViewData = {
  id: string;
  label: string;
  rateLabel: string;
};

export function useCalculator() {
  const [isBetTypeMenuOpen, setIsBetTypeMenuOpen] = useState(false);
  const [selectedBetType, setSelectedBetType] = useState<BetType | null>(null);
  const [weeklyBetAmount, setWeeklyBetAmount] = useState("");

  const betTypeOptions = useMemo<BetTypeOptionViewData[]>(
    () =>
      betTypes.map((betType) => ({
        id: betType.id,
        label: betType.label,
        rateLabel: formatCashbackRate(betType.cashbackRate),
      })),
    [],
  );

  const parsedWeeklyBetAmount = useMemo(
    () => parseWeeklyBetAmount(weeklyBetAmount),
    [weeklyBetAmount],
  );

  const projectionText = useMemo(() => {
    if (!selectedBetType || parsedWeeklyBetAmount === null) {
      return null;
    }

    const projection = calculateBonusProjection(
      parsedWeeklyBetAmount,
      selectedBetType.cashbackRate,
    );

    return `You can earn ${formatCurrency(
      projection.monthlyCashback,
    )} per month or ${formatCurrency(projection.yearlyCashback)} per year!`;
  }, [parsedWeeklyBetAmount, selectedBetType]);

  function selectBetType(betTypeId: string) {
    const nextBetType = betTypes.find((betType) => betType.id === betTypeId);

    if (!nextBetType) {
      return;
    }

    setSelectedBetType(nextBetType);
    setIsBetTypeMenuOpen(false);
  }

  function toggleBetTypeMenu() {
    setIsBetTypeMenuOpen((isOpen) => !isOpen);
  }

  return {
    betTypeOptions,
    isBetTypeMenuOpen,
    projectionText,
    selectBetType,
    selectedBetTypeId: selectedBetType?.id ?? null,
    selectedBetTypeLabel: selectedBetType?.label ?? "Select bet type",
    setWeeklyBetAmount,
    toggleBetTypeMenu,
    weeklyBetAmount,
  };
}
