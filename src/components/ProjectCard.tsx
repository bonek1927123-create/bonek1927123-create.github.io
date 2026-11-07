import { useRef, type MouseEvent } from 'react'
import ParticleLabel from './ParticleLabel'
import ProjectMedia from './ProjectMedia'
import Magnet from './Magnet'
import Reveal from './Reveal'
import StarCard from './StarCard'
import type { Project } from '../data/site'

type ProjectCardProps = {
  project: Project
  shape: 'rounded' | 'square' | 'soft'
  layout?: 'wide' | 'standard' | 'tall'
  compact?: boolean
  onOpen?: () => void
}

function ProjectCard({
  project,
  shape,
  layout = 'standard',
  compact = false,
  onOpen,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const starRadius = shape === 'rounded' ? 38 : shape === 'soft' ? 24 : 0

  const centerProjectCard = () => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const targetTop =
      window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('button, a')) return
    onOpen?.()
  }

  return (
    <Reveal
      className={'project-card-reveal project-card-reveal--' + layout}
      distance={38}
      duration={0.95}
      blur={2.5}
      scale={0.996}
    >
      <Magnet
        wrapperClassName="project-card-magnet"
        innerClassName="project-card-magnet__inner"
        padding={64}
        magnetStrength={20}
        maxOffset={13}
        tilt={0.8}
        scale={1.006}
        spring={{ stiffness: 160, damping: 22, mass: 1 }}
        style={{ display: 'block' }}
      >
        <StarCard className="project-card-star" radius={starRadius} glow={0.32} duration={8}>
          <article
            ref={cardRef}
            onPointerEnter={centerProjectCard}
            onFocusCapture={centerProjectCard}
            className={
              'project-card project-card--' +
              shape +
              ' project-card--' +
              layout +
              (compact ? ' project-card--compact' : '')
            }
            onClick={handleCardClick}
            data-card-clickable="true"
          >
            <ProjectMedia project={project} />

            {compact ? (
              <div className="project-card__compact-action">
                <button type="button" className="project-card__action" onClick={onOpen}>
                  <ParticleLabel text="打开预览" highlightColor="#5c4828" />
                </button>
              </div>
            ) : (
              <div className="project-card__body">
                <p>{project.summary}</p>
                {project.productionCycle ? (
                  <p className="project-card__cycle">创作周期：{project.productionCycle}</p>
                ) : null}
                {project.software ? (
                  <p className="project-card__software">使用软件：{project.software}</p>
                ) : null}
                <div className="project-card__footer">
                  <span>{project.role}</span>
                  <button type="button" className="project-card__action" onClick={onOpen}>
                    <ParticleLabel text="查看项目详情" highlightColor="#5c4828" />
                  </button>
                </div>
              </div>
            )}
          </article>
        </StarCard>
      </Magnet>
    </Reveal>
  )
}

export default ProjectCard