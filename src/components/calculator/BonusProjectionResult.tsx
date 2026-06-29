import { StyleSheet, Text, View } from "react-native";

import { colors, radii } from "@/styles/theme";

type BonusProjectionResultProps = {
  text: string;
};

export function BonusProjectionResult({ text }: BonusProjectionResultProps) {
  return (
    <View style={styles.result}>
      <Text style={styles.resultText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    padding: 20,
  },
  resultText: {
    color: colors.foreground,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 42,
    textAlign: "center",
  },
});
