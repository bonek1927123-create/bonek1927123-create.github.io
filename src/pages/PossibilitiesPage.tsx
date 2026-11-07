import ParticleLabel from '../components/ParticleLabel'
import DepthTitle from '../components/DepthTitle'
import StarCard from '../components/StarCard'
import Reveal from '../components/Reveal'
import Magnet from '../components/Magnet'

type PossibilitiesPageProps = {
  onOpenResume: () => void
}

function PossibilitiesPage({ onOpenResume }: PossibilitiesPageProps) {
  return (
    <div className="portfolio-section page possibilities-page" id="possibilities">
      <section className="possibilities-hero">
        <span className="possibilities-hero__mark" data-mark="∞" aria-hidden="true" />
        <Reveal className="shell possibilities-hero__inner" distance={42} stagger={0.06} blur={2.5}>
          <DepthTitle as="h1" tabIndex={-1} fontSize="var(--text-hero)" segments={[{ text: '无限' }, { text: '可能', tone: 'gold' }]} />
          <p className="possibilities-hero__en" data-reveal>Let the next frame begin.</p>
          <p className="possibilities-hero__lead" data-reveal>
            下一部作品，
            从一次对话开始。
          </p>
          <p className="possibilities-hero__copy" data-reveal>
            我正在寻找 AIGC 影像创作、视频制作、视觉开发和内容合作机会，
            也欢迎讨论独立产品与长期项目。
          </p>
          <div className="possibilities-hero__actions" data-reveal>
            <Magnet
              wrapperClassName="magnet-action"
              padding={58}
              magnetStrength={9}
              maxOffset={7}
              tilt={2}
              scale={1.035}
            >
              <a className="button button--accent" href="mailto:3218895882@qq.com">
                <ParticleLabel text="发送邮件" highlightColor="#5c4828" />
              </a>
            </Magnet>
            <Magnet
              wrapperClassName="magnet-action"
              padding={58}
              magnetStrength={9}
              maxOffset={7}
              tilt={2}
              scale={1.035}
            >
              <a className="button button--ghost" href="#home">
                <ParticleLabel text="重新浏览" />
              </a>
            </Magnet>
          </div>

          <div className="possibilities-inline" data-reveal>
            <StarCard className="possibilities-star-card" radius={18} glow={0.24} duration={9}>
              <div className="possibilities-inline__card">
                <p>邮箱</p>
                <p><a className="possibilities-inline__link possibilities-inline__link--email" href="mailto:3218895882@qq.com"><ParticleLabel text="3218895882@qq.com" highlightColor="#c9ab70" /></a></p>
              </div>
            </StarCard>
            <StarCard className="possibilities-star-card" radius={0} glow={0.24} duration={9}>
              <div className="possibilities-inline__card">
                <p>作品平台</p>
                <p>抖音 / 小红书等</p>
              </div>
            </StarCard>
            <StarCard className="possibilities-star-card" radius={18} glow={0.24} duration={9}>
              <div className="possibilities-inline__card">
                <p>所在地</p>
                <p>长沙</p>
              </div>
            </StarCard>
            <StarCard className="possibilities-star-card" radius={0} glow={0.24} duration={9}>
              <div className="possibilities-inline__card">
                <p>简历</p>
                <p>
                  <button type="button" className="possibilities-inline__link" onClick={onOpenResume}>
                    <ParticleLabel text="查看简历" />
                  </button>
                </p>
              </div>
            </StarCard>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default PossibilitiesPage