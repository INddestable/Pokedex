import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ArrowIcon from "./icons/ArrowIcon"
import { formatName } from "../utils/formatName"
import {
  colors, fonts, pixelBorder, pixelShadow, TYPE_COLORS,
} from "../theme"

const TOTAL_BLOCKS = 15
const MAX_STAT = 180

export default function PokeDetails({ pokemon, onBack }) {
const image =
    pokemon.sprites.other["official-artwork"].front_default ?? null

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && styles.iconBtnPressed,
            ]}
            accessibilityLabel="Back to Pokédex"
          >
            <ArrowIcon size={20} color={colors.ink} />
          </Pressable>
          <Text style={styles.eyebrow}>NATIONAL POKÉDEX</Text>
          <Text style={styles.headerNumber}>
            #{String(pokemon.id).padStart(4, "0")}
          </Text>
        </View>

        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>SELECTED POKÉMON</Text>
            <Text style={styles.title} numberOfLines={2}>
              {formatName(pokemon.name)}
            </Text>
            <View style={styles.typeRow}>
              {pokemon.types.map(({ type }) => (
                <View
                  key={type.name}
                  style={[
                    styles.typePill,
                    { backgroundColor: TYPE_COLORS[type.name] ?? colors.gray },
                  ]}
                >
                  <Text style={styles.typeText}>{type.name.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.imageWrap}>
            {image && (
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>BASE INFO</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>CHARACTERISTICS</Text>
            <View style={styles.measureGrid}>
              <View style={styles.measure}>
                <Text style={styles.measureValue}>{pokemon.height / 10} m</Text>
                <Text style={styles.measureLabel}>HEIGHT</Text>
              </View>
              <View style={styles.measure}>
                <Text style={styles.measureValue}>{pokemon.weight / 10} kg</Text>
                <Text style={styles.measureLabel}>WEIGHT</Text>
              </View>
              <View style={styles.measure}>
                <Text style={styles.measureValue}>{pokemon.base_experience}</Text>
                <Text style={styles.measureLabel}>BASE EXP</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.measureLabel}>ABILITIES</Text>
            <Text style={styles.abilitiesText}>
              {pokemon.abilities
                .map(
                  ({ ability, is_hidden }) =>
                    `${formatName(ability.name)}${is_hidden ? " (hidden)" : ""}`
                )
                .join(" · ")}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>PERFORMANCE</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>BASE STATS</Text>
            <View style={styles.stats}>
              {pokemon.stats.map(({ base_stat, stat }) => {
                const filled = Math.round(
                  (base_stat / MAX_STAT) * TOTAL_BLOCKS
                )
                return (
                  <View key={stat.name} style={styles.statRow}>
                    <Text style={styles.statName}>
                      {formatName(stat.name).toUpperCase()}
                    </Text>
                    <View style={styles.blocks}>
                      {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.block,
                            i < filled
                              ? styles.blockFilled
                              : styles.blockEmpty,
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={styles.statValue}>{base_stat}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 16, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconBtn: {
    padding: 6,
    backgroundColor: colors.paper,
    ...pixelBorder,
    ...pixelShadow,
  },
  iconBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  eyebrow: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.gray,
    letterSpacing: 2,
  },
  headerNumber: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.ink,
  },

  hero: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.panel,
    padding: 10,
    ...pixelBorder,
    ...pixelShadow,
  },
  kicker: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.gray,
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.ink,
    lineHeight: 28,
  },
  typeRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
    flexWrap: "wrap",
  },
  typePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    ...pixelBorder,
  },
  typeText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: colors.paper,
    letterSpacing: 1,
  },
  imageWrap: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: 110, height: 110 },

  card: {
    backgroundColor: colors.paper,
    marginBottom: 16,
    ...pixelBorder,
    ...pixelShadow,
  },
  cardHeader: {
    backgroundColor: colors.panelHeader,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 3,
    borderBottomColor: colors.ink,
  },
  cardHeaderText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.paper,
    letterSpacing: 2,
  },
  cardBody: {
    padding: 12,
    backgroundColor: colors.panel,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.ink,
    marginBottom: 10,
    letterSpacing: 1,
  },

  measureGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  measure: { flex: 1 },
  measureValue: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.ink,
  },
  measureLabel: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.gray,
    letterSpacing: 1,
    marginTop: 2,
  },

  divider: {
    height: 3,
    backgroundColor: colors.ink,
    marginVertical: 12,
  },
  abilitiesText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.ink,
    marginTop: 4,
    lineHeight: 18,
  },

  stats: { gap: 10 },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statName: {
    width: 92,
    fontFamily: fonts.bold,
    fontSize: 10,
    color: colors.ink,
    letterSpacing: 1,
  },
  blocks: {
    flex: 1,
    flexDirection: "row",
    gap: 2,
  },
  block: {
    flex: 1,
    height: 10,
    borderWidth: 1,
    borderColor: colors.ink,
  },
  blockFilled: { backgroundColor: colors.red },
  blockEmpty: { backgroundColor: colors.paper },
  statValue: {
    width: 30,
    textAlign: "right",
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.ink,
  },
})