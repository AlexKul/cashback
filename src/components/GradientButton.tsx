import { LinearGradient } from "expo-linear-gradient";
import {
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { colors, radii, text } from "@/styles/theme";

type GradientButtonProps = {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function GradientButton({
  disabled = false,
  label,
  onPress,
  style,
  textStyle,
}: GradientButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.pressable, disabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        <Text style={[styles.label, textStyle]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  disabled: {
    opacity: 0.45,
  },
  gradient: {
    alignItems: "center",
    borderRadius: radii.pill,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  label: {
    ...text.default,
    color: colors.foreground,
    fontSize: 16,
    textAlign: "center",
  },
});
