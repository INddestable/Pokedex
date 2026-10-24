import React from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import SearchIcon from "../icons/SearchIcon"

export default function Hero({ query, setQuery, loading, error, onSubmit }) {
  return (
    <View style={styles.hero}>
      <View style={styles.nav}>
        <View style={styles.brand}>
          <View style={styles.brandMark}>
            <View style={styles.brandDot} />
          </View>
          <Text style={styles.brandText}>POKÉDEX</Text>
        </View>
        <Text style={styles.regionLabel}>Kanto → Paldea</Text>
      </View>

      <View style={styles.heroCopy}>
        <Text style={styles.eyebrow}>Explora · Descubre · Colecciona</Text>
        <Text style={styles.title}>
          Encuentra a tu{"\n"}
          <Text style={styles.titleEm}>Pokémon</Text> favorito.
        </Text>
        <Text style={styles.subtitle}>
          Busca por nombre o número de Pokédex y descubre todos sus datos.
        </Text>
      </View>

      <View style={styles.searchBox}>
        <SearchIcon size={18} color="#888" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Ej. Pikachu o 025"
          placeholderTextColor="#999"
          style={styles.input}
          autoCapitalize="none"
          returnKeyType="search"
          onSubmitEditing={onSubmit}
        />
        <Pressable
          onPress={onSubmit}
          disabled={loading}
          style={({ pressed }) => [
            styles.searchBtn,
            (pressed || loading) && styles.searchBtnPressed,
          ]}
        >
          <Text style={styles.searchBtnText}>Buscar</Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandMark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#e33",
    alignItems: "center",
    justifyContent: "center",
  },
  brandDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#e33" },
  brandText: { fontWeight: "700", letterSpacing: 2, fontSize: 13 },
  regionLabel: { fontSize: 11, color: "#888" },
  heroCopy: { marginBottom: 20 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, color: "#888", marginBottom: 8 },
  title: { fontSize: 30, fontWeight: "800", lineHeight: 36 },
  titleEm: { fontStyle: "italic", color: "#e33" },
  subtitle: { fontSize: 14, color: "#555", marginTop: 8 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f4",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 14 },
  searchBtn: {
    backgroundColor: "#111",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchBtnPressed: { opacity: 0.7 },
  searchBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  error: { color: "#d33", marginTop: 10, fontSize: 13 },
})