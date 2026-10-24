import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PokeDetailsScreen from '../screens/PokeDetailsScreen';
import PokedexScreen from '../screens/PokedexScreen';

const Stack = createNativeStackNavigator();
export default function PokedexStack() {
  console.log("PokedexScreen:", PokedexScreen)
  console.log("PokeDetailsScreen:", PokeDetailsScreen)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
      />
      <Stack.Screen
        name="PokeDetails"
        component={PokeDetailsScreen}
      />
    </Stack.Navigator>
  )
}
