import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Project } from '@/types/project'
import { Tag } from '@/components/ui/Tag'
import { card, thumb, thumbFallback, body, title, summary, tagRow } from './ProjectCard.css'

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/projects/${project.id}`} className={card}>
        <div
          className={thumb}
          style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})` } : undefined}
        >
          {!project.thumbnail && (
            <div className={thumbFallback}>{project.title.slice(0, 1)}</div>
          )}
        </div>
        <div className={body}>
          <h3 className={title}>{project.title}</h3>
          <p className={summary}>{project.summary}</p>
          <div className={tagRow}>
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
