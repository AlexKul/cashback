import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { FadeIn, GradientButton } from "@/components";
import { colors, radii, text } from "@/styles/theme";

const starburstRays = Array.from({ length: 24 }, (_, index) => index);

export function HomeScreen() {
  const router = useRouter();
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
      <View style={styles.card}>
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
          Get the most out of your play. Starting June 28, 2026, you can earn
          up to 4% on every bet you place.
        </Text>
        <GradientButton
          label="Get My Estimate"
          onPress={() => router.push("/calc")}
          style={styles.link}
        />
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radii.control,
    gap: 18,
    maxWidth: 420,
    overflow: "hidden",
    padding: 20,
    width: "100%",
  },
  logoStage: {
    alignItems: "center",
    height: 230,
    justifyContent: "center",
    overflow: "visible",
    position: "relative",
    width: "100%",
  },
  starburst: {
    height: 280,
    opacity: 0.38,
    position: "absolute",
    width: 280,
  },
  starburstRay: {
    backgroundColor: colors.gradientStart,
    height: 680,
    left: 137,
    opacity: 0.38,
    position: "absolute",
    top: 0,
    transformOrigin: "3px 140px",
    width: 6,
  },
  logo: {
    height: 200,
    width: 360,
  },
  subtitle: {
    ...text.default,
    color: colors.foregroundMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  link: {
    marginTop: 8,
    width: "100%",
  },
});
