import { Image } from "expo-image";
import { Link } from "expo-router";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { colors, radii, text } from "@/styles/theme";
import { FadeIn } from "@/components";

const starburstRays = Array.from({ length: 24 }, (_, index) => index);

export function HomeScreen() {
  const [starburstRotation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(starburstRotation, {
        duration: 12000,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [starburstRotation]);

  const starburstRotate = starburstRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <FadeIn delay={150} duration={500} style={styles.container}>
      <View style={styles.logoStage}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.starburst,
            { transform: [{ rotate: starburstRotate }] },
          ]}
        >
          {starburstRays.map((ray) => (
            <View
              key={ray}
              style={[
                styles.starburstRay,
                { transform: [{ rotate: `${ray * 15}deg` }] },
              ]}
            />
          ))}
        </Animated.View>
        <Image
          accessibilityLabel="Cashback logo"
          contentFit="contain"
          source={require("@/assets/images/cashback_logo.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.subtitle}>
        Get the most of out of your play! Starting June 28, 2026. You can earn
        up to 4% on every bet you place. Tap on Get My Estimate to find out how much you can earn.
      </Text>
      <Link href="/calc" style={styles.link}>
        Get My Estimate
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
  logoStage: {
    alignItems: "center",
    height: 250,
    justifyContent: "center",
    marginBottom: 8,
    overflow: "visible",
    position: "relative",
    width: "100%",
  },
  starburst: {
    height: 300,
    opacity: 0.65,
    position: "absolute",
    width: 300,
  },
  starburstRay: {
    backgroundColor: colors.payout,
    height: 1000,
    left: 147,
    opacity: 0.72,
    position: "absolute",
    top: 0,
    transformOrigin: "3px 150px",
    width: 6,
  },
  logo: {
    height: 220,
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
