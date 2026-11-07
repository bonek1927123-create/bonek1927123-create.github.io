import type { Project } from '../data/site'

type ProjectMediaProps = {
  project: Project
  reveal?: boolean
  caption?: string
}

function ProjectMedia({ project, reveal = false, caption }: ProjectMediaProps) {
  return (
    <div
      className={
        'project-media project-media--' +
        project.tone +
        (project.coverImage ? ' project-media--image' : '')
      }
      data-reveal={reveal ? '' : undefined}
    >
      <div className="project-media__meta">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>

      {project.coverImage ? (
        <img
          className="project-media__image"
          src={project.coverImage}
          alt={project.title + ' 封面'}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span
          className="project-media__mark"
          data-mark={project.mark}
          aria-hidden="true"
        />
      )}

      <div className="project-media__copy">
        <h2 className="project-media__title">{project.title}</h2>
        <p className="project-media__en">{project.englishTitle}</p>
        <p className="project-media__output">{project.output}</p>
        {caption ? <p className="project-media__caption">{caption}</p> : null}
      </div>
    </div>
  )
}

export default ProjectMedia
