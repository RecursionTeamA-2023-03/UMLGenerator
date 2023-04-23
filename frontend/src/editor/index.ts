import { activityKeywords, activityRoot, activityTheme } from './activityDiagramSyntax'
import { ganttKeywords } from './ganttDiagramSyntax'
import { sequenceKeywords, sequenceRoot, sequenceTheme } from './sequenceDiagramSyntax'
import { stateKeywords, stateRoot, stateTheme } from './stateDiagram.Syntax'
import { usecaseKeywords, usecaseRoot, usecaseTheme } from './usecaseDiagram'

export const plantumlConstants = ['@startuml', '@enduml', '@startgantt', '@endgantt']

export const plantumlKeywords = [
  ...sequenceKeywords,
  ...usecaseKeywords,
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
  { regex: /[{}()[\]]/, action: 'brackets' },
  { regex: /[;:]/, action: 'punctuation' },
  { regex: /^[0-9]+(\.[0-9]+)?$/, action: 'number' },
  ...sequenceRoot,
  ...activityRoot,
  ...usecaseRoot,
  ...stateRoot,
  { regex: /'.*$/, action: 'comment' },
]

export const plantumlThemes = [
  { token: 'variable', foreground: '#F8F8F8' },
  { token: 'comment', foreground: '#6A9955', fontStyle: 'italic' },
  { token: 'keyword', foreground: '#4f8abc', fontStyle: 'bold' },
  { token: 'string', foreground: '#CE9178' },
  { token: 'brackets', foreground: '#FFA500' },
  { token: 'operator', foreground: 'ee7800' },
  { token: 'constant', foreground: '#c586c0', fontStyle: 'bold' },
  { token: 'punctuation', foreground: '#49ade3' },
  { token: 'number', foreground: '#333333' },
  { token: 'class', foreground: '#B5CEA8' },
  ...sequenceTheme,
  ...usecaseTheme,
  ...activityTheme,
  ...stateTheme,
]
