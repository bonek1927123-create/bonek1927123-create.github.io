import DepthText from './DepthText'

export type DepthTitleSegment = {
  text: string
  tone?: 'ink' | 'sage' | 'gold'
}

type DepthTitleProps = {
  as?: 'h1' | 'h2' | 'h3'
  segments: DepthTitleSegment[]
  className?: string
  fontSize?: string
  fontWeight?: number
  layers?: number
  depth?: number
  tilt?: number
  hoverPush?: number
  orbitSpeed?: number
  tabIndex?: number
  id?: string
}

const faceColors = {
  ink: 'var(--title-ink)',
  sage: 'var(--title-sage)',
  gold: 'var(--title-gold)',
}

const depthColors = {
  ink: '#314137',
  sage: '#4d6652',
  gold: '#6f542b',
}

function DepthTitle({
  as: Tag = 'h1',
  segments,
  className = '',
  fontSize = 'var(--text-display)',
  fontWeight = 600,
  layers,
  depth,
  tilt,
  hoverPush = 0.22,
  orbitSpeed,
  tabIndex,
  id,
}: DepthTitleProps) {
  const resolvedLayers = layers ?? (Tag === 'h1' ? 28 : 20)
  const resolvedDepth = depth ?? (Tag === 'h1' ? 1.65 : 1.15)
  const resolvedTilt = tilt ?? (Tag === 'h1' ? 6.5 : 5.5)
  const resolvedOrbit = orbitSpeed ?? (Tag === 'h1' ? 0.18 : 0.15)

  return (
    <Tag
      id={id}
      className={'depth-title ' + className}
      tabIndex={tabIndex}
      aria-label={segments.map((segment) => segment.text).join('')}
    >
      {segments.map((segment, index) => (
        <DepthText
          key={segment.text + index}
          text={segment.text}
          layers={resolvedLayers}
          depth={resolvedDepth}
          faceColor={faceColors[segment.tone ?? 'ink']}
          depthColor={depthColors[segment.tone ?? 'ink']}
          gradientDepth={false}
          tilt={resolvedTilt}
          pointerTracking
          smoothing={0.12}
          trackingRadius={56}
          perspective={900}
          autoOrbit={false}
          orbitSpeed={resolvedOrbit}
          hoverPush={hoverPush}
          float={false}
          fontSize={fontSize}
          fontWeight={fontWeight}
          shadow
          outline={false}
          intro
        />
      ))}
    </Tag>
  )
}

export default DepthTitle