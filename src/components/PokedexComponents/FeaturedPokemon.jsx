import react from "react"
import { View, Text, Image, Pressable, StyleSheet } from "react-native"
import { formatName } from "../../utils/formatName"

export default function FeaturedPokemon({ pokemon, onShowDetails }) {
  const image =
    pokemon?.sprites.other["official-artwork"].front_default ?? null

  return (
    <View style={styles.wrap}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.kicker}>Selección actual</Text>
          <Text style={styles.name}>
            {pokemon ? formatName(pokemon.name) : "Cargando..."}
          </Text>
        </View>
        {pokemon && (
          <Text style={styles.number}>
            #{String(pokemon.id).padStart(4, "0")}
          </Text>
        )}
      </View>

      <Pressable
        onPress={onShowDetails}
        disabled={!pokemon}
        style={({ pressed }) => [styles.stage, pressed && { opacity: 0.85 }]}
        accessibilityLabel={
          pokemon ? `Ver detalles de ${pokemon.name}` : "Cargando"
        }
      >
        <View style={styles.circle} />
        {image && (
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        )}
        <View style={styles.viewDetail}>
          <Text style={styles.viewDetailText}>Ver ficha completa →</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, marginBottom: 24 },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  kicker: { fontSize: 11, color: "#888", letterSpacing: 1.5 },
  name: { fontSize: 22, fontWeight: "800" },
  number: { fontSize: 13, color: "#aaa", fontWeight: "600" },
  stage: {
    backgroundColor: "#f5f5f7",
    borderRadius: 20,
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#e8e8ec",
  },
  image: { width: 200, height: 200 },
  viewDetail: {
    position: "absolute",
    bottom: 14,
    right: 14,
    backgroundColor: "#111",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  viewDetailText: { color: "#fff", fontSize: 12, fontWeight: "600" },
})