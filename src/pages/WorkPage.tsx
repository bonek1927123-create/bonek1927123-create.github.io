import DepthTitle from '../components/DepthTitle'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import { projects, type Project } from '../data/site'

type WorkPageProps = {
  onOpenProject: (project: Project) => void
}

const hiddenProjectSlugs = new Set([
  'brand-film',
  'visual-system',
  'independent-product',
])

const workProjects = projects.filter((project) => !hiddenProjectSlugs.has(project.slug))

function WorkPage({ onOpenProject }: WorkPageProps) {
  return (
    <div className="portfolio-section page work-page" id="work">
      <section className="page-intro">
        <Reveal className="shell page-intro__grid" distance={42} stagger={0.07} blur={2.5}>
          <div>
            <DepthTitle as="h1" tabIndex={-1} fontSize="var(--text-display)" segments={[{ text: '主要' }, { text: '作品', tone: 'gold' }]} />
            <p className="page-intro__en" data-reveal>Selected Works</p>
          </div>
          <div className="page-intro__copy" data-reveal>
            <p className="page-intro__lead">
              以项目为单位，说明我在影像创作中的职责、方法与最终产出。
            </p>
            <p>点击卡片进入独立项目页面，查看更完整的说明。</p>
          </div>
        </Reveal>
      </section>

      <section className="work-archive">
        <div className="shell project-card-grid project-card-grid--work">
          {workProjects.map((project, index) => {
            const shapes = ['rounded', 'square', 'soft', 'rounded'] as const
            const layouts = ['wide', 'standard', 'standard', 'wide'] as const
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                shape={shapes[index]}
                layout={layouts[index]}
                onOpen={() => onOpenProject(project)}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default WorkPage