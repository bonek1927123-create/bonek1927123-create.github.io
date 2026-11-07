import ParticleLabel from '../components/ParticleLabel'
import DepthTitle from '../components/DepthTitle'
import StarCard from '../components/StarCard'
import Reveal from '../components/Reveal'
import Magnet from '../components/Magnet'
import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const ensurePlayback = () => {
      if (!video.paused) return
      video.muted = true
      void video.play().catch(() => {})
    }

    const handleVisibility = () => {
      if (!document.hidden) ensurePlayback()
    }

    ensurePlayback()
    video.addEventListener('canplay', ensurePlayback)
    window.addEventListener('pointerdown', ensurePlayback, { once: true, passive: true })
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      video.removeEventListener('canplay', ensurePlayback)
      window.removeEventListener('pointerdown', ensurePlayback)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  useGSAP(
    () => {
      const hero = heroRef.current
      const video = videoRef.current
      if (!hero || !video) return undefined

      const media = gsap.matchMedia()

      media.add(
        '(prefers-reduced-motion: no-preference) and (pointer: fine)',
        () => {
          const maxOffsetX = 50
          const maxOffsetY = 32

          gsap.set(video, {
            scale: 1.16,
            rotationX: 0,
            rotationY: 0,
            x: 0,
            y: 0,
            transformPerspective: 1100,
            transformOrigin: '50% 50%',
          })

          const moveX = gsap.quickTo(video, 'x', {
            duration: 0.58,
            ease: 'power3.out',
          })
          const moveY = gsap.quickTo(video, 'y', {
            duration: 0.58,
            ease: 'power3.out',
          })
          const rotateX = gsap.quickTo(video, 'rotationX', {
            duration: 0.7,
            ease: 'power3.out',
          })
          const rotateY = gsap.quickTo(video, 'rotationY', {
            duration: 0.7,
            ease: 'power3.out',
          })

          const setViewFromPointer = (clientX: number, clientY: number) => {
            const rect = hero.getBoundingClientRect()
            const normalizedX = gsap.utils.clamp(
              -1,
              1,
              ((clientX - rect.left) / rect.width - 0.5) * 2,
            )
            const normalizedY = gsap.utils.clamp(
              -1,
              1,
              ((clientY - rect.top) / rect.height - 0.5) * 2,
            )

            moveX(normalizedX * -maxOffsetX)
            moveY(normalizedY * -maxOffsetY)
            rotateY(normalizedX * 1.35)
            rotateX(normalizedY * -0.95)
          }

          const handlePointerMove = (event: PointerEvent) => {
            if (document.body.classList.contains('annotation-active')) return
            setViewFromPointer(event.clientX, event.clientY)
          }

          const resetView = () => {
            moveX(0)
            moveY(0)
            rotateX(0)
            rotateY(0)
          }

          hero.addEventListener('pointermove', handlePointerMove, { passive: true })
          hero.addEventListener('pointerleave', resetView)
          window.addEventListener('blur', resetView)

          return () => {
            hero.removeEventListener('pointermove', handlePointerMove)
            hero.removeEventListener('pointerleave', resetView)
            window.removeEventListener('blur', resetView)
          }
        },
      )

      return () => media.revert()
    },
    { scope: heroRef },
  )

  return (
    <div className="portfolio-section page home-page" id="home" ref={heroRef}>
      <section className="home-hero">
        <div className="hero-video-slot" aria-label="像素雨夜循环视频背景">
          <video
            ref={videoRef}
            className="hero-field"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/pixel-rain-poster.jpg"
            controls={false}
            disablePictureInPicture
            aria-hidden="true"
          >
            <source src="/videos/pixel-rain-loop.mp4" type="video/mp4" />
          </video>
        </div>

        <Reveal className="shell home-hero__inner" trigger="mount" distance={42} stagger={0.07} blur={3}>
          <div className="home-hero__copy">
            <DepthTitle as="h1" tabIndex={-1} fontSize="var(--text-hero)" segments={[{ text: '唐俊贤' }]} />
            <p className="home-hero__role" data-reveal>AIGC 视频制作 · 全流程创作者</p>
            <p className="home-hero__en" data-reveal>Moving images, built end to end.</p>
            <p className="home-hero__lead" data-reveal>
              从创意、剧本和分镜出发，完成图片与视频生成、剪辑、调色和最终交付。
              也把独立开发作为持续进行的副业。
            </p>
            <div className="home-hero__actions" data-reveal>
              <Magnet
                wrapperClassName="magnet-action"
                padding={58}
                magnetStrength={9}
                maxOffset={7}
                tilt={2}
                scale={1.035}
                spring={{ stiffness: 190, damping: 18, mass: 1 }}
              >
                <a className="button button--accent" href="#resume">
                  <ParticleLabel text="开始了解我" highlightColor="#5c4828" />
                </a>
              </Magnet>
              <Magnet
                wrapperClassName="magnet-action"
                padding={58}
                magnetStrength={9}
                maxOffset={7}
                tilt={2}
                scale={1.035}
                spring={{ stiffness: 190, damping: 18, mass: 1 }}
              >
                <a className="button button--ghost" href="#work">
                  <ParticleLabel text="直接看作品" />
                </a>
              </Magnet>
            </div>
          </div>

          <StarCard className="home-hero__aside-star" radius={28} glow={0.3} duration={8}>
            <aside className="home-hero__aside">
              <p className="home-hero__aside-title">创作范围</p>
              <ul>
                <li>AI 短片</li>
                <li>品牌影像</li>
                <li>AI 漫剧</li>
                <li>独立开发</li>
              </ul>
              <p className="home-hero__aside-note">可承担从前期概念到最终成片的完整制作。</p>
            </aside>
          </StarCard>
        </Reveal>
      </section>

      <section className="home-intro" id="intro">
        <Reveal className="shell home-intro__grid" distance={38} stagger={0.06} blur={2.5}>
          <div>
            <h2>初次见面</h2>
            <p className="section-en" data-reveal>A first introduction</p>
          </div>
          <div className="home-intro__copy">
            <p className="home-intro__lead" data-reveal>
              我从事 AIGC 视频制作，熟悉从想法到成片的完整流程。
            </p>
            <p data-reveal>
              我掌握多种 AIGC 工具和剪辑工具，能够根据项目需要选择合适的方法，
              把控视觉方向、镜头连续性和最终交付。除了影像制作，我也把独立开发作为副业。
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default HomePage