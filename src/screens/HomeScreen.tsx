import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { colors, radii, text } from "@/styles/theme";
import { FadeIn } from "@/components";

export function HomeScreen() {
  return (
    <FadeIn delay={150} duration={500} style={styles.container}>
      <Image
        accessibilityLabel="Cashback logo"
        contentFit="contain"
        source={require("@/assets/images/cashback_logo.png")}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>
        Get the most of out of your play! Starting June 28, 2026. You can earn
        up to 4% on every bet you place. Tap on Learn More to find out how much you can earn.
      </Text>
      <Link href="/calc" style={styles.link}>
        Learn More
      </Link>
    </FadeIn>
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
    height: 220,
    marginBottom: 8,
    width: 500,
  },
  subtitle: {
    ...text.default,
    color: colors.foreground,
    fontSize: 18,
    textAlign: "center",
  },
  link: {
    ...text.default,
    backgroundColor: colors.background,
    borderColor: colors.foreground,
    borderRadius: radii.control,
    borderWidth: 1,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});
