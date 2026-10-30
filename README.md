#  Pokédex 8-bit

> Una Pokédex móvil con estética retro de 8 bits, construida con React Native + Expo
> y alimentada por [PokéAPI](https://pokeapi.co/).

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.7x-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo-SDK%20latest-000020?style=flat-square&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/PokéAPI-v2-E3350D?style=flat-square" />
  <img src="https://img.shields.io/badge/style-8--bit-F8C800?style=flat-square" />
</p>

---

##  Descripción

**Pokédex 8-bit** es una aplicación móvil que permite explorar la Pokédex
nacional completa, buscar Pokémon por nombre o número, y consultar su
información detallada (tipos, altura, peso, habilidades y estadísticas base).

El diseño está inspirado en la **Pokédex clásica de Game Boy** y en la
**"Pokedex Data Page v21.1"** de Pokémon Essentials: bordes gruesos, sombras
duras, tipografía pixelada y una interfaz totalmente en inglés, como si
estuvieras usando una consola de los 90.

---

##  Características

-  **Búsqueda por nombre o ID** de cualquier Pokémon.
-  **Directorio completo** con los 1302+ Pokémon registrados en la API.
-  **Interfaz retro 8-bit** con tipografía *Pixelify Sans* y paleta Game Boy.
-  **Tarjeta destacada** del Pokémon seleccionado con artwork oficial.
-  **Pantalla de detalle** con stats en barras segmentadas y badges de tipo
  con colores característicos.
-  **Filtro local** instantáneo sobre la lista completa.
-  **Navegación por stack** con React Navigation.

---

##  Stack tecnológico

| Capa             | Tecnología                                     |
| ---------------- | ---------------------------------------------- |
| Framework        | React Native + Expo                            |
| Navegación       | `@react-navigation/native-stack`               |
| Estilos          | `StyleSheet` nativo + tema centralizado        |
| Íconos           | `react-native-svg` (solo para Search / Arrow)  |
| Tipografía       | `@expo-google-fonts/pixelify-sans` + `expo-font` |
| Safe area        | `react-native-safe-area-context`               |
| Datos            | [PokéAPI v2](https://pokeapi.co/)              |

> **Filosofía:** cero librerías de UI. Todos los componentes visuales se
> construyen con primitivas de React Native (`View`, `Text`, `Pressable`,
> `Image`, `FlatList`).

---

##  Requisitos

- Node.js 18+
- `npm` o `yarn`
- Expo Go (en el dispositivo) o un emulador iOS/Android configurado
- Conexión a internet (para consumir la PokéAPI)

---

## 🛠️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/pokedex-8bit.git
cd pokedex-8bit

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npx expo start
Luego escaneá el QR con Expo Go o presioná a (Android) / i (iOS)
para abrir el emulador.

Scripts útiles
bash
npx expo start          # inicia el bundler
npx expo start -c       # inicia limpiando cache (útil si cambiás fuentes)
npx expo run:android    # build nativo Android
npx expo run:ios        # build nativo iOS

Estructura del proyecto
text
pokedex-8bit/
├── App.js                          # Entry point: carga fuentes + navegación
├── src/
│   ├── utils/
│   │   ├── formatName.js           # Capitaliza nombres con guiones
│   │   └── theme.js                # Colores, fuentes, bordes y sombras
│   ├── services/
│   │   └── pokemonService.js       # Cliente de PokéAPI
│   ├── components/
│   │   ├── Pokedex.jsx             # Pantalla principal (orquesta hijos)
│   │   ├── PokedexComponents/
│   │   │   ├── Hero.jsx            # Header + buscador
│   │   │   ├── FeaturedPokemon.jsx # Tarjeta del Pokémon activo
│   │   │   └── PokemonDirectory.jsx# Lista completa + filtro
│   │   ├── PokeDetails.jsx         # Pantalla de detalle
│   │   └── icons/
│   │       ├── SearchIcon.jsx
│   │       └── ArrowIcon.jsx
│   ├── navigation/
│   │   └── PokedexStack.js         # Stack navigator
│   └── screens/
│       ├── PokedexScreen.js        # Wrapper navegación → Pokedex
│       └── PokeDetailsScreen.js    # Wrapper navegación → PokeDetails
└── AGENTS.md                       # Guía de convenciones del proyecto

```
## Diseño 8-bit — decisiones clave
La estética retro no es casual: cada decisión visual está pensada para
evocar las pantallas de Game Boy y Pokémon Essentials.

Elemento	Implementación
Bordes	borderWidth: 3 + borderColor: #1A1A1A, sin borderRadius
Sombras	Duras (shadowOpacity: 1, shadowRadius: 0, offset 4×4)
Botones	Se "hunden" al presionarse (translate 3px, sin sombra)
Paneles	Franja de cabecera negra + cuerpo claro (#E8E0C8)
Stats	15 bloques rellenos proporcionalmente (no barra continua)
Fuente	Pixelify Sans 400/700 (vía expo-font)
Pokéball	Dibujada con 4 View anidadas (sin SVG)
Filas activas	Fondo rojo invertido (estilo cursor de menú)
Toda la paleta y helpers de estilo viven en src/utils/theme.js:

js
export const colors = {
  bg: "#F8F4E8", panel: "#E8E0C8", ink: "#1A1A1A",
  red: "#E3350D", yellow: "#F8C800", /* ... */
}
export const pixelBorder = { borderWidth: 3, borderColor: colors.ink }
export const pixelShadow = { /* sombra dura */ }

## API
El proyecto consume PokéAPI v2 — pública,
gratuita y sin API key.

## Endpoints usados
Endpoint	Propósito
GET /pokemon?limit=1302	Lista completa de Pokémon
GET /pokemon/{name|id}	Detalle de un Pokémon específico
El ?limit=1302 es necesario porque /pokemon pagina por defecto a 20
items. 1302 es el count actual de la API. Ver AGENTS.md §5 para
alternativas más robustas si la API crece.

Toda la lógica de fetch está aislada en src/services/pokemonService.js.

## Navegación
text
NavigationContainer
└── PokedexStack (headerShown: false)
    ├── "Pokedex"     → PokedexScreen    → Pokedex.jsx
    └── "PokeDetails" → PokeDetailsScreen → PokeDetails.jsx
El Pokémon seleccionado viaja como param de navegación (no se
refetchea).

Los componentes Pokedex y PokeDetails son puros: no importan
nada de @react-navigation. La navegación se delega a los screens
mediante callbacks (onShowDetails, onBack).

## Contribuir
Antes de tocar código, leer AGENTS.md. Ahí están:

Convenciones estrictas de import/export (fuente #1 de bugs).

Reglas visuales 8-bit obligatorias.

Reglas de arquitectura (servicios centralizados, componentes puros).

Dudas frecuentes y su resolución.

## Principios rápidos:

 No agregar librerías de UI.

 No usar borderRadius ni sombras difuminadas.

 Toda la UI en inglés, en mayúsculas para secciones.

 Un solo punto de fetch: services/pokemonService.js.

 Todos los colores/fuentes nuevos van a utils/theme.js.

## Licencia

Pokémon y todos los nombres relacionados son marcas registradas de
Nintendo / Game Freak / Creatures Inc. Este proyecto es solo con fines
educativos y no está afiliado a ninguna de estas compañías.

<p align="center"> Hecho con ❤️ y muchos <code>borderWidth: 3</code>. </p>
