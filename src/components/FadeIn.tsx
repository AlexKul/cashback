import { type PropsWithChildren, useEffect, useState } from "react";
import {
  Animated,
  type StyleProp,
  type ViewStyle,
  type ViewProps,
} from "react-native";

type FadeInProps = PropsWithChildren<
  ViewProps & {
    delay?: number;
    duration?: number;
    from?: number;
    style?: StyleProp<ViewStyle>;
    to?: number;
  }
>;

export function FadeIn({
  children,
  delay = 0,
  duration = 300,
  from = 0,
  style,
  to = 1,
  ...viewProps
}: FadeInProps) {
  const [opacity] = useState(() => new Animated.Value(from));

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      delay,
      duration,
      toValue: to,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [delay, duration, opacity, to]);

  return (
    <Animated.View {...viewProps} style={[style, { opacity }]}>
      {children}
    </Animated.View>
  );
}
