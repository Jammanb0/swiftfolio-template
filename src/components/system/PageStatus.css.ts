import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

const loadingSweep = keyframes({
  '0%': { transform: 'translateX(-110%)' },
  '100%': { transform: 'translateX(310%)' },
})

export const section = style({
  display: 'flex',
  minHeight: '60vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.space[16]} ${vars.space[6]}`,
})

export const panel = style({
  width: '100%',
  maxWidth: '560px',
  padding: vars.space[10],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  backgroundColor: vars.color.white,
  boxShadow: vars.shadow.card,
  textAlign: 'center',
  '@media': {
    '(max-width: 640px)': {
      padding: `${vars.space[8]} ${vars.space[6]}`,
    },
  },
})

export const signal = style({
  display: 'grid',
  gap: vars.space[3],
  width: '120px',
  margin: `0 auto ${vars.space[8]}`,
})

export const signalLine = style({
  position: 'relative',
  height: vars.space[2],
  overflow: 'hidden',
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.blue100,
  selectors: {
    '&::after': {
      position: 'absolute',
      inset: 0,
      width: '36%',
      borderRadius: vars.radius.full,
      backgroundColor: vars.color.blue500,
      content: '',
      animation: `${loadingSweep} 1.4s ease-in-out infinite`,
    },
    '&:nth-child(2)': {
      width: '76%',
      marginLeft: 'auto',
    },
    '&:nth-child(2)::after': {
      animationDelay: '0.16s',
    },
    '&:nth-child(3)': {
      width: '52%',
      marginRight: 'auto',
    },
    '&:nth-child(3)::after': {
      animationDelay: '0.32s',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      selectors: {
        '&::after': {
          animation: 'none',
          transform: 'translateX(90%)',
        },
      },
    },
  },
})

export const errorSignal = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  width: vars.space[16],
  height: vars.space[16],
  margin: `0 auto ${vars.space[8]}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.blue50,
})

export const errorSignalBar = style({
  width: vars.space[2],
  height: vars.space[6],
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.blue500,
  selectors: {
    '&:first-child': {
      height: vars.space[3],
    },
    '&:last-child': {
      height: vars.space[4],
    },
  },
})

export const eyebrow = style({
  marginBottom: vars.space[3],
  color: vars.color.blue600,
  fontSize: vars.fontSize.small,
  fontWeight: vars.fontWeight.semibold,
})

export const title = style({
  color: vars.color.textPrimary,
  fontSize: vars.fontSize.h3,
  fontWeight: vars.fontWeight.bold,
  lineHeight: vars.lineHeight.heading,
})

export const description = style({
  maxWidth: '420px',
  margin: `${vars.space[4]} auto 0`,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
})

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: vars.space[3],
  marginTop: vars.space[8],
})
