import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native"
import SearchIcon from "../icons/SearchIcon"
import { formatName } from "../../utils/formatName"
import { colors, fonts, pixelBorder } from "../../theme"

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
          pressed && styles.rowPressed,
        ]}
      >
        <Text style={[styles.rowNumber, active && styles.rowActiveText]}>
          #{String(id).padStart(4, "0")}
        </Text>
        <Text style={[styles.rowName, active && styles.rowActiveText]}>
          {formatName(item.name)}
        </Text>
        <Text style={[styles.rowArrow, active && styles.rowActiveText]}>▶</Text>
      </Pressable>
    )
  }
  return (
    <View style={styles.wrap}>

<FlatList
      ref={listRef}
      data={list}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      ListHeaderComponent={
        <>
          {header}
          <View style={styles.dirHeader}>
            <Text style={styles.dirKicker}>DIRECTIORIO</Text>
            <Text style={styles.dirTitle}>POKÉMONES REGISTRADOS</Text>
          </View>
          <View style={styles.searchBox}>
            <SearchIcon size={16} color={colors.ink} />
            <TextInput
              value={listQuery}
              onChangeText={onListQueryChange}
              placeholder="Filter list..."
              placeholderTextColor={colors.gray}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        </>
      }
      ListEmptyComponent={<Text style={styles.empty}>NO SE ENCONTRO EL POKÉMON.</Text>}
      contentContainerStyle={styles.content}
      initialNumToRender={20}
      windowSize={10}
      removeClippedSubviews
    />
    </View>
  )
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 40 },

  dirHeader: { marginTop: 8, marginBottom: 10 },
  dirKicker: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.gray,
    letterSpacing: 2,
  },
  dirTitle: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.ink,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.paper,
    paddingHorizontal: 10,
    marginBottom: 12,
    ...pixelBorder,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 6,
    backgroundColor: colors.paper,
    ...pixelBorder,
  },
  rowActive: {
    backgroundColor: colors.red,
  },
  rowPressed: {
    backgroundColor: colors.panel,
  },
  rowNumber: {
    width: 66,
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.gray,
  },
  rowName: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.ink,
  },
  rowArrow: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.gray,
  },
  rowActiveText: { color: colors.paper },

  empty: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
    marginTop: 24,
    letterSpacing: 1,
  },
}
)