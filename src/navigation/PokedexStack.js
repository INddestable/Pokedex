import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PokeDetailsScreen from '../screens/PokeDetailsScreen';
import PokedexScreen from '../screens/PokedexScreen';

const Stack = createNativeStackNavigator();
export default function PokedexStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
