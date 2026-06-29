import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

import { colors, fonts } from "@/styles/theme";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [fonts.archivoBlack]: require("@/assets/fonts/Archivo_Black/ArchivoBlack-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

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
