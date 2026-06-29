import { Pressable, StyleSheet, Text, View } from "react-native";

import type { BetTypeOptionViewData } from "@/hooks/useCalculator";
import { colors, radii } from "@/styles/theme";

type BetTypeDropdownProps = {
  isOpen: boolean;
  label: string;
  onSelect: (betTypeId: string) => void;
  onToggle: () => void;
  options: BetTypeOptionViewData[];
  selectedId: string | null;
};

export function BetTypeDropdown({
  isOpen,
  label,
  onSelect,
  onToggle,
  options,
  selectedId,
}: BetTypeDropdownProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Bet type</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onToggle}
        style={styles.selectButton}
      >
        <Text style={styles.selectText}>{label}</Text>
        <Text style={styles.selectIndicator}>{isOpen ? "^" : "v"}</Text>
      </Pressable>

      {isOpen && (
        <View style={styles.menu}>
          {options.map((option) => {
            const isSelected = selectedId === option.id;

            return (
              <Pressable
                accessibilityRole="button"
                key={option.id}
                onPress={() => onSelect(option.id)}
                style={[styles.menuItem, isSelected && styles.selectedItem]}
              >
                <Text style={styles.menuItemText}>{option.label}</Text>
                <Text style={styles.menuItemRate}>{option.rateLabel}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    gap: 8,
    zIndex: 2,
  },
  label: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "700",
  },
  selectButton: {
    alignItems: "center",
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    minHeight: 56,
    paddingHorizontal: 14,
  },
  selectText: {
    color: colors.foreground,
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
  },
  selectIndicator: {
    color: colors.foreground,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  menu: {
    backgroundColor: colors.background,
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 86,
    zIndex: 2,
  },
  menuItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 14,
  },
  selectedItem: {
    borderColor: colors.foreground,
    borderWidth: 2,
  },
  menuItemText: {
    color: colors.foreground,
    fontSize: 15,
    fontWeight: "700",
  },
  menuItemRate: {
    color: colors.foreground,
    fontSize: 15,
    fontWeight: "700",
  },
});
