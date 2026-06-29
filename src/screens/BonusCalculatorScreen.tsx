import { useState } from "react";
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
import { colors, radii } from "@/styles/theme";

export function BonusCalculatorScreen() {
  const [isBetTypeQuestionFadingOut, setIsBetTypeQuestionFadingOut] =
    useState(false);
  const {
    betTypeOptions,
    calculatorStep,
    canSubmitWeeklyBetAmount,
    projectionText,
    selectBetType,
    selectedBetTypeId,
    submitWeeklyBetAmount,
    updateWeeklyBetAmount,
    weeklyBetAmount,
  } = useCalculator();

  function handleBetTypeSelect(betTypeId: string) {
    setIsBetTypeQuestionFadingOut(true);

    setTimeout(() => {
      selectBetType(betTypeId);
      setIsBetTypeQuestionFadingOut(false);
    }, 250);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        {calculatorStep === "betType" ? (
          <FadeIn
            duration={250}
            key="bet-type-question"
            style={styles.step}
            to={isBetTypeQuestionFadingOut ? 0 : 1}
          >
            <Text style={styles.question}>
              What is your favourite type of bet?
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
                    <Text style={styles.betTypeRate}>{betType.rateLabel}</Text>
                  </Pressable>
                );
              })}
            </View>
          </FadeIn>
        ) : (
          <FadeIn key="weekly-amount-question" style={styles.step}>
            <Text style={styles.question}>
              How much do you play in a week?
            </Text>
            <WeeklyBetInput
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
            {projectionText && <BonusProjectionResult text={projectionText} />}
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
  content: {
    gap: 28,
  },
  step: {
    gap: 24,
  },
  question: {
    color: colors.foreground,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 42,
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
    color: colors.foreground,
    fontSize: 22,
    fontWeight: "800",
  },
  betTypeRate: {
    color: colors.foreground,
    fontSize: 18,
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
  },
  disabledButton: {
    opacity: 0.4,
  },
  doneButtonText: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "800",
  },
});
