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
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder="$0"
        placeholderTextColor={colors.foreground}
        style={styles.input}
        value={value}
      />
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
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    ...text.default,
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "700",
    minHeight: 56,
    paddingHorizontal: 14,
  },
  error: {
    ...text.default,
    color: colors.foreground,
    fontSize: 12,
  },
});
