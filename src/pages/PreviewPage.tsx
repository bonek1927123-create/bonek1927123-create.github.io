import { useEffect, useRef, useState } from 'react'
import DepthTitle from '../components/DepthTitle'
import Folder, { type FolderItem } from '../components/Folder'
import Reveal from '../components/Reveal'
import { posterItems } from '../data/posters'

type PreviewCardKind = 'poster' | 'film' | 'more'

type PreviewFolderCardProps = {
  label: string
  english: string
  kind: PreviewCardKind
  status?: string
}

function PreviewCardMotif({ kind }: { kind: PreviewCardKind }) {
  if (kind === 'poster') {
    return (
      <svg viewBox="0 0 180 120" aria-hidden="true">
        <rect x="38" y="20" width="63" height="82" rx="9" transform="rotate(-8 69.5 61)" />
        <rect x="76" y="14" width="63" height="86" rx="9" transform="rotate(7 107.5 57)" />
        <circle cx="106" cy="48" r="16" />
        <path d="M55 87h62M89 34v48" />
      </svg>
    )
  }

  if (kind === 'film') {
    return (
      <svg viewBox="0 0 180 120" aria-hidden="true">
        <rect x="24" y="31" width="132" height="58" rx="9" />
        <path d="m78 47 31 13-31 14V47Z" />
        <path d="M41 31v58M139 31v58" />
        <circle cx="41" cy="43" r="3" />
        <circle cx="41" cy="62" r="3" />
        <circle cx="41" cy="81" r="3" />
        <circle cx="139" cy="43" r="3" />
        <circle cx="139" cy="62" r="3" />
        <circle cx="139" cy="81" r="3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 180 120" aria-hidden="true">
      <circle cx="90" cy="60" r="35" />
      <circle cx="90" cy="60" r="18" />
      <path d="M90 13v94M43 60h94M57 27l66 66M123 27 57 93" />
      <circle cx="90" cy="60" r="4" />
    </svg>
  )
}

function PreviewFolderCard({ label, english, kind, status = '内容待补充' }: PreviewFolderCardProps) {
  return (
    <div className={`preview-folder-card preview-folder-card--${kind}`}>
      <span className="preview-folder-card__label">{label}</span>
      <div className="preview-folder-card__body">
        <div className="preview-folder-card__motif">
          <PreviewCardMotif kind={kind} />
        </div>
        <span className="preview-folder-card__en">{english}</span>
        <span className="preview-folder-card__status">{status}</span>
      </div>
    </div>
  )
}

const previewItems: FolderItem[] = [
  {
    content: <PreviewFolderCard label="海报预览" english="Poster Preview" kind="poster" status="点击进入" />,
  },
  {
    content: <PreviewFolderCard label="影视预览" english="Film Preview" kind="film" status="点击进入" />,
  },
  {
    content: <PreviewFolderCard label="其他预览" english="More Preview" kind="more" status="暂无作品" />,
  },
]

type PreviewPageProps = {
  onOpenPosterGallery: () => void
  onOpenFilmGallery: () => void
  onOpenMoreGallery: () => void
  previewDetailOpen: boolean
}

function PreviewPage({
  onOpenPosterGallery,
  onOpenFilmGallery,
  onOpenMoreGallery,
  previewDetailOpen,
}: PreviewPageProps) {
  const [folderOpen, setFolderOpen] = useState(false)
  const [folderRevision, setFolderRevision] = useState(0)
  const wasPreviewDetailOpen = useRef(false)
  const posterPreviewsPreloaded = useRef(false)
  const folderStageRef = useRef<HTMLElement>(null)

  const scrollFolderToCenter = () => {
    const folder = folderStageRef.current?.querySelector<HTMLElement>('.preview-folder')
    if (!folder) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    folder.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  const scheduleFolderCentering = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollFolderToCenter)
    })
  }

  const preloadPosterPreviews = () => {
    if (posterPreviewsPreloaded.current) return
    posterPreviewsPreloaded.current = true

    for (const poster of posterItems) {
      const image = new Image()
      image.decoding = 'async'
      image.src = poster.previewSrc || poster.src
    }
  }

  const handleFolderOpenChange = (open: boolean) => {
    setFolderOpen(open)
    if (open) {
      preloadPosterPreviews()
      scheduleFolderCentering()
    }
  }

  useEffect(() => {
    if (wasPreviewDetailOpen.current && !previewDetailOpen) {
      setFolderOpen(true)
      setFolderRevision((revision) => revision + 1)
      scheduleFolderCentering()
    }

    wasPreviewDetailOpen.current = previewDetailOpen
  }, [previewDetailOpen])

  return (
    <div className="portfolio-section page preview-page" id="preview">
      <section className="page-intro">
        <Reveal className="shell page-intro__grid" distance={42} stagger={0.07} blur={2.5}>
          <div>
            <DepthTitle
              as="h1"
              tabIndex={-1}
              fontSize="var(--text-display)"
              segments={[{ text: '作品' }, { text: '预览', tone: 'sage' }]}
            />
            <p className="page-intro__en" data-reveal>A Visual Preview</p>
          </div>

          <div className="preview-tagline" data-reveal>
            <p className="preview-tagline__cn">让流动的影像，<br />也留下静止的想象。</p>
            <p className="preview-tagline__en">Moving images. Lasting imagination.</p>
          </div>
        </Reveal>
      </section>

      <section ref={folderStageRef} className="preview-folder-stage" aria-label="作品预览文件夹区域">
        <div
          className="preview-folder-interaction"
          onPointerEnter={() => {
            scheduleFolderCentering()
            preloadPosterPreviews()
          }}
          onFocusCapture={scheduleFolderCentering}
        >
          <Folder
          key={folderRevision}
          className="preview-folder"
          label="作品预览"
          items={previewItems}
          mode="flap"
          variant="glass"
          layout="spread"
          color="#7f9978"
          paperColor="#e8e2d4"
          tabPosition="center"
          open={folderOpen}
          onOpenChange={handleFolderOpenChange}
          openOn="click"
          onItemClick={(_, index) => {
            if (index === 0) onOpenPosterGallery()
            if (index === 1) onOpenFilmGallery()
            if (index === 2) onOpenMoreGallery()
          }}
          draggable={false}
          zoomOnClick
          peek
          intro
          size={1.8}
          frost={0.2}
          tilt={0.35}
          speed={0.9}
          bounce={0.35}
            theme="dark"
          />
        </div>
      </section>
    </div>
  )
}

export default PreviewPage