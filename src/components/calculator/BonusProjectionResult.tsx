import {
  type ImageSourcePropType,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { FadeIn } from "@/components";
import { colors, text } from "@/styles/theme";

type BonusProjectionResultProps = {
  amountLabel: string;
  currency: string | null | undefined;
};

type BillParticle = {
  delay: number;
  fromX: number;
  image: ImageSourcePropType;
  progress: Animated.Value;
  rotation: string;
  size: number;
  toX: number;
  toY: number;
};

const billImages = [
  require("@/assets/images/bill1.png"),
  require("@/assets/images/bill2.png"),
] as ImageSourcePropType[];

const billParticleConfigs = [
  { delay: 0, fromX: 8, imageIndex: 0, rotation: "-24deg", size: 62, toX: -120, toY: -320 },
  { delay: 70, fromX: 48, imageIndex: 1, rotation: "18deg", size: 58, toX: 120, toY: -280 },
  { delay: 120, fromX: 86, imageIndex: 0, rotation: "35deg", size: 72, toX: -40, toY: -360 },
  { delay: 190, fromX: 18, imageIndex: 1, rotation: "-38deg", size: 54, toX: 160, toY: -340 },
  { delay: 240, fromX: 70, imageIndex: 0, rotation: "28deg", size: 66, toX: -160, toY: -260 },
  { delay: 310, fromX: 36, imageIndex: 1, rotation: "-14deg", size: 60, toX: 48, toY: -390 },
];

export function BonusProjectionResult({
  amountLabel,
  currency,
}: BonusProjectionResultProps) {
  const [billParticles] = useState<BillParticle[]>(() =>
    billParticleConfigs.map((config) => ({
      delay: config.delay,
      fromX: config.fromX,
      image: billImages[config.imageIndex],
      progress: new Animated.Value(0),
      rotation: config.rotation,
      size: config.size,
      toX: config.toX,
      toY: config.toY,
    })),
  );

  useEffect(() => {
    const animations = billParticles.map((bill) =>
      Animated.timing(bill.progress, {
        delay: bill.delay,
        duration: 1100,
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    Animated.stagger(30, animations).start();

    return () => {
      billParticles.forEach((bill) => {
        bill.progress.stopAnimation();
      });
    };
  }, [billParticles]);

  return (
    <View style={styles.result}>
      <View pointerEvents="none" style={styles.billLayer}>
        {billParticles.map((bill, index) => (
          <Animated.Image
            key={`${bill.delay}-${index}`}
            resizeMode="contain"
            source={bill.image}
            style={[
              styles.bill,
              {
                height: bill.size,
                left: `${bill.fromX}%`,
                opacity: bill.progress.interpolate({
                  inputRange: [0, 0.15, 0.8, 1],
                  outputRange: [0, 1, 1, 0],
                }),
                transform: [
                  {
                    translateX: bill.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, bill.toX],
                    }),
                  },
                  {
                    translateY: bill.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, bill.toY],
                    }),
                  },
                  {
                    rotate: bill.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", bill.rotation],
                    }),
                  },
                  {
                    scale: bill.progress.interpolate({
                      inputRange: [0, 0.2, 1],
                      outputRange: [0.5, 1, 0.9],
                    }),
                  },
                ],
                width: bill.size * 1.75,
              },
            ]}
          />
        ))}
      </View>

      <FadeIn delay={150} duration={450} style={styles.copy}>
        <Text style={styles.resultLabel}>You could Earn</Text>
        <View style={styles.amountRow}>
          <Text style={styles.amount}>{amountLabel}</Text>
          {currency && <Text style={styles.currency}>{currency}</Text>}
        </View>
        <Text style={styles.resultLabel}>Per Year</Text>
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    alignItems: "center",
    minHeight: 220,
    justifyContent: "center",
    overflow: "visible",
    position: "relative",
  },
  billLayer: {
    bottom: 0,
    left: 0,
    overflow: "visible",
    position: "absolute",
    right: 0,
    top: 0,
  },
  bill: {
    bottom: 12,
    position: "absolute",
  },
  copy: {
    alignItems: "center",
    gap: 8,
  },
  amountRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  resultLabel: {
    ...text.default,
    color: colors.foreground,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "lowercase",
  },
  amount: {
    ...text.default,
    color: colors.payout,
    fontSize: 70,
    fontWeight: "800",
    lineHeight: 70,
    textAlign: "center",
  },
  currency: {
    ...text.default,
    color: colors.payout,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 36,
  },
});
