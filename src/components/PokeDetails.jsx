import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ArrowIcon from "./icons/ArrowIcon"
import { formatName } from "../utils/formatName"

export default function PokeDetails({ pokemon, onBack }) {
const image =
    pokemon.sprites.other["official-artwork"].front_default ?? null

  return (
    <>
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.6 }]}
            accessibilityLabel="Volver a la Pokédex"
          >
            <ArrowIcon size={22} />
          </Pressable>
          <Text style={styles.eyebrow}>Pokédex nacional</Text>
          <Text style={styles.number}>
            #{String(pokemon.id).padStart(4, "0")}
          </Text>
        </View>

        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>Pokémon seleccionado</Text>
            <Text style={styles.title}>{formatName(pokemon.name)}</Text>
            <View style={styles.typeRow}>
              {pokemon.types.map(({ type }) => (
                <View key={type.name} style={styles.typePill}>
                  <Text style={styles.typeText}>{formatName(type.name)}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.imageWrap}>
            {image && (
              <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
            )}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>Información base</Text>
          <Text style={styles.cardTitle}>Características</Text>
          <View style={styles.measureGrid}>
            <View style={styles.measure}>
              <Text style={styles.measureValue}>{pokemon.height / 10} m</Text>
              <Text style={styles.measureLabel}>Altura</Text>
            </View>
            <View style={styles.measure}>
              <Text style={styles.measureValue}>{pokemon.weight / 10} kg</Text>
              <Text style={styles.measureLabel}>Peso</Text>
            </View>
            <View style={styles.measure}>
              <Text style={styles.measureValue}>{pokemon.base_experience}</Text>
              <Text style={styles.measureLabel}>Experiencia</Text>
            </View>
          </View>
          <View style={styles.abilities}>
            <Text style={styles.measureLabel}>Habilidades</Text>
            <Text style={styles.abilitiesText}>
              {pokemon.abilities
                .map(
                  ({ ability, is_hidden }) =>
                    `${formatName(ability.name)}${is_hidden ? " (oculta)" : ""}`
                )
                .join(" · ")}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>Rendimiento</Text>
          <Text style={styles.cardTitle}>Estadísticas base</Text>
          <View style={styles.stats}>
            {pokemon.stats.map(({ base_stat, stat }) => (
              <View key={stat.name} style={styles.statRow}>
                <Text style={styles.statName}>{formatName(stat.name)}</Text>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${Math.min((base_stat / 180) * 100, 100)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.statValue}>{base_stat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconBtn: { padding: 8 },
  eyebrow: { fontSize: 11, color: "#888", letterSpacing: 1.5 },
  number: { fontSize: 13, color: "#aaa", fontWeight: "600" },
  hero: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  title: { fontSize: 30, fontWeight: "800", marginTop: 4 },
  typeRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  typePill: {
    backgroundColor: "#eef",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  typeText: { fontSize: 12, fontWeight: "600", color: "#335" },
  imageWrap: { width: 130, height: 130, alignItems: "center", justifyContent: "center" },
  image: { width: 130, height: 130 },
  card: {
    backgroundColor: "#f7f7f9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  kicker: { fontSize: 11, color: "#888", letterSpacing: 1.5 },
  cardTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  measureGrid: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  measure: { flex: 1 },
  measureValue: { fontSize: 16, fontWeight: "700" },
  measureLabel: { fontSize: 11, color: "#888", marginTop: 2 },
  abilities: { marginTop: 6 },
  abilitiesText: { fontSize: 13, color: "#333", marginTop: 4 },
  stats: { gap: 10 },
  statRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  statName: { width: 110, fontSize: 12, color: "#555" },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: "#e2e2e8",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: { height: 8, backgroundColor: "#e33", borderRadius: 4 },
  statValue: { width: 32, textAlign: "right", fontSize: 12, fontWeight: "700" },
})