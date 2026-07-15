import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { profile } from '@/data/profile'
import {
  section,
  blob,
  blobSecondary,
  content,
  eyebrow,
  headline,
  headlineLine,
  bio,
  actions,
} from './Hero.css'

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const lines = self.selector?.('[data-hero-line]')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero-eyebrow]', { opacity: 0, y: 16, duration: 0.5 })
        .from(lines ?? [], { yPercent: 110, duration: 0.7, stagger: 0.08 }, '-=0.25')
        .from('[data-hero-bio]', { opacity: 0, y: 16, duration: 0.5 }, '-=0.35')
        .from('[data-hero-actions]', { opacity: 0, y: 16, duration: 0.5 }, '-=0.35')
        .from(
          '[data-hero-blob]',
          { opacity: 0, scale: 0.8, duration: 1, stagger: 0.1, ease: 'power2.out' },
          0,
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const lines = profile.tagline.split('\n')

  return (
    <section className={section} ref={rootRef}>
      <div className={blob} data-hero-blob />
      <div className={blobSecondary} data-hero-blob />
      <Container className={content}>
        <span className={eyebrow} data-hero-eyebrow>
          {profile.role}
        </span>
        <h1 className={headline}>
          {lines.map((line, i) => (
            <span className={headlineLine} key={i}>
              <span data-hero-line style={{ display: 'inline-block' }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className={bio} data-hero-bio>
          {profile.bio}
        </p>
        <div className={actions} data-hero-actions>
          <Button to="/projects" tone="primary" size="lg">
            프로젝트 보기
          </Button>
          <Button href={`mailto:${profile.email}`} tone="secondary" size="lg">
            이메일 보내기
          </Button>
        </div>
      </Container>
    </section>
  )
}
