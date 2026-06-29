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
    flex: 1,
    gap: 8,
    width: "50%",
    alignSelf: "center",
  },
  inputShell: {
    alignItems: "center",
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 18,
    position: "relative",
  },
  currencyPrefix: {
    ...text.default,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "700",
    left: 18,
    position: "absolute",
  },
  input: {
    ...text.default,
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 34,
    paddingVertical: 0,
    textAlign: "center",
    width: "100%",
  },
  error: {
    ...text.default,
    color: colors.foreground,
    fontSize: 18,
  },
});
