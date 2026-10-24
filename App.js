import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
  useFonts,
  PixelifySans_400Regular,
  PixelifySans_700Bold,
} from "@expo-google-fonts/pixelify-sans"
import PokedexStack from './src/navigation/PokedexStack';
export default function App() {
  const [fontsLoaded] = useFonts({
    PixelifySans_400Regular,
    PixelifySans_700Bold,
  })

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#F8F4E8" />
      <NavigationContainer>
        <PokedexStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
