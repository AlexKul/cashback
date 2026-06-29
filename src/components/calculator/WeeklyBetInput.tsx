import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radii, text } from "@/styles/theme";

type WeeklyBetInputProps = {
  errorText?: string | null;
  label?: string;
  onChangeText: (value: string) => void;
  value: string;
};

export function WeeklyBetInput({
  errorText,
  label = "Bet per week",
  onChangeText,
  value,
}: WeeklyBetInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputShell}>
        <Text style={styles.currencyPrefix}>$</Text>
        <TextInput
          keyboardType="decimal-pad"
          onChangeText={onChangeText}
          placeholder="0"
          placeholderTextColor={colors.foreground}
          style={styles.input}
          value={value}
        />
      </View>
      {errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    gap: 8,
  },
  label: {
    ...text.default,
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "700",
  },
  inputShell: {
    alignItems: "center",
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 56,
    paddingHorizontal: 18,
  },
  currencyPrefix: {
    ...text.default,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "700",
    marginRight: 4,
  },
  input: {
    ...text.default,
    color: colors.foreground,
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 0,
  },
  error: {
    ...text.default,
    color: colors.foreground,
    fontSize: 18,
  },
});
