import { useRef } from 'react'
import DriftWall, { type DriftWallItem } from './DriftWall'
import { otherWorks } from '../data/otherWorks'

const wallItems: DriftWallItem[] = Array.from({ length: 6 }, (_, index) => {
  const work = otherWorks[index % otherWorks.length]
  return { image: work.src, title: work.title }
})

type MoreGalleryPageProps = {
  onOpenOtherImage: (index: number) => void
}

function MoreGalleryPage({ onOpenOtherImage }: MoreGalleryPageProps) {
  const stageRef = useRef<HTMLDivElement>(null)

  const centerDriftWall = () => {
    const stage = stageRef.current
    if (!stage) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    stage.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  return (
    <section className="more-gallery-page" aria-labelledby="detail-title">
      <header className="more-gallery-page__header">
        <div>
          <p className="more-gallery-page__eyebrow">OTHER ARCHIVE · 其他作品档案</p>
          <h2 id="detail-title">其他预览</h2>
          <p className="more-gallery-page__lead">
            这里将收录实验影像、平面延展与尚未归类的视觉作品。
          </p>
        </div>
        <div className="more-gallery-page__guide" aria-hidden="true">
          <span>02 SELECTED PIECES</span>
          <span>视觉作品 · 持续更新</span>
        </div>
      </header>

      <div
        ref={stageRef}
        className="more-gallery-page__stage"
        onPointerEnter={centerDriftWall}
        onFocusCapture={centerDriftWall}
      >
        <DriftWall
          className="more-gallery-page__wall"
          items={wallItems}
          columns={5}
          tileWidth={230}
          tileHeight={310}
          gap={22}
          radius={22}
          tilt={14}
          turn={-10}
          perspective={1250}
          depth={110}
          speed={13}
          direction="up"
          variance={0.34}
          parallax={0.24}
          lift={46}
          fade={0.58}
          dim={0.62}
          overlayColor="#070a08"
          onItemClick={(item) => {
            const index = otherWorks.findIndex((work) => work.src === item.image)
            if (index >= 0) onOpenOtherImage(index)
          }}
        />
        <div className="more-gallery-page__veil" aria-hidden="true" />

      </div>

      <footer className="more-gallery-page__footer" aria-hidden="true">
        <span>OTHER VISUAL STUDIES</span>
        <span>唐俊贤 · AIGC VISUAL WORKS</span>
      </footer>
    </section>
  )
}

export default MoreGalleryPage
