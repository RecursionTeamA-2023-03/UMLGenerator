export const activityKeywords = [
  'start',
  'stop',
  'end',
  '!pragma useVerticalIf on',
  'switch',
  'cace',
  'endswitch',
  'kill',
  'detach',
  'repeat',
  'repeat while',
  'backward',
  'break',
]

export const activityRoot = [{ regex: /-*>/, action: 'arrow' }]

export const activityTheme = [{ token: 'arrow', foreground: 'ee7800', fontStyle: 'bold' }]
