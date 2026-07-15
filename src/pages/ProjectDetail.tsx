import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Tag } from '@/components/ui/Tag'
import { YoutubeEmbed } from '@/components/portfolio/YoutubeEmbed'
import { LinkList } from '@/components/portfolio/LinkList'
import { getProjectById } from '@/data/projects'
import {
  wrapper,
  back,
  header,
  dateText,
  title,
  tagRow,
  media,
  thumbFallback,
  description,
} from './ProjectDetail.css'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const formattedDate = new Date(project.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <Container>
      <motion.div
        className={wrapper}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link className={back} to="/projects">
          ← 프로젝트 목록으로
        </Link>

        <header className={header}>
          <p className={dateText}>{formattedDate}</p>
          <h1 className={title}>{project.title}</h1>
          <div className={tagRow}>
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </header>

        <div className={media}>
          {project.youtubeId ? (
            <YoutubeEmbed youtubeId={project.youtubeId} title={project.title} />
          ) : project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} />
          ) : (
            <div className={thumbFallback} />
          )}
        </div>

        <p className={description}>{project.description}</p>

        {project.links && <LinkList links={project.links} />}
      </motion.div>
    </Container>
  )
}
