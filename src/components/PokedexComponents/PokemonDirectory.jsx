import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native"
import SearchIcon from "../icons/SearchIcon"
import { formatName } from "../../utils/formatName"

export default function PokemonDirectory({
  list, listQuery, onListQueryChange, activeId, onSelect, listRef, header,
}) {
const renderItem = ({ item }) => {
    const id = Number(item.url.split("/").filter(Boolean).pop())
    const active = activeId === id
    return (
      <Pressable
        onPress={() => onSelect(item.name)}
        style={({ pressed }) => [
          styles.row,
          active && styles.rowActive,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.rowNumber}>#{String(id).padStart(4, "0")}</Text>
        <Text style={styles.rowName}>{formatName(item.name)}</Text>
        <Text style={styles.rowArrow}>→</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Directorio</Text>
          <Text style={styles.title}>Todos los Pokémon</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <SearchIcon size={16} color="#888" />
        <TextInput
          value={listQuery}
          onChangeText={onListQueryChange}
          placeholder="Filtrar la lista"
          placeholderTextColor="#999"
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

    <FlatList
      ref={listRef}
      data={list}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      ListHeaderComponent={
        <>
          {header}
          <View style={styles.listHeader}>
            <Text style={styles.kicker}>Directorio</Text>
            <Text style={styles.title}>Todos los Pokémon</Text>
          </View>
          <View style={styles.searchBox}>
            <SearchIcon size={16} color="#888" />
            <TextInput
              value={listQuery}
              onChangeText={onListQueryChange}
              placeholder="Filtrar la lista"
              placeholderTextColor="#999"
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        </>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>No hay Pokémon que coincidan.</Text>
      }
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      initialNumToRender={20}
      windowSize={10}
      removeClippedSubviews
    />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 20 },
  header: { marginBottom: 12 },
  kicker: { fontSize: 11, color: "#888", letterSpacing: 1.5 },
  title: { fontSize: 20, fontWeight: "800" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f4",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    gap: 6,
  },
  input: { flex: 1, paddingVertical: 8, fontSize: 13 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    gap: 12,
  },
  rowActive: { backgroundColor: "#fff3f3" },
  rowNumber: { width: 60, color: "#aaa", fontSize: 12, fontWeight: "600" },
  rowName: { flex: 1, fontSize: 15, fontWeight: "600" },
  rowArrow: { color: "#999" },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
})