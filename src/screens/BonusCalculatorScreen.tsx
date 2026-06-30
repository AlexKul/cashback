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

import { FadeIn, GradientButton } from "@/components";
import { BonusProjectionResult } from "@/components/calculator/BonusProjectionResult";
import { CashbackRulesModal } from "@/components/calculator/CashbackRulesModal";
import { WeeklyBetInput } from "@/components/calculator/WeeklyBetInput";
import { useCalculator } from "@/hooks/useCalculator";
import { colors, radii, text } from "@/styles/theme";

export function BonusCalculatorScreen() {
  const router = useRouter();
  const [isBetTypeQuestionFadingOut, setIsBetTypeQuestionFadingOut] =
    useState(false);
  const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);
  const {
    betTypeOptions,
    calculatorStep,
    canSubmitWeeklyBetAmount,
    projectionAmountLabel,
    projectionCurrency,
    projectionUpsellMessage,
    programName,
    resetCalculator,
    rulesTable,
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
        <CashbackRulesModal
          onClose={() => setIsRulesModalVisible(false)}
          rules={rulesTable}
          visible={isRulesModalVisible}
        />
        <BonusProjectionResult
          amountLabel={projectionAmountLabel}
          currency={projectionCurrency}
          key={projectionAmountLabel}
          upsellMessage={projectionUpsellMessage}
        />
        <GradientButton
          label="View Rules"
          onPress={() => setIsRulesModalVisible(true)}
          style={styles.rulesButton}
        />
        <Pressable
          accessibilityRole="button"
          onPress={resetCalculator}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Restart</Text>
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
        <Text style={styles.backButtonText}>‹</Text>
      </Pressable>
      <View style={styles.content}>
        {programName && <Text style={styles.programName}>{programName}</Text>}
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
                  <GradientButton
                    key={betType.id}
                    label={betType.label}
                    onPress={() => handleBetTypeSelect(betType.id)}
                    style={[
                      styles.betTypeButton,
                      isSelected && styles.selectedBetTypeButton,
                    ]}
                    textStyle={styles.betTypeLabel}
                  />
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
              label="300"
              onChangeText={updateWeeklyBetAmount}
              value={weeklyBetAmount}
            />
            <GradientButton
              disabled={!canSubmitWeeklyBetAmount}
              label="Done"
              onPress={submitWeeklyBetAmount}
              style={styles.doneButton}
            />
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
    padding: 22,
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
    borderColor: colors.foreground,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    left: 24,
    position: "absolute",
    top: 80,
    width: 44,
    zIndex: 2,
  },
  backButtonText: {
    color: colors.foreground,
    fontSize: 34,
    lineHeight: 38,
    marginTop: -2,
  },
  content: {
    alignSelf: "center",
    backgroundColor: colors.card,
    borderRadius: radii.control,
    gap: 28,
    maxWidth: 440,
    padding: 20,
    width: "100%",
  },
  programName: {
    ...text.default,
    color: colors.payout,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: "center",
  },
  step: {
    gap: 24,
  },
  question: {
    ...text.default,
    color: colors.foreground,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
  },
  betTypeList: {
    gap: 12,
  },
  betTypeButton: {
    borderRadius: radii.pill,
    minHeight: 64,
  },
  selectedBetTypeButton: {
    borderColor: colors.foreground,
    borderWidth: 2,
  },
  betTypeLabel: {
    ...text.default,
    color: colors.foreground,
    fontSize: 17,
    textAlign: "center",
  },
  doneButton: {
    alignSelf: "center",
    marginTop: 18,
    width: "100%",
  },
  resetButton: {
    alignItems: "center",
    borderColor: colors.foreground,
    borderRadius: radii.pill,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 12,
    minHeight: 54,
    width: 180,
  },
  resetButtonText: {
    ...text.default,
    color: colors.foreground,
    fontSize: 15,
  },
  rulesButton: {
    marginTop: 36,
    width: 180,
  },
});
