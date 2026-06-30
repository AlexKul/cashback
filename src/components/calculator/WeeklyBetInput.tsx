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
  label = "100",
  onChangeText,
  value,
}: WeeklyBetInputProps) {
  return (
    <View style={styles.field}>
      <View style={styles.inputShell}>
        <Text style={styles.currencyPrefix}>$</Text>
        <TextInput
          accessibilityLabel={label}
          keyboardType="decimal-pad"
          onChangeText={onChangeText}
          placeholder={label}
          placeholderTextColor={colors.placeholder}
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
    alignSelf: "center",
    gap: 8,
    width: "100%",
  },
  inputShell: {
    alignItems: "center",
    backgroundColor: colors.cardPressed,
    borderColor: colors.cardPressed,
    borderRadius: radii.control,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 64,
    paddingHorizontal: 18,
    position: "relative",
  },
  currencyPrefix: {
    ...text.default,
    color: colors.foregroundMuted,
    fontSize: 16,
    left: 18,
    position: "absolute",
  },
  input: {
    ...text.default,
    color: colors.foreground,
    fontSize: 18,
    paddingHorizontal: 34,
    paddingVertical: 0,
    textAlign: "center",
    width: "100%",
  },
  error: {
    ...text.default,
    color: colors.foregroundMuted,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
});
