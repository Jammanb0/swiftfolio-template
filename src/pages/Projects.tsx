import { Container } from '@/components/layout/Container'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { sortedProjects } from '@/data/projects'
import { header, title, subtitle, grid } from './Projects.css'

export default function Projects() {
  return (
    <Container>
      <header className={header}>
        <h1 className={title}>Projects</h1>
        <p className={subtitle}>지금까지 진행한 프로젝트 {sortedProjects.length}개입니다.</p>
      </header>
      <div className={grid}>
        {sortedProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Container>
  )
}
