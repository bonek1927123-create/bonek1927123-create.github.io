import type { MouseEvent } from 'react'
import Magnet from './Magnet'
import ParticleLabel from './ParticleLabel'
import Reveal from './Reveal'
import StarCard from './StarCard'
import type { Project } from '../data/site'

type PosterCardProps = {
  project: Project
  onOpen: () => void
}

function PosterCard({ project, onOpen }: PosterCardProps) {
  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('button, a')) return
    onOpen()
  }

  if (!project.coverImage) return null

  return (
    <Reveal className="poster-card-reveal" distance={44} duration={0.95} blur={2.5} scale={0.996}>
      <Magnet
        wrapperClassName="poster-card-magnet"
        innerClassName="poster-card-magnet__inner"
        padding={64}
        magnetStrength={22}
        maxOffset={12}
        tilt={0.8}
        scale={1.006}
        spring={{ stiffness: 160, damping: 22, mass: 1 }}
        style={{ display: 'block' }}
      >
        <StarCard className="poster-card-star" radius={28} glow={0.3} duration={9}>
          <article
            className="poster-card"
            onClick={handleCardClick}
            data-card-clickable="true"
          >
            <div className="poster-card__media">
              <img src={project.coverImage} alt={project.title + ' 海报预览'} loading="lazy" />
              <span className="poster-card__badge">KEY VISUAL</span>
            </div>
            <div className="poster-card__body">
              <div>
                <h3 className="poster-card__title">{project.title}</h3>
                <p className="poster-card__meta">Poster / {project.year}</p>
              </div>
              <button type="button" className="project-card__action" onClick={onOpen}>
                <ParticleLabel text="查看海报" highlightColor="#5c4828" />
              </button>
            </div>
          </article>
        </StarCard>
      </Magnet>
    </Reveal>
  )
}

export default PosterCard