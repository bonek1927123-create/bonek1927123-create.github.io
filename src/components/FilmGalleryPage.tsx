import { useRef } from 'react'
import BounceCards from './BounceCards'
import { projects, type Project } from '../data/site'

type FilmGalleryPageProps = {
  onOpenProject: (project: Project) => void
}

const featuredProject = projects.find((project) => project.slug === 'the-killer-project')

const filmCards = [
  {
    src: '/images/the-killer-project-poster.jpg',
    alt: '我当杀手的那些事儿影视项目封面',
  },
  {
    src: '/images/film-card-placeholder.svg',
    alt: '影视作品占位二',
  },
  {
    src: '/images/film-card-placeholder.svg',
    alt: '影视作品占位三',
  },
  {
    src: '/images/film-card-placeholder.svg',
    alt: '影视作品占位四',
  },
  {
    src: '/images/film-card-placeholder.svg',
    alt: '影视作品占位五',
  },
]

function FilmGalleryPage({ onOpenProject }: FilmGalleryPageProps) {
  const cardsRef = useRef<HTMLDivElement>(null)

  const centerFilmCards = () => {
    const cards = cardsRef.current
    if (!cards) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    cards.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  const openCard = (index: number) => {
    if (index === 0 && featuredProject) onOpenProject(featuredProject)
  }

  return (
    <section className="film-gallery-page" aria-labelledby="detail-title">
      <header className="film-gallery-page__header">
        <div>
          <p className="film-gallery-page__eyebrow">MOVING IMAGE ARCHIVE · 影视作品档案</p>
          <h2 id="detail-title">影视预览</h2>
          <p className="film-gallery-page__lead">
            以影像作为入口，进入项目背后的叙事、制作流程与完整成片。
          </p>
        </div>

        <div className="film-gallery-page__guide" aria-hidden="true">
          <span>01 / 05 SELECTED</span>
          <span>悬停展开 · 点击首张查看项目</span>
        </div>
      </header>

      <div className="film-gallery-page__stage">
        <div className="film-gallery-page__stage-head" aria-hidden="true">
          <span>FEATURED FILM</span>
          <span>2026 · AIGC SHORT FILM</span>
        </div>

        <div
          ref={cardsRef}
          className="film-gallery-page__cards"
          onPointerEnter={centerFilmCards}
          onFocusCapture={centerFilmCards}
        >
          <div className="film-gallery-page__halo" aria-hidden="true" />
          <BounceCards
            className="film-bounce-cards"
            images={filmCards}
            containerWidth={860}
            containerHeight={500}
            cardSize={245}
            spread={122}
            rotation={8}
            arc={34}
            pushDistance={128}
            hoverScale={1.075}
            bounciness={0.66}
            animationDelay={0.24}
            animationStagger={0.09}
            borderWidth={3}
            borderColor="rgba(237, 240, 232, 0.16)"
            radius={26}
            shadow
            enableHover
            onCardClick={openCard}
          />
        </div>

        <p className="film-gallery-page__hint">
          <span>01</span>
          <span>我当杀手的那些事儿</span>
          <span>点击进入项目详情 ↗</span>
        </p>
      </div>

      <footer className="film-gallery-page__footer" aria-hidden="true">
        <span>SELECTED FILM STUDIES</span>
        <span>唐俊贤 · AIGC VISUAL WORKS</span>
      </footer>
    </section>
  )
}

export default FilmGalleryPage
