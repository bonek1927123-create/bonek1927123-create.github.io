import type { CSSProperties, ReactNode } from 'react'
import AnimatedContent from './AnimatedContent'

type RevealProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  trigger?: 'scroll' | 'mount'
  distance?: number
  duration?: number
  delay?: number
  blur?: number
  scale?: number
  stagger?: number
  threshold?: number
  direction?: 'vertical' | 'horizontal'
}

function Reveal({
  children,
  className = '',
  style,
  trigger = 'scroll',
  distance = 44,
  duration = 0.95,
  delay = 0,
  blur = 3,
  scale = 0.996,
  stagger = 0,
  threshold = 0.1,
  direction = 'vertical',
}: RevealProps) {
  const effectiveBlur = trigger === 'mount' ? Math.min(blur, 2.5) : 0

  return (
    <AnimatedContent
      className={'scroll-reveal ' + className}
      style={style}
      trigger={trigger}
      distance={distance}
      direction={direction}
      duration={duration}
      delay={delay}
      ease="power1.inOut"
      initialOpacity={0}
      scale={scale}
      blur={effectiveBlur}
      tilt={0.2}
      stagger={stagger}
      staggerFrom="start"
      threshold={threshold}
      once
    >
      {children}
    </AnimatedContent>
  )
}

export default Reveal