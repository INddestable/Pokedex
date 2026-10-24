import { useEffect, useMemo, useRef, useState } from "react"
import { View, StyleSheet } from "react-native"
import Hero from "./PokedexComponents/Hero"
import FeaturedPokemon from "./PokedexComponents/FeaturedPokemon"
import PokemonDirectory from "./PokedexComponents/PokemonDirectory"
import { fetchPokemon, fetchPokemonList } from "../services/pokemonService"
import { colors } from "../theme"

export default function Pokedex({ onShowDetails }) {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [query, setQuery] = useState("")
  const [listQuery, setListQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const listRef = useRef(null)

  const loadPokemon = async (nameOrId) => {
    setLoading(true)
    setError("")
    try {
      const data = await fetchPokemon(nameOrId)
      setPokemon(data)
      setQuery("")
    } catch {
      setError("Pokémon not found. Check the name or ID.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Promise.all([fetchPokemonList(), fetchPokemon(25)])
      .then(([list, initialPokemon]) => {
        setPokemonList(list)
        setPokemon(initialPokemon)
      })
      .catch(() => setError("Could not connect to PokéAPI."))
      .finally(() => setLoading(false))
  }, [])

  const filteredList = useMemo(
    () =>
      pokemonList.filter((item) =>
        item.name.includes(listQuery.trim().toLowerCase())
      ),
    [pokemonList, listQuery]
  )

  const handleSearch = () => {
    if (query.trim()) loadPokemon(query)
  }

  const handleShowDetails = () => {
    if (!pokemon) return
    listRef.current?.scrollToOffset({ offset: 0, animated: true })
    onShowDetails(pokemon)
  }

  return (
    <View style={styles.container}>
      <PokemonDirectory
        list={filteredList}
        listQuery={listQuery}
        onListQueryChange={setListQuery}
        activeId={pokemon?.id}
        onSelect={loadPokemon}
        listRef={listRef}
        header={
          <>
            <Hero
              query={query}
              setQuery={setQuery}
              loading={loading}
              error={error}
              onSubmit={handleSearch}
            />
            <FeaturedPokemon
              pokemon={pokemon}
              onShowDetails={handleShowDetails}
            />
          </>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, marginTop: 60},
})