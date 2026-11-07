import { useState } from 'react'
import ParticleText from './ParticleText'

type ParticleLabelProps = {
  text: string
  className?: string
  highlightColor?: string
  density?: number
  particleSize?: number
}

function ParticleLabel({
  text,
  className = '',
  highlightColor = '#e4c681',
  density = 3,
  particleSize = 1.25,
}: ParticleLabelProps) {
  const [active, setActive] = useState(false)

  return (
    <span
      className={'particle-label ' + className + (active ? ' is-active' : '')}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onPointerDown={() => setActive(true)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span className="particle-label__measure">{text}</span>
      <span className="particle-label__visual" aria-hidden="true">
        {active ? (
          <ParticleText
            className="particle-label__particles"
            text={text}
            particleSize={particleSize}
            density={density}
            color="currentColor"
            highlightColor={highlightColor}
            highlightMode="motion"
            shape="circle"
            intro="scan"
            scatter={32}
            gatherDuration={720}
            stagger={160}
            clickBurst
            burstStrength={0.8}
            pointerRepel={10}
            repelRadius={34}
            idleDrift={0}
            trigger="hover"
            fontSize="inherit"
            fontWeight={540}
            fontFamily="inherit"
            glow={false}
          />
        ) : null}
      </span>
    </span>
  )
}

export default ParticleLabel