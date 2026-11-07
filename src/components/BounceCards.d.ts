import type { CSSProperties, ReactElement } from 'react'

export type BounceCardImage = string | {
  src: string
  alt?: string
}

export type BounceCardsProps = {
  images?: BounceCardImage[]
  className?: string
  style?: CSSProperties
  containerWidth?: number
  containerHeight?: number
  cardSize?: number
  spread?: number
  rotation?: number
  arc?: number
  animationDelay?: number
  animationStagger?: number
  bounciness?: number
  enableHover?: boolean
  pushDistance?: number
  hoverScale?: number
  borderWidth?: number
  borderColor?: string
  radius?: number
  shadow?: boolean
  transformStyles?: string[]
  onCardClick?: (index: number) => void
}

declare function BounceCards(props: BounceCardsProps): ReactElement

export default BounceCards
