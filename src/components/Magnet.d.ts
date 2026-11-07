import type { CSSProperties, ReactNode } from 'react'

export type MagnetSpring = {
  stiffness?: number
  damping?: number
  mass?: number
}

export type MagnetProps = {
  children: ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  maxOffset?: number
  exclusive?: boolean
  axis?: 'both' | 'x' | 'y'
  tilt?: number
  scale?: number
  spring?: MagnetSpring
  onActiveChange?: (active: boolean) => void
  wrapperClassName?: string
  innerClassName?: string
  style?: CSSProperties
}

declare function Magnet(props: MagnetProps): ReactNode

export default Magnet