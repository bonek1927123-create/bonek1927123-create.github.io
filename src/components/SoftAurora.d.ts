import type { CSSProperties, ReactElement } from 'react'

export type SoftAuroraProps = {
  color1?: string
  color2?: string
  spectrum?: number
  speed?: number
  colorSpeed?: number
  scale?: number
  brightness?: number
  noiseFrequency?: number
  noiseAmplitude?: number
  bandHeight?: number
  bandSpread?: number
  tilt?: number
  octaveDecay?: number
  layerOffset?: number
  enableMouseInteraction?: boolean
  mouseInfluence?: number
  clickPulse?: boolean
  intro?: boolean
  lightMode?: boolean
  opacity?: number
  className?: string
  style?: CSSProperties
}

declare function SoftAurora(props: SoftAuroraProps): ReactElement

export default SoftAurora