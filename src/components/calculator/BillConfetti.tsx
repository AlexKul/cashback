import {
  type ImageSourcePropType,
  Animated,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import type { BillParticle, BillParticleConfig } from "@/models/calculator";

const billImages = [
  require("@/assets/images/bill1.png"),
  require("@/assets/images/bill2.png"),
] as ImageSourcePropType[];

const billParticleConfigs: BillParticleConfig[] = [
  {
    delay: 0,
    fromX: 8,
    imageIndex: 0,
    rotation: "-54deg",
    size: 76,
    toX: -190,
    toY: -470,
  },
  {
    delay: 25,
    fromX: 30,
    imageIndex: 1,
    rotation: "38deg",
    size: 64,
    toX: -105,
    toY: -390,
  },
  {
    delay: 55,
    fromX: 52,
    imageIndex: 0,
    rotation: "-18deg",
    size: 82,
    toX: 18,
    toY: -520,
  },
  {
    delay: 85,
    fromX: 76,
    imageIndex: 1,
    rotation: "58deg",
    size: 70,
    toX: 165,
    toY: -430,
  },
  {
    delay: 120,
    fromX: 94,
    imageIndex: 0,
    rotation: "82deg",
    size: 86,
    toX: 245,
    toY: -500,
  },
  {
    delay: 155,
    fromX: 18,
    imageIndex: 1,
    rotation: "-92deg",
    size: 60,
    toX: -260,
    toY: -310,
  },
  {
    delay: 185,
    fromX: 40,
    imageIndex: 0,
    rotation: "72deg",
    size: 72,
    toX: -145,
    toY: -575,
  },
  {
    delay: 215,
    fromX: 62,
    imageIndex: 1,
    rotation: "-64deg",
    size: 66,
    toX: 105,
    toY: -585,
  },
  {
    delay: 245,
    fromX: 84,
    imageIndex: 0,
    rotation: "104deg",
    size: 74,
    toX: 285,
    toY: -330,
  },
  {
    delay: 285,
    fromX: 26,
    imageIndex: 1,
    rotation: "-36deg",
    size: 52,
    toX: -230,
    toY: -210,
  },
  {
    delay: 320,
    fromX: 50,
    imageIndex: 0,
    rotation: "28deg",
    size: 58,
    toX: -18,
    toY: -650,
  },
  {
    delay: 360,
    fromX: 72,
    imageIndex: 1,
    rotation: "-118deg",
    size: 54,
    toX: 235,
    toY: -235,
  },
];

export function BillConfetti() {
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
        duration: 1500,
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
                inputRange: [0, 0.08, 0.78, 1],
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
                    inputRange: [0, 0.18, 1],
                    outputRange: [0.35, 1.15, 0.82],
                  }),
                },
              ],
              width: bill.size * 1.75,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  billLayer: {
    bottom: 0,
    left: 0,
    overflow: "visible",
    position: "absolute",
    right: 0,
    top: 0,
  },
  bill: {
    bottom: -24,
    position: "absolute",
  },
});
