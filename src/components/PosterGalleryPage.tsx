import { useRef, useState } from 'react'
import CircularCarousel from './CircularCarousel'
import Magnet from './Magnet'
import { posterItems } from '../data/posters'

type PosterGalleryPageProps = {
  initialIndex?: number
  onOpenPosterImage: (index: number) => void
}

function PosterGalleryPage({ initialIndex = 0, onOpenPosterImage }: PosterGalleryPageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [activePosterIndex, setActivePosterIndex] = useState(initialIndex)

  const centerPosterStage = () => {
    const stage = stageRef.current
    if (!stage) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    stage.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  const rotatePosterCarousel = (direction: 'previous' | 'next') => {
    const carousel = stageRef.current?.querySelector<HTMLElement>('.circular-carousel')
    if (!carousel) return

    carousel.focus({ preventScroll: true })
    carousel.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: direction === 'previous' ? 'ArrowLeft' : 'ArrowRight',
        bubbles: true,
        cancelable: true,
      }),
    )
  }

  return (
    <section className="poster-gallery-page" aria-labelledby="detail-title">
      <header className="poster-gallery-page__header">
        <div>
          <p className="poster-gallery-page__eyebrow">POSTER ARCHIVE · 海报视觉档案</p>
          <h2 id="detail-title">海报预览</h2>
          <p className="poster-gallery-page__lead">
            以 IP、电商与商品视觉为线索，收录不同项目在画面上留下的第一印象。
          </p>
        </div>

        <div className="poster-gallery-page__guide" aria-hidden="true">
          <span>05 POSTERS · DRAG OR USE ARROWS</span>
          <span>两侧按钮 · 拖动切换</span>
        </div>
      </header>

      <div
        className="poster-gallery-page__stage"
        id="poster-gallery-carousel"
        ref={stageRef}
        onPointerEnter={centerPosterStage}
        onFocusCapture={centerPosterStage}
      >
        <div className="poster-gallery-page__halo" aria-hidden="true" />
        <CircularCarousel
          className="poster-circular-carousel"
          items={posterItems}
          preset="cylinder"
          intro="none"
          cardWidth={268}
          aspectRatio={3 / 4}
          gap={58}
          curve={0}
          autoplay="drift"
          speed={4}
          draggable
          momentum={0.65}
          snap
          pauseOnHover
          focusOnClick
          parallax={0.12}
          depthFade={0.58}
          fadeColor="#070a08"
          innerShade={0.34}
          cornerRadius={24}
          captions
          initialIndex={initialIndex}
          onChange={setActivePosterIndex}
          onItemClick={(_, index) => {
            if (index === activePosterIndex) onOpenPosterImage(index)
          }}
        />
        <nav className="poster-gallery-nav" aria-label="海报轮播控制">
          <Magnet
            wrapperClassName="poster-gallery-nav__magnet"
            padding={38}
            magnetStrength={8}
            maxOffset={5}
            tilt={0}
            scale={1.04}
          >
            <button
              type="button"
              className="poster-gallery-nav__button poster-gallery-nav__button--previous"
              aria-label="上一张海报"
              aria-controls="poster-gallery-carousel"
              onClick={() => rotatePosterCarousel('previous')}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 5.5 8 12l6.5 6.5" />
              </svg>
            </button>
          </Magnet>
          <Magnet
            wrapperClassName="poster-gallery-nav__magnet"
            padding={38}
            magnetStrength={8}
            maxOffset={5}
            tilt={0}
            scale={1.04}
          >
            <button
              type="button"
              className="poster-gallery-nav__button poster-gallery-nav__button--next"
              aria-label="下一张海报"
              aria-controls="poster-gallery-carousel"
              onClick={() => rotatePosterCarousel('next')}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
              </svg>
            </button>
          </Magnet>
        </nav>
      </div>

      <footer className="poster-gallery-page__footer" aria-hidden="true">
        <span>SELECTED POSTER STUDIES</span>
        <span>唐俊贤 · AIGC VISUAL WORKS</span>
      </footer>
    </section>
  )
}

export default PosterGalleryPage
