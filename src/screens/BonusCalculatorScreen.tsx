import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

import { BetTypeDropdown } from "@/components/calculator/BetTypeDropdown";
import { BonusProjectionResult } from "@/components/calculator/BonusProjectionResult";
import { WeeklyBetInput } from "@/components/calculator/WeeklyBetInput";
import { useCalculator } from "@/hooks/useCalculator";
import { colors } from "@/styles/theme";

export function BonusCalculatorScreen() {
  const {
    betTypeOptions,
    isBetTypeMenuOpen,
    projectionText,
    selectBetType,
    selectedBetTypeId,
    selectedBetTypeLabel,
    setWeeklyBetAmount,
    toggleBetTypeMenu,
    weeklyBetAmount,
  } = useCalculator();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Bonus Calculator</Text>
        <Text style={styles.title}>Calculate your cashback</Text>
      </View>

      <View style={styles.formRow}>
        <BetTypeDropdown
          isOpen={isBetTypeMenuOpen}
          label={selectedBetTypeLabel}
          onSelect={selectBetType}
          onToggle={toggleBetTypeMenu}
          options={betTypeOptions}
          selectedId={selectedBetTypeId}
        />
        <WeeklyBetInput
          onChangeText={setWeeklyBetAmount}
          value={weeklyBetAmount}
        />
      </View>

      {projectionText && <BonusProjectionResult text={projectionText} />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    gap: 28,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    gap: 10,
  },
  eyebrow: {
    color: colors.foreground,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    color: colors.foreground,
    fontSize: 36,
    fontWeight: "800",
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
  },
});
