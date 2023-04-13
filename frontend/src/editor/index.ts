import { activityKeywords, activityRoot, activityTheme } from './activityDiagramSyntax'
import { ganttKeywords } from './ganttDiagramSyntax'
import { sequenceKeywords, sequenceRoot, sequenceTheme } from './sequenceDiagramSyntax'
import { stateKeywords, stateRoot, stateTheme } from './stateDiagram.Syntax'

export const plantumlConstants = ['@startuml', '@enduml', '@startgantt', '@endgantt']

export const plantumlKeywords = [
  ...sequenceKeywords,
  ...activityKeywords,
  ...stateKeywords,
  ...ganttKeywords,
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
  { regex: /[;:]/, action: 'punctuation' },
  { regex: /^[0-9]+(\.[0-9]+)?$/, action: 'number' },
  ...sequenceRoot,
  ...activityRoot,
  ...stateRoot,
]

export const plantumlThemes = [
  { token: 'variable', foreground: '#333333' },
  { token: 'comment', foreground: '008800' },
  { token: 'keyword', foreground: '#4169E1', fontStyle: 'bold' },
  { token: 'string', foreground: 'ff0000' },
  { token: 'brackets', foreground: '#FFA500' },
  { token: 'operator', foreground: 'ee7800' },
  { token: 'constant', foreground: '#6A9955', fontStyle: 'bold' },
  { token: 'punctuation', foreground: '#88aadd' },
  { token: 'number', forgeground: '#333333' },
  ...sequenceTheme,
  ...activityTheme,
  ...stateTheme,
]
