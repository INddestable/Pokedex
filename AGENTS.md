# AGENTS.md

> Guía para agentes (humanos o IA) que trabajen sobre este proyecto.
> Léela completa antes de tocar código.

---

## 1. Descripción del proyecto

Pokédex móvil hecha con **React Native + Expo**. Consume la PokéAPI pública
y muestra:
- Un listado completo (1302+ Pokémon) con buscador local.
- Una tarjeta destacada del Pokémon "seleccionado".
- Una pantalla de detalle con información base, habilidades y estadísticas.

La estética es **retro 8-bit**, inspirada en la Pokédex clásica de Game Boy
y en la **"Pokedex Data Page v21.1"** de Pokémon Essentials.
**Toda la UI está en inglés.**

---

## 2. Stack y restricciones

**Instalado:**
- `expo` + `react-native`
- `@react-navigation/native` + `@react-navigation/native-stack`
- `react-native-safe-area-context`
- `react-native-svg` (solo para íconos)
- `expo-font` + `@expo-google-fonts/pixelify-sans`

**Regla crítica:** **no agregar librerías externas** salvo justificación
explícita. La idea es mantener el proyecto lo más liviano posible.
Cualquier librería de UI (botones, grids, iconos extra) está **prohibida** —
todo se construye con primitivas de RN (`View`, `Text`, `Pressable`, etc.).

---

## 3. Estructura de carpetas
src/
├── utils/
│ └── formatName.js # helper puro
├── services/
│ └── pokemonService.js # ÚNICO punto con fetch a PokéAPI
├── components/
│ ├── Pokedex.jsx # orquesta Hero + Featured + Directory
│ ├── PokedexComponents/
│ │ ├── Hero.jsx
│ │ ├── FeaturedPokemon.jsx
│ │ └── PokemonDirectory.jsx
│ ├── PokeDetails.jsx # pantalla de detalle
│ └── icons/
│ ├── SearchIcon.jsx
│ └── ArrowIcon.jsx
├── navigation/
│ └── PokedexStack.js
├── screens/
│ ├── PokedexScreen.js
│ └── PokeDetailsScreen.js
└── screens/
  └── index.js # colores, fuentes, bordes, sombras, TYPE_COLORS

App.js # raíz: carga fuentes + NavigationContainer

text

---

## 4. Convenciones de import/export ⚠️

**Este fue el origen de varios bugs. Respetar estrictamente:**

| Tipo de archivo | Export | Import |
|---|---|---|
| Componentes (`components/`) | `export default function X` | `import X from "..."` |
| Screens (`screens/`) | `export default function X` | `import X from "..."` |
| Navigation | `export const X = () => ...` | `import { X } from "..."` |
| Servicios (`services/`) | `export async function X` | `import { X } from "..."` |
| Utils (`utils/`) | `export const X` / `export function X` | `import { X } from "..."` |

**Nunca mezclar** default y named en el mismo tipo de archivo.
Si un archivo tiene `export default function Foo`, entonces:
- ✅ `import Foo from "./Foo"`
- ❌ `import { Foo } from "./Foo"` → `Foo === undefined`

**Síntoma típico de este bug** (aparece en React Navigation):
ERROR [Error: Couldn't find a 'component', 'getComponent' or 'children'
prop for the screen 'Pokedex'. ...]

text

Significa que el `component={...}` del `<Stack.Screen>` llegó como `undefined`.
Diagnóstico rápido: `console.log(X)` antes del `return` del stack. Si imprime
`undefined`, es el import/export.

**Otra causa posible del mismo error:** errores de sintaxis previos en el
archivo importado (mirar la consola arriba del error de navegación), o
archivos duplicados con extensión distinta (`.js` + `.jsx` en la misma
carpeta — Metro prioriza uno y puede tomar el equivocado).

---

## 5. Capa de servicios

`src/services/pokemonService.js` es el **único** módulo que conoce `fetch`
y la URL base. Los componentes no hacen fetch directo.

```js
const API_URL = "https://pokeapi.co/api/v2"

export async function fetchPokemonList() { ... }   // lista completa
export async function fetchPokemon(nameOrId) { ... } // un Pokémon
¿Por qué ?limit=1302?
El endpoint /pokemon de PokéAPI es paginado por defecto a 20 items.
Sin query string, fetch("/pokemon") devuelve solo los primeros 20.
La respuesta incluye count: 1302 (total actual de la API). Por eso se
pide explícitamente ?limit=1302 para traer todo en una sola request.

Contras: es un número hardcodeado; si la API crece (ej. gen 10), hay
que actualizarlo a mano.

Alternativas robustas (si se necesita):

Hacer primero un ?limit=1, leer count, y pedir ?limit=count (2 requests).

Usar ?limit=100000 (la API lo acepta y devuelve todo en 1 request).

Paginar en la UI (infinite scroll) — ideal si la lista crece mucho.

Actualmente se usa la opción limit=1302 — no cambiar sin motivo.

6. Navegación
Stack definido en src/navigation/PokedexStack.js con headerShown: false
(cada pantalla renderiza su propia cabecera visual).

Pantallas: Pokedex (lista) y PokeDetails (detalle).

Regla de arquitectura: los componentes Pokedex.jsx y PokeDetails.jsx
son puros: NO importan nada de @react-navigation. Reciben callbacks
(onShowDetails, onBack) desde los screens, y son los screens quienes
ejecutan navigation.navigate / navigation.goBack.

El Pokémon seleccionado viaja como param de navegación
(navigation.navigate("PokeDetails", { pokemon })), NO se refetchea en
el detalle.

7. Props: destructurar siempre
PokeDetails recibe { pokemon, onBack }. Siempre destructurar en la firma:

jsx
export const PokeDetails = ({ pokemon, onBack }) => { ... }   // ✅
export const PokeDetails = () => { pokemon.sprites... }        // ❌ crash
Si una prop no se destructura, el componente la recibe pero la ignora, y
cualquier acceso a pokemon.x da Cannot read property 'x' of undefined.

8. Estilo visual — 8-bit retro
Filosofía
Todo debe verse como una consola de 8 bits, no como una app moderna.
No hay gradientes, no hay bordes redondeados, no hay blur. Todo es bloque
y borde duro.

Reglas obligatorias
Sin borderRadius (o borderRadius: 0).

Bordes gruesos negros: borderWidth: 3, borderColor: colors.ink.

Sombras duras (sin difuminado):

js
shadowOffset: { width: 4, height: 4 },
shadowOpacity: 1,
shadowRadius: 0,
elevation: 4,
shadowColor: colors.ink,
Efecto "hundido" en botones al presionar:

js
transform: [{ translateX: 3 }, { translateY: 3 }],
shadowOffset: { width: 0, height: 0 },
elevation: 0,
Paneles con franja de cabecera negra (#1A1A1A) + texto blanco en
mayúsculas con letterSpacing. Cuerpo del panel en tono claro (#E8E0C8).

Textos de sección en mayúsculas con letterSpacing: 1–2.

Barras de stats segmentadas en bloques (TOTAL_BLOCKS = 15), no
barras continuas ni width: %. Cada bloque se pinta o no según el valor.

Botones con Pressable (no TouchableOpacity), usando la firma
style={({ pressed }) => [...]} para combinar estilos.

Fuente
Usar Pixelify Sans: fonts.regular (PixelifySans_400Regular) y
fonts.bold (PixelifySans_700Bold).

⚠️ No usar fontWeight: "bold" con fuentes custom: RN no resuelve
pesos. Para negrita, cambiar directamente fontFamily a fonts.bold.

Fuente cargada en App.js con useFonts. Mientras no cargue,
return null (evita flash de fuente por default).

Paleta
Definida en src/theme/index.js como colors:

Fondos: bg: "#F8F4E8", panel: "#E8E0C8", paper: "#FFFFFF"

Tinta: ink: "#1A1A1A"

Acentos: red: "#E3350D" (Pokédex), yellow: "#F8C800", green: "#4C9A2A"

TYPE_COLORS: mapa de colores por tipo Pokémon (fire, water, etc.)

Tema centralizado
src/theme/index.js exporta:

colors, fonts

pixelBorder (objeto spread con borderWidth: 3, borderColor: ink)

pixelShadow (objeto spread con sombra dura)

TYPE_COLORS

Siempre importar de acá, no hardcodear valores. Ejemplo de uso:

js
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    ...pixelBorder,
    ...pixelShadow,
  },
})
Detalle específico: Pokéball dibujada con Views
Hero.jsx dibuja la Pokéball con 4 View anidadas (top rojo, bottom
blanco, banda negra, centro con borde). No se usa SVG para esto —
se prefiere primitivas nativas para mantener el peso bajo.

UI en inglés
Toda la interfaz (labels, botones, placeholders, mensajes de error) debe
estar en inglés. formatName() solo capitaliza nombres con guiones,
NO traduce. Tabla de traducciones ya aplicadas:
Pokédex nacional → National Pokédex, Buscar → SEARCH,
Todos los Pokémon → ALL POKÉMON, etc.

9. Dudas frecuentes (resueltas)
¿Por qué el fetch termina en ?limit=1302?
Porque /pokemon pagina a 20 items por defecto. 1302 es el count
actual de la API. Ver sección 5 para alternativas.

¿Puedo usar import { X } para un componente?
Solo si el archivo exporta X como named. Los componentes usan
export default, así que deben importarse sin llaves. Ver sección 4.

¿Por qué React Navigation dice "Couldn't find a 'component'"?
Casi siempre: import/export mal enlazado, o el módulo del screen lanzó
una excepción al evaluarse (mirar logs arriba del error). Ver sección 4.

¿Cómo migro HTML a RN?
<div>/<section>/<main> → <View>; <span>/<p>/<h1> → <Text>;
<button> → <Pressable>; <input> → <TextInput>;
<img> → <Image source={{ uri }}>; <svg> → react-native-svg;
className + CSS → StyleSheet.create + style;
window.scrollTo → FlatList.scrollToOffset o ScrollView.scrollTo.

¿Por qué una prop llega undefined dentro del componente?
O no se destructuró en la firma (sección 7), o el nombre del import no
coincide con el export (sección 4).

¿Cómo mantengo el look 8-bit sin librerías de UI?
Con las 8 reglas de la sección 8. Tema centralizado + primitivas de RN
alcanzan. No instalar librerías de botones ni grids.

10. Reglas para agentes
No agregar dependencias sin justificación (sección 2).

Respetar la regla de import/export (sección 4) — es la fuente #1
de bugs en este repo.

Todo estilo nuevo va a index.js si es un valor reutilizable
(color, fuente, sombra, borde). No hardcodear.

No romper la pureza de Pokedex y PokeDetails: no importar
@react-navigation dentro de components/.

No tocar services/pokemonService.js sin avisar: es el contrato
con la PokéAPI.

Toda la UI en inglés, textos de sección en MAYÚSCULAS.

Nunca borderRadius > 0, nunca sombras difuminadas — rompe la
estética 8-bit.

Preferir FlatList para listas largas (la lista principal tiene
1302+ items; .map() sobre un ScrollView mata la performance).

Ante la duda, leer este archivo primero antes de improvisar.

text

---

Listo. El archivo está pensado para que cualquier agente (o vos mismo en 3 meses) pueda retomar el proyecto sin repetir los bugs de import/export, sin romper la estética 8-bit y sin meter librerías que no corresponden. Si querés, puedo agregar una sección final con **checklist de PR** o **comandos útiles** (`npx expo start`, limpiar cache con `npx expo start -c`, etc.).