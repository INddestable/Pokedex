import react from "react"
import { View, Text, Image, Pressable, StyleSheet } from "react-native"
import { formatName } from "../../utils/formatName"
import { colors, fonts, pixelBorder, pixelShadow } from "../../theme"

export default function FeaturedPokemon({ pokemon, onShowDetails }) {
  const image =
    pokemon?.sprites.other["official-artwork"].front_default ?? null

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerLabel}>CURRENT SELECTION</Text>
          {pokemon && (
            <Text style={styles.headerNumber}>
              #{String(pokemon.id).padStart(4, "0")}
            </Text>
          )}
        </View>

        <View style={styles.stage}>
          <View style={styles.circle} />
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.name} numberOfLines={1}>
            {pokemon ? formatName(pokemon.name) : "LOADING..."}
          </Text>
          <Pressable
            onPress={onShowDetails}
            disabled={!pokemon}
            style={({ pressed }) => [
              styles.detailBtn,
              pressed && styles.detailBtnPressed,
              !pokemon && styles.detailBtnDisabled,
            ]}
          >
            <Text style={styles.detailBtnText}>VIEW DETAILS ▶</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 20 },

  card: {
    backgroundColor: colors.panel,
    ...pixelBorder,
    ...pixelShadow,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.panelHeader,
    borderBottomWidth: 3,
    borderBottomColor: colors.ink,
  },
  headerLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.paper,
    letterSpacing: 2,
  },
  headerNumber: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.yellow,
  },

  stage: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.paper,
    borderBottomWidth: 3,
    borderBottomColor: colors.ink,
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: colors.panel,
    borderWidth: 3,
    borderColor: colors.grayLight,
  },
  image: { width: 180, height: 180 },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    gap: 8,
  },
  name: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.ink,
  },
  detailBtn: {
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 6,
    ...pixelBorder,
    ...pixelShadow,
  },
  detailBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  detailBtnDisabled: { opacity: 0.4 },
  detailBtnText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.paper,
    letterSpacing: 1,
  },
})