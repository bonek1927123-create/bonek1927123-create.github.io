import { useRef, type MouseEvent } from 'react'
import ParticleLabel from '../components/ParticleLabel'
import DepthTitle from '../components/DepthTitle'
import StarCard from '../components/StarCard'
import Reveal from '../components/Reveal'
import Magnet from '../components/Magnet'
import ProfileCard from '../components/ProfileCard'

type ResumePageProps = {
  onOpenResume: () => void
}

const capabilities = [
  '创意与叙事',
  '剧本与分镜',
  '视觉方向与关键帧',
  '图片与视频生成',
  '剪辑、调色与声音',
  '最终成片与交付',
]

function ResumePage({ onOpenResume }: ResumePageProps) {
  const resumeCardRef = useRef<HTMLElement>(null)

  const centerResumeCard = () => {
    const card = resumeCardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const targetTop =
      window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  const handleProfileCardClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('button, a')) return
    onOpenResume()
  }

  return (
    <div className="portfolio-section page resume-page" id="resume">
      <section className="page-intro">
        <Reveal className="shell resume-intro__grid" distance={42} stagger={0.07} blur={2.5}>
          <div>
            <DepthTitle as="h1" tabIndex={-1} fontSize="var(--text-display)" segments={[{ text: '个人简历' }]} />
            <p className="page-intro__en" data-reveal>Profile & Practice</p>
            <p className="page-intro__lead" data-reveal>
              唐俊贤 / AIGC 视频制作 / 全流程创作
            </p>
          </div>

          <div className="resume-intro__copy" data-reveal>
            <p>
              熟悉 AIGC 视频制作的完整流程，掌握多种 AIGC 工具、视觉工具与剪辑后期工具。
              能够独立完成从概念到最终交付的工作。
            </p>
          </div>
        </Reveal>
      </section>

      <section className="resume-summary">
        <div className="shell resume-summary__grid">
          <Reveal className="reveal-card" distance={44} blur={2.5}>
            <StarCard className="resume-summary-star" radius={40} glow={0.32} duration={8}>
              <article className="resume-summary__card resume-summary__card--rounded">
                <h2><span>能力</span><span className="title-accent title-accent--gold">范围</span></h2>
                <p className="section-en">What I do</p>
                <ul className="resume-capabilities">
                  {capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </StarCard>
          </Reveal>

          <Reveal className="reveal-card" distance={44} delay={0.08} blur={2.5}>
            <article
              ref={resumeCardRef}
              className="resume-profile-panel"
              onPointerEnter={centerResumeCard}
              onFocusCapture={centerResumeCard}
            >
              <Magnet
                wrapperClassName="resume-profile-card-magnet"
                innerClassName="resume-profile-card-magnet__inner"
                padding={54}
                magnetStrength={22}
                maxOffset={10}
                scale={1.008}
                spring={{ stiffness: 150, damping: 22, mass: 1 }}
                style={{ display: 'block', width: 'min(100%, 430px)' }}
              >
                <div
                  className="resume-profile-card-click"
                  onClick={handleProfileCardClick}
                  data-card-clickable="true"
                >
                  <StarCard className="resume-profile-star" radius={40} glow={0.4} duration={8.5}>
                    <ProfileCard
                      avatarUrl="/documents/resume3-card.jpg"
                      name="唐俊贤"
                      title="AIGC 视频制作 · 全流程创作"
                      handle="RESUME CARD · 个人简历"
                      handlePrefix=""
                      status="全流程制作 · 完整版可查看"
                      statusColor="#b7d5a2"
                      contactText="查看简历"
                      theme="dark"
                      backdropColor="#172019"
                      radius={28}
                      holo={0.58}
                      glare={0.4}
                      tiltStrength={9}
                      parallax={7}
                      enableTilt
                      intro
                      className="resume-profile-card"
                      onContactClick={onOpenResume}
                    />
                  </StarCard>
                </div>
              </Magnet>
              <Magnet
                wrapperClassName="magnet-action"
                padding={46}
                magnetStrength={10}
                maxOffset={6}
                tilt={1.5}
                scale={1.025}
              >
                <a className="resume-profile-panel__download" href="/documents/resume3.jpg" download="唐俊贤_简历3.jpg">
                  <ParticleLabel text="下载简历图片" />
                </a>
              </Magnet>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default ResumePage
