import { useState } from "react";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FadeIn } from "@/components";
import { BonusProjectionResult } from "@/components/calculator/BonusProjectionResult";
import { WeeklyBetInput } from "@/components/calculator/WeeklyBetInput";
import { useCalculator } from "@/hooks/useCalculator";
import { colors, radii, text } from "@/styles/theme";

export function BonusCalculatorScreen() {
  const router = useRouter();
  const [isBetTypeQuestionFadingOut, setIsBetTypeQuestionFadingOut] =
    useState(false);
  const {
    betTypeOptions,
    calculatorStep,
    canSubmitWeeklyBetAmount,
    projectionAmountLabel,
    projectionCurrency,
    resetCalculator,
    selectBetType,
    selectedBetTypeId,
    submitWeeklyBetAmount,
    updateWeeklyBetAmount,
    weeklyBetAmount,
    weeklyBetAmountError,
  } = useCalculator();

  function handleBetTypeSelect(betTypeId: string) {
    setIsBetTypeQuestionFadingOut(true);

    setTimeout(() => {
      selectBetType(betTypeId);
      setIsBetTypeQuestionFadingOut(false);
    }, 250);
  }

  function handleBackPress() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  }

  if (projectionAmountLabel) {
    return (
      <View style={styles.resultContainer}>
        <BonusProjectionResult
          amountLabel={projectionAmountLabel}
          currency={projectionCurrency}
          key={projectionAmountLabel}
        />
        <Pressable
          accessibilityRole="button"
          onPress={resetCalculator}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        onPress={handleBackPress}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </Pressable>

      <View style={styles.content}>
        {calculatorStep === "betType" ? (
          <FadeIn
            duration={250}
            key="bet-type-question"
            style={styles.step}
            to={isBetTypeQuestionFadingOut ? 0 : 1}
          >
            <Text style={styles.question}>
              What is your go to Bet?
            </Text>
            <View style={styles.betTypeList}>
              {betTypeOptions.map((betType) => {
                const isSelected = selectedBetTypeId === betType.id;

                return (
                  <Pressable
                    accessibilityRole="button"
                    key={betType.id}
                    onPress={() => handleBetTypeSelect(betType.id)}
                    style={[
                      styles.betTypeButton,
                      isSelected && styles.selectedBetTypeButton,
                    ]}
                  >
                    <Text style={styles.betTypeLabel}>{betType.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </FadeIn>
        ) : (
          <FadeIn key="weekly-amount-question" style={styles.step}>
            <Text style={styles.question}>
              How much $ do you play in a week?
            </Text>
            <WeeklyBetInput
              errorText={weeklyBetAmountError}
              label="Weekly play amount"
              onChangeText={updateWeeklyBetAmount}
              value={weeklyBetAmount}
            />
            <Pressable
              accessibilityRole="button"
              disabled={!canSubmitWeeklyBetAmount}
              onPress={submitWeeklyBetAmount}
              style={[
                styles.doneButton,
                !canSubmitWeeklyBetAmount && styles.disabledButton,
              ]}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </FadeIn>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24,
  },
  resultContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  backButton: {
    alignItems: "center",
    borderWidth: 1,
    left: 24,
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center",
    position: "absolute",
    top: 80,
  },
  backButtonText: {
    ...text.default,
    color: colors.foreground,
    fontSize: 14,
  },
  content: {
    gap: 28,
  },
  step: {
    gap: 24,
    marginHorizontal: 40,
  },
  question: {
    ...text.default,
    color: colors.foreground,
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 30,
    textAlign: "center",
  },
  betTypeList: {
    gap: 12,
  },
  betTypeButton: {
    alignItems: "center",
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 76,
    paddingHorizontal: 18,
  },
  selectedBetTypeButton: {
    borderWidth: 2,
  },
  betTypeLabel: {
    ...text.default,
    color: colors.foreground,
    fontSize: 22,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
  },
  betTypeRate: {
    ...text.default,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "700",
  },
  doneButton: {
    alignItems: "center",
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: 18,
    marginTop: 50,
  },
  disabledButton: {
    opacity: 0.4,
  },
  doneButtonText: {
    ...text.default,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "800",
  },
  resetButton: {
    alignItems: "center",
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 36,
    minHeight: 56,
    minWidth: 160,
    paddingHorizontal: 24,
  },
  resetButtonText: {
    ...text.default,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "800",
    textTransform: "lowercase",
  },
});
