import type { CSSProperties, ReactElement } from 'react'

export type ParticleTextProps = {
  text?: string
  particleSize?: number
  density?: number
  color?: string
  highlightColor?: string
  highlightMode?: 'motion' | 'gradient'
  shape?: 'circle' | 'square' | 'line'
  intro?: 'gather' | 'rain' | 'spiral' | 'scan'
  scatter?: number
  gatherDuration?: number
  stagger?: number
  clickBurst?: boolean
  burstStrength?: number
  pointerRepel?: number
  repelRadius?: number
  idleDrift?: number
  trigger?: 'mount' | 'hover' | 'click'
  fontSize?: number | string
  fontWeight?: number | string
  fontFamily?: string
  glow?: boolean
  className?: string
  style?: CSSProperties
}

declare function ParticleText(props: ParticleTextProps): ReactElement

export default ParticleText