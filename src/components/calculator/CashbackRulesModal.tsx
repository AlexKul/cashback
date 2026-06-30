import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import type { CashbackRulesViewData } from "@/hooks/useCalculator";
import { colors, radii, text } from "@/styles/theme";

type CashbackRulesModalProps = {
  onClose: () => void;
  rules: CashbackRulesViewData | null;
  visible: boolean;
};

export function CashbackRulesModal({
  onClose,
  rules,
  visible,
}: CashbackRulesModalProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>{rules?.programName ?? "Rules"}</Text>
          <Text style={styles.summary}>
            Currency: {rules?.currency ?? "--"} | Monthly cap:{" "}
            {rules?.monthlyCapLabel ?? "--"}
          </Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.cell, styles.betCell]}>Bet Type</Text>
              <Text style={[styles.cell, styles.rateCell]}>Cashback Rate</Text>
            </View>
            {rules?.tiers.map((tier) => (
              <View key={tier.id} style={styles.tableRow}>
                <Text style={[styles.cell, styles.betCell]}>{tier.label}</Text>
                <Text style={[styles.cell, styles.rateCell]}>
                  {tier.rateLabel}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.note}>
            Annual estimate is calculated from weekly play x cashback rate x 4
            weeks x 12 months, with the monthly cap applied first.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardPressed,
    borderRadius: radii.control,
    borderWidth: 1,
    gap: 16,
    maxWidth: 420,
    padding: 20,
    width: "100%",
  },
  title: {
    ...text.default,
    color: colors.foreground,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
  },
  summary: {
    ...text.default,
    color: colors.foregroundMuted,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  table: {
    borderColor: colors.cardPressed,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: colors.cardPressed,
    flexDirection: "row",
  },
  tableRow: {
    borderTopColor: colors.cardPressed,
    borderTopWidth: 1,
    flexDirection: "row",
  },
  cell: {
    ...text.default,
    color: colors.foreground,
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  betCell: {
    flex: 1,
  },
  rateCell: {
    textAlign: "right",
    width: 132,
  },
  note: {
    ...text.default,
    color: colors.foregroundMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: colors.cardPressed,
    borderRadius: radii.pill,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  closeButtonText: {
    ...text.default,
    color: colors.foreground,
    fontSize: 15,
  },
});
