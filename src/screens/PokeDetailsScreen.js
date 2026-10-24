import { useNavigation, useRoute } from "@react-navigation/native"
import PokeDetails from "../components/PokeDetails"

export default function PokeDetailsScreen() {
  const navigation = useNavigation()
  const { params } = useRoute()
  return (
  <PokeDetails pokemon={params.pokemon} onBack={() => navigation.goBack()} />
  )
}
