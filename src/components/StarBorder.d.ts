import type { CSSProperties, ElementType, ReactElement, ReactNode } from 'react'

export type StarBorderProps = {
  as?: ElementType
  children?: ReactNode
  color?: string
  trailColor?: string
  duration?: number
  direction?: 'clockwise' | 'counterclockwise'
  stars?: number
  trailLength?: number
  thickness?: number
  radius?: number
  glow?: number
  sparkle?: boolean
  hover?: 'lap' | 'brighten' | 'reveal' | 'none'
  clickPulse?: boolean
  theme?: 'dark' | 'light'
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  className?: string
  style?: CSSProperties
}

declare function StarBorder(props: StarBorderProps): ReactElement

export default StarBorder