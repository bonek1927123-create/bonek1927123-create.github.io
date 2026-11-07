import { useEffect } from 'react'
import { posterItems } from '../data/posters'
import Magnet from './Magnet'

type PosterImageLightboxProps = {
  index: number
  onNavigate: (index: number) => void
  onClose: () => void
}

function PosterImageLightbox({ index, onNavigate, onClose }: PosterImageLightboxProps) {
  const safeIndex = posterItems[index] ? index : 0
  const poster = posterItems[safeIndex]
  const posterNumber = String(safeIndex + 1).padStart(2, '0')

  const showPrevious = () => {
    onNavigate((safeIndex - 1 + posterItems.length) % posterItems.length)
  }

  const showNext = () => {
    onNavigate((safeIndex + 1) % posterItems.length)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        onNavigate((safeIndex - 1 + posterItems.length) % posterItems.length)
      }
      if (event.key === 'ArrowRight') {
        onNavigate((safeIndex + 1) % posterItems.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNavigate, safeIndex])

  return (
    <div
      className="poster-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
    >
      <h2 id="detail-title" className="sr-only">海报大图预览</h2>

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
          aria-label="关闭海报大图"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </Magnet>

      <Magnet
        wrapperClassName="poster-lightbox__nav-wrap poster-lightbox__nav-wrap--previous"
        padding={36}
        magnetStrength={8}
        maxOffset={5}
        tilt={0}
        scale={1.04}
      >
        <button
          type="button"
          className="poster-lightbox__nav"
          onClick={showPrevious}
          aria-label="上一张海报"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.5 5.5 8 12l6.5 6.5" />
          </svg>
        </button>
      </Magnet>

      <Magnet
        wrapperClassName="poster-lightbox__nav-wrap poster-lightbox__nav-wrap--next"
        padding={36}
        magnetStrength={8}
        maxOffset={5}
        tilt={0}
        scale={1.04}
      >
        <button
          type="button"
          className="poster-lightbox__nav"
          onClick={showNext}
          aria-label="下一张海报"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
          </svg>
        </button>
      </Magnet>
      <div className="poster-lightbox__frame">
        <img src={poster.src} alt={poster.alt ?? poster.title ?? '海报作品'} />
      </div>

      <div className="poster-lightbox__meta" aria-hidden="true">
        <span>{posterNumber} / {String(posterItems.length).padStart(2, '0')}</span>
        <span>{poster.title}</span>
        <span>{poster.subtitle}</span>
      </div>
    </div>
  )
}

export default PosterImageLightbox
