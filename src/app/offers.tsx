import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useOffersViewModel } from "@/features/offers/useOffersViewModel";

export default function OffersScreen() {
  const {
    activeFilter,
    filters,
    items,
    setFilter,
    totalExpectedCashbackLabel,
  } = useOffersViewModel();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Cashback</Text>
        <Text style={styles.title}>Offers</Text>
        <Text style={styles.subtitle}>
          Track nearby rewards and see which offers are ready based on typical
          spend.
        </Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Potential cashback</Text>
        <Text style={styles.summaryValue}>{totalExpectedCashbackLabel}</Text>
      </View>

      <View style={styles.filters} accessibilityRole="tablist">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              key={filter.value}
              onPress={() => setFilter(filter.value)}
              style={[styles.filterButton, isActive && styles.activeFilter]}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isActive && styles.activeFilterText,
                ]}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {items.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            <View style={styles.offerHeader}>
              <View>
                <Text style={styles.merchant}>{offer.merchant}</Text>
                <Text style={styles.category}>{offer.category}</Text>
              </View>
              <View style={styles.rateBadge}>
                <Text style={styles.rateText}>{offer.cashbackRateLabel}</Text>
              </View>
            </View>

            <View style={styles.offerFooter}>
              <View>
                <Text style={styles.metaLabel}>Expected back</Text>
                <Text style={styles.cashback}>
                  {offer.expectedCashbackLabel}
                </Text>
              </View>
              <View style={styles.statusColumn}>
                <Text
                  style={[
                    styles.status,
                    offer.isEligible ? styles.ready : styles.needsSpend,
                  ]}
                >
                  {offer.eligibilityLabel}
                </Text>
                <Text style={styles.expiry}>{offer.expiryLabel}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 20,
    padding: 24,
    backgroundColor: "#F7F8F5",
  },
  header: {
    gap: 8,
    paddingTop: 24,
  },
  eyebrow: {
    color: "#336B4E",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    color: "#142119",
    fontSize: 36,
    fontWeight: "800",
  },
  subtitle: {
    color: "#506257",
    fontSize: 16,
    lineHeight: 23,
  },
  summary: {
    backgroundColor: "#142119",
    borderRadius: 8,
    padding: 20,
  },
  summaryLabel: {
    color: "#BFD9C9",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryValue: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 6,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flex: 1,
    alignItems: "center",
    borderColor: "#D8DFD7",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 12,
  },
  activeFilter: {
    backgroundColor: "#336B4E",
    borderColor: "#336B4E",
  },
  filterButtonText: {
    color: "#506257",
    fontSize: 14,
    fontWeight: "700",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  list: {
    gap: 12,
  },
  offerCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E3E8E1",
    borderRadius: 8,
    borderWidth: 1,
    gap: 20,
    padding: 18,
  },
  offerHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  merchant: {
    color: "#142119",
    fontSize: 20,
    fontWeight: "800",
  },
  category: {
    color: "#6B7C71",
    fontSize: 14,
    marginTop: 4,
  },
  rateBadge: {
    backgroundColor: "#EAF4EE",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rateText: {
    color: "#336B4E",
    fontSize: 15,
    fontWeight: "800",
  },
  offerFooter: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  metaLabel: {
    color: "#6B7C71",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  cashback: {
    color: "#142119",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  statusColumn: {
    alignItems: "flex-end",
    flex: 1,
  },
  status: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "right",
  },
  ready: {
    color: "#336B4E",
  },
  needsSpend: {
    color: "#A15C20",
  },
  expiry: {
    color: "#6B7C71",
    fontSize: 13,
    marginTop: 4,
    textAlign: "right",
  },
});
