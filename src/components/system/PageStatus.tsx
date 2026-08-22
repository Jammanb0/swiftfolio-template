import type { ReactNode } from 'react'
import * as styles from './PageStatus.css'

type PageStatusProps = {
  kind: 'loading' | 'error'
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}

export function PageStatus({ kind, eyebrow, title, description, actions }: PageStatusProps) {
  return (
    <section
      className={styles.section}
      role={kind === 'error' ? 'alert' : 'status'}
      aria-live={kind === 'error' ? 'assertive' : 'polite'}
      aria-busy={kind === 'loading'}
    >
      <div className={styles.panel}>
        {kind === 'loading' ? (
          <div className={styles.signal} aria-hidden="true">
            <span className={styles.signalLine} />
            <span className={styles.signalLine} />
            <span className={styles.signalLine} />
          </div>
        ) : (
          <div className={styles.errorSignal} aria-hidden="true">
            <span className={styles.errorSignalBar} />
            <span className={styles.errorSignalBar} />
            <span className={styles.errorSignalBar} />
          </div>
        )}

        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  )
}
