import React from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import SearchIcon from "../icons/SearchIcon"
import { colors, fonts, pixelBorder, pixelShadow } from "../../theme"

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
        <Text style={styles.regionLabel}>KANTO → PALDEA</Text>
      </View>

      <View style={styles.heroCopy}>
        <Text style={styles.eyebrow}>EXPLORAR · DESCUBRIR · COLECCIONAR</Text>
        <Text style={styles.title}>
          ENCUENTRA TU{"\n"}
          <Text style={styles.titleEm}>POKÉMON</Text>.
        </Text>
        <Text style={styles.subtitle}>
          Buscar por Nombre o Id del pokemón.
        </Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <SearchIcon size={18} color={colors.ink} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="e.j. Pikachu o 025"
            placeholderTextColor={colors.gray}
            style={styles.input}
            autoCapitalize="none"
            returnKeyType="search"
            onSubmitEditing={onSubmit}
          />
        </View>
        <Pressable
          onPress={onSubmit}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>BUSCAR</Text>
        </Pressable>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>! {error}</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  hero: { paddingTop: 12, paddingBottom: 20 },

  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.ink,
    letterSpacing: 1,
  },

  // Pokéball hecha solo con Views
  pokeball: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.ink,
    overflow: "hidden",
    position: "relative",
    backgroundColor: colors.paper,
  },
  pokeballTop: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "50%",
    backgroundColor: colors.red,
  },
  pokeballBottom: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: "50%",
    backgroundColor: colors.paper,
  },
  pokeballBand: {
    position: "absolute",
    top: "50%",
    marginTop: -2,
    left: 0, right: 0,
    height: 4,
    backgroundColor: colors.ink,
  },
  pokeballCenter: {
    position: "absolute",
    top: "50%", left: "50%",
    marginTop: -5, marginLeft: -5,
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: colors.paper,
    borderWidth: 2,
    borderColor: colors.ink,
    zIndex: 2,
  },

  regionChip: {
    ...pixelBorder,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.panel,
  },
  regionText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.ink,
    letterSpacing: 1,
  },

  heroCopy: { marginBottom: 20 },
  eyebrow: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.gray,
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 36,
    color: colors.ink,
  },
  titleAccent: {
    color: colors.red,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.ink,
    marginTop: 10,
  },

  searchRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "stretch",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.paper,
    paddingHorizontal: 10,
    ...pixelBorder,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.ink,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: colors.red,
    paddingHorizontal: 14,
    justifyContent: "center",
    ...pixelBorder,
    ...pixelShadow,
  },
  buttonPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.paper,
    letterSpacing: 1,
  },

  errorBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#FFE0D8",
    borderWidth: 3,
    borderColor: colors.redDark,
  },
  errorText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.redDark,
  },
})