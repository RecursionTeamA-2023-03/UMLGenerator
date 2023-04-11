import { activityKeywords } from './activityDiagramSyntax'
import { sequenceKeywords, sequenceRoot, sequenceTheme } from './sequenceDiagramSyntax'

export const plantumlConstants = ['@startuml', '@enduml']

export const plantumlKeywords = [
  'if',
  'then',
  'is',
  'else',
  'elseif',
  'endif',
  ...sequenceKeywords,
  ...activityKeywords,
]

export const plantumlRoot = [
  {
    regex: /@?[a-zA-Z][\w$]*/,
    action: {
      cases: {
        '@constants': 'constant',
        '@keywords': 'keyword',
        '@default': 'variable',
      },
    },
  },
  { regex: /".*?"/, action: 'string' },
  { regex: /'[^']*'/, action: 'string' },
  { regex: /\/\/.*$/, action: 'comment' },
  { regex: /[{}()[\]]/, action: 'brackets' },
  { regex: /[-+|]/, action: 'operator' },
  ...sequenceRoot,
]

export const plantumlThemes = [
  { token: 'comment', foreground: '008800' },
  { token: 'keyword', foreground: '#4169E1', fontStyle: 'bold' },
  { token: 'string', foreground: 'ff0000' },
  { token: 'brackets', foreground: '#FFA500' },
  { token: 'operator', foreground: 'ee7800' },
  { token: 'constant', foreground: '#6A9955', fontStyle: 'bold' },
  ...sequenceTheme,
]
