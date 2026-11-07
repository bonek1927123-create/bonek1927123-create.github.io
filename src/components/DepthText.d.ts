import type { CSSProperties, ReactElement } from 'react'

export type DepthTextProps = {
  text?: string
  layers?: number
  depth?: number
  faceColor?: string
  depthColor?: string
  gradientDepth?: boolean
  tilt?: number
  pointerTracking?: boolean
  smoothing?: number
  trackingRadius?: number
  perspective?: number
  autoOrbit?: boolean
  orbitSpeed?: number
  hoverPush?: number
  float?: boolean
  fontSize?: string
  fontWeight?: number | string
  shadow?: boolean
  outline?: boolean
  intro?: boolean
  className?: string
  style?: CSSProperties
}

declare function DepthText(props: DepthTextProps): ReactElement

export default DepthText