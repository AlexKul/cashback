import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Cashback" }} />
      <Stack.Screen name="offers" options={{ title: "Offers" }} />
    </Stack>
  );
}
