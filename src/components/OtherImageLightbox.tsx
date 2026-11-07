import { otherWorks } from '../data/otherWorks'
import Magnet from './Magnet'

type OtherImageLightboxProps = {
  index: number
  onClose: () => void
}

function OtherImageLightbox({ index, onClose }: OtherImageLightboxProps) {
  const safeIndex = otherWorks[index] ? index : 0
  const work = otherWorks[safeIndex]
  const workNumber = String(safeIndex + 1).padStart(2, '0')

  return (
    <div
      className="poster-lightbox other-image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
    >
      <h2 id="detail-title" className="sr-only">其他作品大图预览</h2>

      <Magnet
        wrapperClassName="poster-lightbox__close-wrap"
        padding={36}
        magnetStrength={8}
        maxOffset={5}
        tilt={0}
        scale={1.04}
      >
        <button
          type="button"
          className="poster-lightbox__close"
          onClick={onClose}
          aria-label="关闭作品大图"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </Magnet>

      <div className="poster-lightbox__frame">
        <img src={work.src} alt={work.alt} />
      </div>

      <div className="poster-lightbox__meta" aria-hidden="true">
        <span>{workNumber} / {String(otherWorks.length).padStart(2, '0')}</span>
        <span>{work.title}</span>
        <span>Other Works</span>
      </div>
    </div>
  )
}

export default OtherImageLightbox
