import type { CSSProperties, ReactNode } from 'react'
import StarBorder from './StarBorder'

type StarCardProps = {
  children: ReactNode
  className?: string
  radius?: number
  glow?: number
  duration?: number
  style?: CSSProperties
}

function StarCard({
  children,
  className = '',
  radius = 24,
  glow = 0.36,
  duration = 7,
  style,
}: StarCardProps) {
  return (
    <StarBorder
      as="div"
      className={'star-card-frame ' + className}
      color="#e4c681"
      trailColor="#d9e8cd"
      duration={duration}
      direction="clockwise"
      stars={1}
      trailLength={0.17}
      thickness={1}
      radius={radius}
      glow={glow}
      hover="brighten"
      sparkle={false}
      clickPulse={false}
      theme="dark"
      backgroundColor="transparent"
      textColor="inherit"
      borderColor="rgba(237, 240, 232, 0.08)"
      style={style}
    >
      {children}
    </StarBorder>
  )
}

export default StarCard