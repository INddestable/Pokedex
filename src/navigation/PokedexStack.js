import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PokeDetailsScreen } from '../screens/PokeDetailsScreen';
import { PokedexScreen } from '../screens/PokedexScreen';

const Stack = createNativeStackNavigator();
export const PokedexStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options ={{ headerShown: false, title:"National Pokedex"
        }}
      />
      <Stack.Screen
        name="PokeDetails"
        component={PokeDetailsScreen}
        options={{ headerShown: false, title: "Pokemon Details", headerBackTitle: "Back", headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}
