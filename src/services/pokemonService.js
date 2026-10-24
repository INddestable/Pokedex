const API_URL = "https://pokeapi.co/api/v2"

export async function fetchPokemonList() {
  const response = await fetch(`${API_URL}/pokemon?limit=1302`)
  if (!response.ok) throw new Error("The list could not be loaded")
  const data = await response.json()
  return data.results
}

export async function fetchPokemon(nameOrId) {
  const response = await fetch(
    `${API_URL}/pokemon/${String(nameOrId).trim().toLowerCase()}`
  )
  if (!response.ok) throw new Error("Pokémon not found")
  return response.json()
}