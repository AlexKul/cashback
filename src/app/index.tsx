import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cashback</Text>
      <Text style={styles.subtitle}>Keep your rewards easy to find.</Text>
      <Link href="/offers" style={styles.link}>
        View offers
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7F8F5",
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#142119",
    fontSize: 36,
    fontWeight: "800",
  },
  subtitle: {
    color: "#506257",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    backgroundColor: "#336B4E",
    borderRadius: 8,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});
