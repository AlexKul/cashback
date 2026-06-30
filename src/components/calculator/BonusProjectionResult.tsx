import { StyleSheet, Text, View } from "react-native";

import { FadeIn } from "@/components";
import type { BonusProjectionResultProps } from "@/models/calculator";
import { colors, text } from "@/styles/theme";
import { BillConfetti } from "./BillConfetti";

export function BonusProjectionResult({
  amountLabel,
  currency,
  upsellMessage,
}: BonusProjectionResultProps) {
  return (
    <View style={styles.result}>
      <BillConfetti />
      <FadeIn delay={150} duration={450} style={styles.copy}>
        <Text style={styles.resultLabel}>You could Earn</Text>
        <View style={styles.amountRow}>
          <Text style={styles.amount}>{amountLabel}</Text>
          {currency && <Text style={styles.currency}>{currency}</Text>}
        </View>
        <Text style={styles.resultLabel}>Bonus cash Per Year</Text>

        {upsellMessage && (
          <FadeIn delay={1800} duration={450} style={styles.copy}>
            <Text style={styles.upsellLabel}>{upsellMessage}</Text>
          </FadeIn>
        )}
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    alignItems: "center",
    minHeight: 440,
    justifyContent: "center",
    overflow: "visible",
    position: "relative",
    width: "100%",
  },
  copy: {
    alignItems: "center",
    gap: 8,
  },
  amountRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  resultLabel: {
    ...text.default,
    color: colors.foreground,
    fontSize: 24,
    textAlign: "center",
  },
  disclaimerLabel: {
    ...text.default,
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "lowercase",
    marginTop: 30,
  },
  upsellLabel: {
    ...text.default,
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 24,
    textAlign: "center",
    textTransform: "lowercase",
  },
  amount: {
    ...text.default,
    color: colors.payout,
    fontSize: 70,
    fontWeight: "800",
    lineHeight: 70,
    textAlign: "center",
  },
  currency: {
    ...text.default,
    color: colors.payout,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 36,
  },
});
