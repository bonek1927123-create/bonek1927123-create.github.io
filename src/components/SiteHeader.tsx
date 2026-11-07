import ParticleLabel from './ParticleLabel'
import Magnet from './Magnet'
import { sectionIds, type SectionKey } from '../data/site'

type SiteHeaderProps = {
  activeSection: SectionKey
}

const navigation: Array<{ label: string; section: SectionKey }> = [
  { label: '初次见面', section: 'home' },
  { label: '个人简历', section: 'resume' },
  { label: '主要作品', section: 'work' },
  { label: '作品预览', section: 'preview' },
  { label: '无限可能', section: 'possibilities' },
]

function SiteHeader({ activeSection }: SiteHeaderProps) {
  const showGreeting = activeSection === 'home'
  const showClosing = activeSection === 'possibilities'

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a className="wordmark" href="#home" aria-label="回到初次见面">
          <span
            className={'wordmark__label' + (showGreeting ? ' is-visible' : '')}
            aria-hidden="true"
          >
            <ParticleLabel text="你好，我叫" highlightColor="#d9e8cd" />
          </span>
          <span
            className={'wordmark__label' + (showClosing ? ' is-visible' : '')}
            aria-hidden="true"
          >
            <ParticleLabel text="感谢浏览" highlightColor="#d9e8cd" />
          </span>
        </a>

        <nav className="site-nav" aria-label="页面区块导航">
          {navigation.map((item) => (
            <a
              key={item.section}
              className="site-nav__link"
              href={'#' + sectionIds[item.section]}
              aria-current={activeSection === item.section ? 'location' : undefined}
            >
              <ParticleLabel text={item.label} />
            </a>
          ))}
        </nav>

        <Magnet
          wrapperClassName="magnet-action"
          padding={48}
          magnetStrength={9}
          maxOffset={6}
          tilt={1.8}
          scale={1.03}
        >
          <a className="resume-status" href="#resume">
            <ParticleLabel text="查看简历" highlightColor="#6f542b" />
          </a>
        </Magnet>
      </div>
    </header>
  )
}

export default SiteHeader
