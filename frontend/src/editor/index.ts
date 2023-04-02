import { sequenceKeywords, sequenceRoot, sequenceTheme } from './sequenceDiagramSyntax'

export const plantumlKeywords = ['@startuml', '@enduml', ...sequenceKeywords]

export const plantumlRoot = [
  {
    regex: /@?[a-zA-Z][\w$]*/,
    action: {
      cases: {
        '@keywords': 'keyword',
        '@default': 'variable',
      },
    },
  },
  { regex: /".*?"/, action: 'string' },
  { regex: /'[^']*'/, action: 'string' },
  { regex: /\/\/.*$/, action: 'comment' },
  { regex: /[{}()[\]]/, action: '@brackets' },
  { regex: /[-+|]/, action: 'operator' },
  ...sequenceRoot,
]

export const plantumlThemes = [
  { token: 'comment', foreground: '008800' },
  { token: 'keyword', foreground: '0000ff', fontStyle: 'bold' },
  { token: 'string', foreground: 'ff0000' },
  { token: 'brackets', foreground: '0000ff' },
  { token: 'operator', foreground: 'ee7800' },
  ...sequenceTheme,
]
