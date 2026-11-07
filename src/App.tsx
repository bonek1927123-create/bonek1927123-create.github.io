import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnnotationTool from './components/AnnotationTool'
import type { DetailState } from './components/DetailOverlay'
import SiteHeader from './components/SiteHeader'
import SoftAurora from './components/SoftAurora'
import type { SectionKey } from './data/site'
import type { Project } from './data/site'
import HomePage from './pages/HomePage'
import PossibilitiesPage from './pages/PossibilitiesPage'
import PreviewPage from './pages/PreviewPage'
import ResumePage from './pages/ResumePage'
import WorkPage from './pages/WorkPage'

const DetailOverlay = lazy(() => import('./components/DetailOverlay'))

const sectionOrder: SectionKey[] = ['home', 'resume', 'work', 'preview', 'possibilities']

const DETAIL_HISTORY_KEY = 'portfolioDetail'
const DETAIL_DEPTH_KEY = 'portfolioDetailDepth'

function readHistoryDetail(): DetailState {
  const state = window.history.state as Record<string, unknown> | null
  return (state?.[DETAIL_HISTORY_KEY] as DetailState | undefined) ?? null
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home')
  const [detail, setDetail] = useState<DetailState>(null)
  const [auroraVisible, setAuroraVisible] = useState(false)
  const posterImageIndexRef = useRef<number | null>(null)

  const openDetail = (nextDetail: Exclude<DetailState, null>) => {
    const currentState: Record<string, unknown> =
      window.history.state && typeof window.history.state === 'object'
        ? window.history.state
        : {}
    const currentDepth =
      typeof currentState[DETAIL_DEPTH_KEY] === 'number'
        ? currentState[DETAIL_DEPTH_KEY]
        : 0

    window.history.pushState(
      {
        ...currentState,
        [DETAIL_HISTORY_KEY]: nextDetail,
        [DETAIL_DEPTH_KEY]: currentDepth + 1,
      },
      '',
    )
    setDetail(nextDetail)
  }

  const goBackInDetailHistory = () => {
    if (readHistoryDetail()) {
      window.history.back()
      return
    }

    setDetail(null)
  }

  const returnToFilmGallery = () => {
    if (readHistoryDetail()) {
      window.history.back()
      return
    }

    setDetail({ type: 'film-gallery' })
  }

  const returnToPosterGallery = () => {
    if (readHistoryDetail()) {
      window.history.back()
      return
    }

    const activeIndex = posterImageIndexRef.current ?? undefined
    posterImageIndexRef.current = null
    setDetail({ type: 'poster-gallery', activeIndex })
  }

  const returnToOtherGallery = () => {
    if (readHistoryDetail()) {
      window.history.back()
      return
    }

    setDetail({ type: 'more-gallery' })
  }

  const navigatePosterImage = (index: number) => {
    posterImageIndexRef.current = index
    const nextDetail: DetailState = { type: 'poster-image', index }
    const currentState: Record<string, unknown> =
      window.history.state && typeof window.history.state === 'object'
        ? window.history.state
        : {}

    window.history.replaceState(
      { ...currentState, [DETAIL_HISTORY_KEY]: nextDetail },
      '',
    )
    setDetail((current) => (current?.type === 'poster-image' ? nextDetail : current))
  }

  const returnToResume = () => {
    if (readHistoryDetail()) {
      window.history.back()
      return
    }

    setDetail({ type: 'resume' })
  }


  useEffect(() => {
    const currentState =
      window.history.state && typeof window.history.state === 'object'
        ? window.history.state
        : {}
    const currentDetail = readHistoryDetail()

    if (!(DETAIL_HISTORY_KEY in currentState) || !(DETAIL_DEPTH_KEY in currentState)) {
      window.history.replaceState(
        {
          ...currentState,
          [DETAIL_HISTORY_KEY]: currentDetail,
          [DETAIL_DEPTH_KEY]: currentDetail ? 1 : 0,
        },
        '',
      )
      if (currentDetail) setDetail(currentDetail)
    } else if (currentDetail) {
      setDetail(currentDetail)
    }

    const handlePopState = () => {
      const nextDetail = readHistoryDetail()

      if (
        nextDetail?.type === 'poster-gallery' &&
        posterImageIndexRef.current !== null
      ) {
        const restoredDetail: DetailState = {
          type: 'poster-gallery',
          activeIndex: posterImageIndexRef.current,
        }
        posterImageIndexRef.current = null

        const state: Record<string, unknown> =
          window.history.state && typeof window.history.state === 'object'
            ? window.history.state
            : {}
        window.history.replaceState(
          { ...state, [DETAIL_HISTORY_KEY]: restoredDetail },
          '',
        )
        setDetail(restoredDetail)
        return
      }

      posterImageIndexRef.current = null
      setDetail(nextDetail)
    }
    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    let frame = 0
    const sectionElements = sectionOrder
      .map((section) => ({ section, element: document.getElementById(section) }))
      .filter((item): item is { section: SectionKey; element: HTMLElement } => Boolean(item.element))
    const resumeElement = document.getElementById('resume')

    const updateScrollState = () => {
      const marker = window.innerHeight * 0.34
      let current: SectionKey = 'home'

      for (const { section, element } of sectionElements) {
        if (element.getBoundingClientRect().top <= marker) {
          current = section
        }
      }

      const resumeTop = resumeElement?.getBoundingClientRect().top
      const nextAuroraVisible = resumeTop !== undefined && resumeTop < window.innerHeight

      setActiveSection((previous) => (previous === current ? previous : current))
      setAuroraVisible((previous) =>
        previous === nextAuroraVisible ? previous : nextAuroraVisible,
      )
    }

    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    let active = true

    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh()
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="site-root">
      <div
        className={'site-aurora' + (auroraVisible ? ' site-aurora--visible' : '')}
        aria-hidden="true"
      >
        <SoftAurora
          speed={auroraVisible ? 0.34 : 0}
          scale={1.9}
          brightness={0.56}
          color1="#a8cfa3"
          color2="#c4a96d"
          noiseFrequency={2.35}
          noiseAmplitude={0.92}
          bandHeight={0.55}
          bandSpread={0.78}
          octaveDecay={0.11}
          layerOffset={0.85}
          colorSpeed={0.82}
          spectrum={0.16}
          tilt={-6}
          enableMouseInteraction={auroraVisible}
          mouseInfluence={0.18}
          clickPulse={false}
          intro
          opacity={0.62}
        />
        <div className="site-aurora__veil" />
      </div>

      <SiteHeader activeSection={activeSection} />

      <main className="site-main">
        <HomePage />
        <ResumePage onOpenResume={() => openDetail({ type: 'resume' })} />
        <WorkPage onOpenProject={(project: Project) => openDetail({ type: 'project', project })} />
        <PreviewPage
          onOpenPosterGallery={() => openDetail({ type: 'poster-gallery' })}
          onOpenFilmGallery={() => openDetail({ type: 'film-gallery' })}
          onOpenMoreGallery={() => openDetail({ type: 'more-gallery' })}
          previewDetailOpen={
            detail?.type === 'poster-gallery' ||
            detail?.type === 'poster-image' ||
            detail?.type === 'film-gallery' ||
            detail?.type === 'more-gallery' ||
            detail?.type === 'other-image'
          }
        />
        <PossibilitiesPage onOpenResume={() => openDetail({ type: 'resume' })} />
      </main>

      {detail ? (
        <Suspense fallback={null}>
          <DetailOverlay
          detail={detail}
          onClose={goBackInDetailHistory}
          onOpenProject={(project: Project, returnTo) =>
            openDetail({ type: 'project', project, returnTo })
          }
          onOpenPosterImage={(index) => {
            posterImageIndexRef.current = index
            openDetail({ type: 'poster-image', index })
          }}
          onNavigatePosterImage={navigatePosterImage}
          onOpenOtherImage={(index) => openDetail({ type: 'other-image', index })}
          onOpenResumeImage={() => openDetail({ type: 'resume-image' })}
          onReturnToFilmGallery={returnToFilmGallery}
          onReturnToPosterGallery={returnToPosterGallery}
          onReturnToOtherGallery={returnToOtherGallery}
          onReturnToResume={returnToResume}
          />
        </Suspense>
      ) : null}
      {detail ? null : <AnnotationTool />}
    </div>
  )
}

export default App