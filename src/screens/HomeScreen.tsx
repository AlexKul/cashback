import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii } from "@/styles/theme";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel="Cashback logo"
        contentFit="contain"
        source={require("@/assets/images/cashback_logo.png")}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>
        Get the most of out of your play! Starting June 28, 2026. You can earn
        up to 4% on every bet you place. Try our calculator to see how much
        bonus balance you could earn.
      </Text>
      <Link href="/calc" style={styles.link}>
        Open Calculator
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    height: 300,
    marginBottom: 8,
    width: 500,
  },
  subtitle: {
    color: colors.foreground,
    fontSize: 22,
    textAlign: "center",
  },
  link: {
    backgroundColor: colors.background,
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});
