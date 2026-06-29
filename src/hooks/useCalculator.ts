import { useEffect, useMemo, useState } from "react";

import {
  calculateBonusProjection,
  formatCashbackRate,
  formatCurrency,
  parseWeeklyBetAmount,
  sanitizeWeeklyBetAmountInput,
} from "../utils/calculatorUtils";
import type { BetType, CashbackProgram } from "../models/calculator";
import { fetchCashbackProgram } from "../services/cashbackProgramService";

export type BetTypeOptionViewData = {
  id: string;
  label: string;
  rateLabel: string;
};

export type CalculatorStep = "betType" | "weeklyAmount";

export function useCalculator() {
  const [calculatorStep, setCalculatorStep] =
    useState<CalculatorStep>("betType");
  const [hasSubmittedWeeklyAmount, setHasSubmittedWeeklyAmount] =
    useState(false);
  const [isBetTypeMenuOpen, setIsBetTypeMenuOpen] = useState(false);
  const [cashbackProgram, setCashbackProgram] =
    useState<CashbackProgram | null>(null);
  const [selectedBetType, setSelectedBetType] = useState<BetType | null>(null);
  const [weeklyBetAmount, setWeeklyBetAmount] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchCashbackProgram().then((program) => {
      if (isMounted) {
        setCashbackProgram(program);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const betTypeOptions = useMemo<BetTypeOptionViewData[]>(
    () =>
      cashbackProgram?.tiers.map((betType) => ({
        id: betType.id,
        label: betType.label,
        rateLabel: formatCashbackRate(betType.cashbackRate),
      })) ?? [],
    [cashbackProgram],
  );

  const parsedWeeklyBetAmount = useMemo(
    () => parseWeeklyBetAmount(weeklyBetAmount),
    [weeklyBetAmount],
  );

  const projectionAmountLabel = useMemo(() => {
    if (
      !cashbackProgram ||
      !selectedBetType ||
      parsedWeeklyBetAmount === null ||
      !hasSubmittedWeeklyAmount
    ) {
      return null;
    }

    const projection = calculateBonusProjection(
      parsedWeeklyBetAmount,
      selectedBetType.cashbackRate,
      cashbackProgram.maxMonthlyCashbackCap,
    );

    return formatCurrency(
      projection.yearlyCashback,
      cashbackProgram.currency,
    );
  }, [
    cashbackProgram,
    hasSubmittedWeeklyAmount,
    parsedWeeklyBetAmount,
    selectedBetType,
  ]);

  const shouldSuggestHigherBetType = useMemo(() => {
    if (!cashbackProgram || !selectedBetType || !projectionAmountLabel) {
      return false;
    }

    const highestCashbackRate = Math.max(
      ...cashbackProgram.tiers.map((betType) => betType.cashbackRate),
    );

    return selectedBetType.cashbackRate < highestCashbackRate;
  }, [cashbackProgram, projectionAmountLabel, selectedBetType]);

  function selectBetType(betTypeId: string) {
    const nextBetType = cashbackProgram?.tiers.find(
      (betType) => betType.id === betTypeId,
    );

    if (!nextBetType) {
      return;
    }

    setSelectedBetType(nextBetType);
    setHasSubmittedWeeklyAmount(false);
    setIsBetTypeMenuOpen(false);
    setCalculatorStep("weeklyAmount");
  }

  function toggleBetTypeMenu() {
    setIsBetTypeMenuOpen((isOpen) => !isOpen);
  }

  function updateWeeklyBetAmount(value: string) {
    setWeeklyBetAmount(sanitizeWeeklyBetAmountInput(value));
    setHasSubmittedWeeklyAmount(false);
  }

  function submitWeeklyBetAmount() {
    if (parsedWeeklyBetAmount !== null) {
      setHasSubmittedWeeklyAmount(true);
    }
  }

  function resetCalculator() {
    setCalculatorStep("betType");
    setHasSubmittedWeeklyAmount(false);
    setIsBetTypeMenuOpen(false);
    setSelectedBetType(null);
    setWeeklyBetAmount("");
  }

  return {
    betTypeOptions,
    calculatorStep,
    canSubmitWeeklyBetAmount: parsedWeeklyBetAmount !== null,
    isBetTypeMenuOpen,
    programName: cashbackProgram?.programName ?? "",
    projectionAmountLabel,
    projectionCurrency: projectionAmountLabel ? cashbackProgram?.currency : null,
    projectionUpsellMessage: shouldSuggestHigherBetType
      ? "you could earn more if changed your bet type"
      : null,
    resetCalculator,
    selectBetType,
    selectedBetTypeId: selectedBetType?.id ?? null,
    selectedBetTypeLabel:
      selectedBetType?.label ??
      (cashbackProgram ? "Select bet type" : "Loading bet types..."),
    submitWeeklyBetAmount,
    toggleBetTypeMenu,
    updateWeeklyBetAmount,
    weeklyBetAmountError:
      weeklyBetAmount.length > 0 && parsedWeeklyBetAmount === null
        ? "Enter an amount greater than 0."
        : null,
    weeklyBetAmount,
  };
}
