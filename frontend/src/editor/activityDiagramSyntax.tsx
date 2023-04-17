export const activityKeywords = [
  'start',
  'stop',
  'end',
  'if',
  'then',
  'is',
  'else',
  'elseif',
  'endif',
  'equals',
  '!pragma useVerticalIf on',
  'switch',
  'case',
  'endswitch',
  'kill',
  'detach',
  'repeat',
  'repeat while',
  'while',
  'endwhile',
  'backward',
  'break',
  'fork',
  'again',
  'merge',
  'split',
]

export const activityRoot = [{ regex: /-\[hidden\]->/, action: 'inf' }]

export const activityTheme = [{ token: 'inf', foreground: '#ff0000', fontStyle: 'bold' }]
