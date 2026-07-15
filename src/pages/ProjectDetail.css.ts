import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const wrapper = style({
  padding: `${vars.space[10]} 0 ${vars.space[24]}`,
})

export const back = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
  fontSize: vars.fontSize.small,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  marginBottom: vars.space[8],
  selectors: {
    '&:hover': {
      color: vars.color.textPrimary,
    },
  },
})

export const header = style({
  marginBottom: vars.space[8],
})

export const dateText = style({
  fontSize: vars.fontSize.caption,
  color: vars.color.textTertiary,
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space[3],
})

export const title = style({
  fontSize: vars.fontSize.h1,
  fontWeight: vars.fontWeight.extrabold,
  letterSpacing: '-0.02em',
  color: vars.color.textPrimary,

  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: vars.fontSize.h2,
    },
  },
})

export const tagRow = style({
  display: 'flex',
  gap: vars.space[2],
  marginTop: vars.space[5],
})

export const media = style({
  marginBottom: vars.space[10],
})

export const thumbFallback = style({
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: vars.radius.lg,
  background: `linear-gradient(135deg, ${vars.color.blue50}, ${vars.color.gray100})`,
})

export const description = style({
  fontSize: vars.fontSize.bodyLg,
  lineHeight: vars.lineHeight.body,
  color: vars.color.textSecondary,
  whiteSpace: 'pre-line',
  maxWidth: '68ch',
  marginBottom: vars.space[10],
})
