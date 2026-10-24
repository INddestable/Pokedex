import React from "react"
import Svg, { Circle, Path } from "react-native-svg"

export default function SearchIcon({ size = 20, color = "#111" }) {
 return (
    <>
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
      <Path d="m20 20-4-4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
    </>
  )
  
}
