import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { FadeIn, GradientButton } from "@/components";
import { colors, radii, text } from "@/styles/theme";

const starburstRays = Array.from({ length: 24 }, (_, index) => index);

const bettingCards = [
  {
    away: "Chicago White Sox",
    awayPitcher: "E. Fedde - R",
    home: "Baltimore Orioles",
    homePitcher: "T. Gibson - R",
    moneyline: "+122 / -134",
    runLine: "+1.5 / -1.5",
    time: "Today 6:35 PM",
    total: "o10.5 / u10.5",
  },
  {
    away: "Texas Rangers",
    awayPitcher: "J. Degrom - R",
    home: "Cleveland Guardians",
    homePitcher: "T. Bibee - R",
    moneyline: "-114 / +104",
    runLine: "-1.5 / +1.5",
    time: "Today 6:40 PM",
    total: "o7.5 / u7.5",
  },
  {
    away: "Pittsburgh Pirates",
    awayPitcher: "B. Chandler - R",
    home: "Philadelphia Phillies",
    homePitcher: "C. Sanchez - L",
    moneyline: "+196 / -219",
    runLine: "+1.5 / -1.5",
    time: "Today 6:40 PM",
    total: "o8.5 / u8.5",
  },
  {
    away: "Detroit Tigers",
    awayPitcher: "T. Skubal - L",
    home: "New York Yankees",
    homePitcher: "C. Schlittler - R",
    moneyline: "+108 / -120",
    runLine: "+1.5 / -1.5",
    time: "Today 7:05 PM",
    total: "o7.5 / u7.5",
  },
] as const;

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
      <View pointerEvents="none" style={styles.betSection}>
        <Text style={styles.todayLabel}>Today</Text>
        {bettingCards.slice(0, 2).map((card) => (
          <View key={`${card.away}-${card.home}`} style={styles.betCard}>
            <View style={styles.marketHeader}>
              <Text style={styles.marketHeaderText}>Run Line</Text>
              <Text style={styles.marketHeaderText}>Total</Text>
              <Text style={styles.marketHeaderText}>Moneyline</Text>
            </View>
            <View style={styles.matchupRow}>
              <View style={styles.teamStack}>
                <Text numberOfLines={1} style={styles.betCardTitle}>
                  {card.away}
                </Text>
                <Text numberOfLines={1} style={styles.pitcherText}>
                  {card.awayPitcher}
                </Text>
              </View>
              <View style={styles.marketPill}>
                <Text style={styles.marketValue}>{card.runLine}</Text>
              </View>
            </View>
            <Text style={styles.vsText}>vs</Text>
            <View style={styles.matchupRow}>
              <View style={styles.teamStack}>
                <Text numberOfLines={1} style={styles.betCardTitle}>
                  {card.home}
                </Text>
                <Text numberOfLines={1} style={styles.pitcherText}>
                  {card.homePitcher}
                </Text>
              </View>
              <View style={styles.marketPill}>
                <Text style={styles.marketValue}>{card.total}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    padding: 24,
    paddingTop: 120,
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
    zIndex: 1,
  },
  betSection: {
    gap: 12,
    marginTop: 18,
    maxWidth: 420,
    width: "100%",
  },
  betCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardPressed,
    borderRadius: 18,
    borderWidth: 1,
    padding: 12,
    width: "100%",
  },
  todayLabel: {
    ...text.default,
    color: colors.foregroundMuted,
    fontSize: 18,
  },
  marketHeader: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  marketHeaderText: {
    ...text.default,
    color: "#FFB38D",
    fontSize: 10,
    opacity: 0.78,
    width: 58,
  },
  matchupRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  teamStack: {
    flex: 1,
  },
  betCardTitle: {
    ...text.default,
    color: colors.foreground,
    fontSize: 13,
  },
  pitcherText: {
    ...text.default,
    color: "#FF5A1F",
    fontSize: 9,
    marginTop: 2,
  },
  betCardLabel: {
    ...text.default,
    color: "#FFB38D",
    fontSize: 11,
    lineHeight: 16,
  },
  vsText: {
    ...text.default,
    color: colors.foreground,
    fontSize: 12,
    marginVertical: 6,
    opacity: 0.8,
  },
  marketPill: {
    alignItems: "center",
    borderColor: "#FF5A1F",
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    minHeight: 30,
    paddingHorizontal: 8,
  },
  marketValue: {
    ...text.default,
    color: "#FF5A1F",
    fontSize: 11,
  },
  cardFooter: {
    alignItems: "center",
    borderTopColor: colors.cardPressed,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 8,
  },
  moreWagers: {
    ...text.default,
    color: colors.foregroundMuted,
    fontSize: 10,
    marginTop: 6,
    textAlign: "right",
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
