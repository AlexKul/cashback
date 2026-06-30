import type { ImageSourcePropType, Animated } from "react-native";

export type BillParticle = {
  delay: number;
  fromX: number;
  image: ImageSourcePropType;
  progress: Animated.Value;
  rotation: string;
  size: number;
  toX: number;
  toY: number;
};
