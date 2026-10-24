import { useNavigation } from "@react-navigation/native"
import Pokedex from "../components/Pokedex"

export default function PokedexScreen() {
  const navigation = useNavigation()
  return( 
    <Pokedex onShowDetails={(pokemon) =>
      navigation.navigate("PokeDetails", { pokemon })} />

  )
}