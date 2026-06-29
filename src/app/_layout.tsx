import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

import { colors } from "@/styles/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShown: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.foreground,
          headerTitleStyle: { color: colors.foreground },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="calc" />
      </Stack>
    </>
  );
}
