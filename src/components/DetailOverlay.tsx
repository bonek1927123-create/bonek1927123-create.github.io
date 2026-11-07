import AnnotationTool from './AnnotationTool'
import ParticleLabel from './ParticleLabel'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Project } from '../data/site'
import AnimatedContent from './AnimatedContent'
import FilmGalleryPage from './FilmGalleryPage'
import MoreGalleryPage from './MoreGalleryPage'
import OtherImageLightbox from './OtherImageLightbox'
import Magnet from './Magnet'
import PosterGalleryPage from './PosterGalleryPage'
import PosterImageLightbox from './PosterImageLightbox'
import ProjectMedia from './ProjectMedia'
import Reveal from './Reveal'
import StarCard from './StarCard'

export type DetailState =
  | { type: 'project'; project: Project; returnTo?: 'film-gallery' }
  | { type: 'preview'; project: Project }
  | { type: 'poster-gallery'; activeIndex?: number }
  | { type: 'poster-image'; index: number }
  | { type: 'film-gallery' }
  | { type: 'more-gallery' }
  | { type: 'other-image'; index: number }
  | { type: 'resume' }
  | { type: 'resume-image' }
  | null

type DetailOverlayProps = {
  detail: DetailState
  onClose: () => void
  onOpenProject: (project: Project, returnTo?: 'film-gallery') => void
  onOpenPosterImage: (index: number) => void
  onNavigatePosterImage: (index: number) => void
  onOpenOtherImage: (index: number) => void
  onOpenResumeImage: () => void
  onReturnToFilmGallery: () => void
  onReturnToPosterGallery: () => void
  onReturnToOtherGallery: () => void
  onReturnToResume: () => void
}

type ProjectLinkDisclosureProps = {
  id: string
  label: string
  url: string
  visible: boolean
  copied: boolean
  onToggle: () => void
  onCopy: () => void
}

function MagneticControl({ children }: { children: ReactNode }) {
  return (
    <Magnet
      wrapperClassName="magnet-action"
      padding={52}
      magnetStrength={9}
      maxOffset={6}
      tilt={1.8}
      scale={1.03}
    >
      {children}
    </Magnet>
  )
}

const workflow = [
  '创意与叙事',
  '剧本与分镜',
  '视觉方向与关键帧',
  '图片与视频生成',
  '剪辑、调色与声音',
  '最终成片与交付',
]

function ProjectLinkDisclosure({
  id,
  label,
  url,
  visible,
  copied,
  onToggle,
  onCopy,
}: ProjectLinkDisclosureProps) {
  return (
    <StarCard className="detail-link-star" radius={18} glow={0.24} duration={9}>
      <div className="detail-project__video-link">
        <div className="detail-project__video-link-head">
          <p className="detail-project__video-link-label">{label}</p>
          <span className="detail-project__video-link-hint">{visible ? '已展开' : '按需查看'}</span>
        </div>

        <div className="detail-project__video-link-actions">
          <MagneticControl>
            <button type="button" className="button button--accent" onClick={onCopy}>
              <ParticleLabel text={copied ? '已复制' : '复制链接'} highlightColor="#5c4828" />
            </button>
          </MagneticControl>
          <MagneticControl>
            <button
              type="button"
              className="button button--ghost"
              aria-expanded={visible}
              aria-controls={id}
              onClick={onToggle}
            >
              <ParticleLabel text={visible ? '收起链接' : '查看链接'} />
            </button>
          </MagneticControl>
          <MagneticControl>
            <a
              className="button button--ghost"
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={'跳转到' + label}
            >
              <ParticleLabel text="跳转 ↗" />
            </a>
          </MagneticControl>
        </div>

        {visible ? (
          <div className="detail-project__video-link-reveal" id={id}>
            <a
              className="detail-project__video-link-url"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {url}
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        ) : null}
      </div>
    </StarCard>
  )
}

function DetailOverlay({
  detail,
  onClose,
  onOpenProject,
  onOpenPosterImage,
  onNavigatePosterImage,
  onOpenOtherImage,
  onOpenResumeImage,
  onReturnToFilmGallery,
  onReturnToPosterGallery,
  onReturnToOtherGallery,
  onReturnToResume,
}: DetailOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const projectMediaRef = useRef<HTMLDivElement>(null)
  const resumeDocumentRef = useRef<HTMLDivElement>(null)
  const [videoLinkCopied, setVideoLinkCopied] = useState(false)
  const [processLinkCopied, setProcessLinkCopied] = useState(false)
  const [videoLinkVisible, setVideoLinkVisible] = useState(false)
  const [processLinkVisible, setProcessLinkVisible] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (detail && !dialog.open) {
      dialog.showModal()
      document.body.classList.add('detail-open')
    }

    if (!detail && dialog.open) {
      dialog.close()
      document.body.classList.remove('detail-open')
    }

    return () => {
      document.body.classList.remove('detail-open')
    }
  }, [detail])

  const copyProjectLink = async (url: string, setCopied: (copied: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const closeDialog = () => {
    setVideoLinkCopied(false)
    setProcessLinkCopied(false)
    setVideoLinkVisible(false)
    setProcessLinkVisible(false)
    dialogRef.current?.close()
    document.body.classList.remove('detail-open')
    onClose()
  }

  const centerProjectMedia = () => {
    const media = projectMediaRef.current
    if (!media) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    media.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  const alignResumeDocumentTop = () => {
    const documentCard = resumeDocumentRef.current
    if (!documentCard) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    documentCard.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }

  const returnsToFilmGallery =
    detail?.type === 'project' && detail.returnTo === 'film-gallery'

  const handleBack = () => {
    if (detail?.type === 'poster-image') {
      onReturnToPosterGallery()
      return
    }

    if (detail?.type === 'other-image') {
      onReturnToOtherGallery()
      return
    }

    if (!returnsToFilmGallery) {
      closeDialog()
      return
    }

    setVideoLinkCopied(false)
    setProcessLinkCopied(false)
    setVideoLinkVisible(false)
    setProcessLinkVisible(false)
    onReturnToFilmGallery()
  }

  const renderContent = () => {
    if (!detail) return null

    if (detail.type === 'resume') {
      return (
        <Reveal className="detail-content" trigger="mount" distance={38} stagger={0.06} blur={2.5}>
          <header className="detail-content__header">
            <h2 id="detail-title">完整简历</h2>
            <p className="detail-content__en">Full profile</p>
            <p className="detail-content__lead">唐俊贤 / AIGC 视频制作 / 全流程创作</p>
          </header>

          <div className="resume-viewer">
            <StarCard className="resume-document-star" radius={22} glow={0.22} duration={9}>
              <div
                ref={resumeDocumentRef}
                className="resume-viewer__document"
                onPointerEnter={alignResumeDocumentTop}
                onFocusCapture={alignResumeDocumentTop}
                tabIndex={0}
              >
                <img src="/documents/resume2.jpg" alt="唐俊贤完整个人简历" />
              </div>
            </StarCard>
            <StarCard className="resume-sidebar-star" radius={20} glow={0.24} duration={9}>
              <aside className="resume-viewer__aside">
                <p>完整版个人简历图片，可在当前页面上下滚动查看。</p>
                <MagneticControl>
                  <button type="button" className="button button--accent" onClick={onOpenResumeImage}>
                    <ParticleLabel text="查看原图" highlightColor="#5c4828" />
                  </button>
                </MagneticControl>
                <MagneticControl>
                  <a className="button button--ghost" href="/documents/resume2.jpg" download="唐俊贤_简历2.jpg">
                    <ParticleLabel text="下载简历图片" />
                  </a>
                </MagneticControl>
              </aside>
            </StarCard>
          </div>

        </Reveal>
      )
    }

    if (detail.type === 'resume-image') {
      return (
        <div className="resume-raw-viewer" role="dialog" aria-modal="true" aria-label="简历原图查看">
          <h2 id="detail-title" className="sr-only">简历原图</h2>
          <header className="resume-raw-toolbar">
            <p>简历原图</p>
            <div className="resume-raw-toolbar__actions">
              <MagneticControl>
                <button
                  type="button"
                  className="resume-raw-close"
                  onClick={onReturnToResume}
                  aria-label="退出原图查看"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </MagneticControl>
            </div>
          </header>
          <div className="resume-raw-canvas">
            <img src="/documents/resume2.jpg" alt="唐俊贤完整个人简历原图" />
          </div>
        </div>
      )
    }
    if (detail.type === 'poster-gallery') {
      return (
        <PosterGalleryPage
          initialIndex={detail.activeIndex}
          onOpenPosterImage={onOpenPosterImage}
        />
      )
    }

    if (detail.type === 'poster-image') {
      return (
        <PosterImageLightbox
          index={detail.index}
          onNavigate={onNavigatePosterImage}
          onClose={onReturnToPosterGallery}
        />
      )
    }

    if (detail.type === 'film-gallery') {
      return (
        <FilmGalleryPage
          onOpenProject={(project) => onOpenProject(project, 'film-gallery')}
        />
      )
    }

    if (detail.type === 'more-gallery') {
      return <MoreGalleryPage onOpenOtherImage={onOpenOtherImage} />
    }

    if (detail.type === 'other-image') {
      return (
        <OtherImageLightbox
          index={detail.index}
          onClose={onReturnToOtherGallery}
        />
      )
    }

    const { project } = detail
    const videoUrl = project.externalUrl
    const processUrl = project.processUrl

    return (
      <Reveal className="detail-content" trigger="mount" distance={38} stagger={0.06} blur={2.5}>
        <header className="detail-content__header">
          <h2 id="detail-title">
            {detail.type === 'preview' ? '作品预览 · ' + project.title : project.title}
          </h2>
          <p className="detail-content__en">{project.englishTitle}</p>
          <p className="detail-content__lead">{project.category}</p>
        </header>

        <div className="detail-project">
          <StarCard className="detail-media-star" radius={34} glow={0.3} duration={9}>
            <div
              ref={projectMediaRef}
              className="detail-media-hover"
              onPointerEnter={centerProjectMedia}
              onFocusCapture={centerProjectMedia}
            >
              <ProjectMedia project={project} />
            </div>
          </StarCard>
          <aside className="detail-project__info">
            <p>{project.summary}</p>
            <dl className="project-meta">
              <div>
                <dt>职责</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>产出</dt>
                <dd>{project.output}</dd>
              </div>
              {project.productionCycle ? (
                <div>
                  <dt>创作周期</dt>
                  <dd>{project.productionCycle}</dd>
                </div>
              ) : null}
              {project.software ? (
                <div>
                  <dt>使用软件</dt>
                  <dd>{project.software}</dd>
                </div>
              ) : null}
              <div>
                <dt>状态</dt>
                <dd>{videoUrl ? '成片已发布' : '素材与成片待接入'}</dd>
              </div>
            </dl>

            {videoUrl ? (
              <ProjectLinkDisclosure
                id="project-video-link"
                label="视频链接"
                url={videoUrl}
                visible={videoLinkVisible}
                copied={videoLinkCopied}
                onToggle={() => setVideoLinkVisible((visible) => !visible)}
                onCopy={() => copyProjectLink(videoUrl, setVideoLinkCopied)}
              />
            ) : null}

            {processUrl ? (
              <ProjectLinkDisclosure
                id="project-process-link"
                label="创作流程与画布"
                url={processUrl}
                visible={processLinkVisible}
                copied={processLinkCopied}
                onToggle={() => setProcessLinkVisible((visible) => !visible)}
                onCopy={() => copyProjectLink(processUrl, setProcessLinkCopied)}
              />
            ) : null}
          </aside>
        </div>

        {detail.type === 'preview' ? (
          <StarCard className="detail-note-star" radius={22} glow={0.2} duration={9}>
            <p className="detail-preview-note">
              这里将承载完整的视频、关键帧、镜头序列与播放控制。当前为独立预览页基础结构。
            </p>
          </StarCard>
        ) : (
          <StarCard className="detail-process-star" radius={34} glow={0.24} duration={9}>
            <section className="detail-process">
              <h3>制作过程</h3>
              <ol className="detail-list">
                {workflow.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </section>
          </StarCard>
        )}
      </Reveal>
    )
  }

  const detailKey = detail
    ? detail.type === 'resume'
      ? 'resume'
      : detail.type === 'resume-image'
        ? 'resume-image'
        : detail.type === 'poster-gallery'
          ? 'poster-gallery'
          : detail.type === 'poster-image'
            ? 'poster-image-' + detail.index
            : detail.type === 'film-gallery'
          ? 'film-gallery'
          : detail.type === 'more-gallery'
            ? 'more-gallery'
            : detail.type === 'other-image'
              ? 'other-image-' + detail.index
              : detail.type + '-' + detail.project.slug
    : 'closed'

  return (
    <dialog
      className="detail-dialog"
      ref={dialogRef}
      aria-labelledby="detail-title"
      onCancel={(event) => {
        event.preventDefault()
        handleBack()
      }}
    >
      {detail ? (
        <AnimatedContent
          key={detailKey}
          className="detail-entry"
          trigger="mount"
          distance={0}
          duration={0.68}
          ease="power1.inOut"
          initialOpacity={0}
          scale={1}
          blur={2}
          tilt={0}
          style={{ height: '100%', transformOrigin: '50% 0%' }}
        >
          <div className="detail-shell">
            <header className="detail-toolbar">
              <span className="detail-toolbar__name">唐俊贤</span>
              <MagneticControl>
                <button type="button" className="detail-close return-control return-control--accent" onClick={handleBack}>
                  <ParticleLabel
                    text={returnsToFilmGallery ? '返回影视预览' : '返回网页'}
                    highlightColor="#5c4828"
                  />
                </button>
              </MagneticControl>
            </header>
            {renderContent()}
          </div>
        </AnimatedContent>
      ) : null}
      <AnnotationTool />
    </dialog>
  )
}

export default DetailOverlay