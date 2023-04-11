import * as React from 'react'
import Editor, { BeforeMount } from '@monaco-editor/react'
import { plantumlConstants, plantumlKeywords, plantumlRoot, plantumlThemes } from '@/editor'

interface EditorProps {
  heigth?: string
  width?: string
  onChange: (value: string) => void
}

const MonacoEditor = (props: EditorProps) => {
  const handleChange = React.useCallback(
    (value: string | undefined) => {
      if (value !== undefined) {
        props.onChange(value)
      }
    },
    [props.onChange],
  )
  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.register({ id: 'plantuml' })
    const constants = plantumlConstants
    const keywords = plantumlKeywords
    const root = plantumlRoot
    const rules = plantumlThemes
    monaco.languages.setMonarchTokensProvider('plantuml', {
      constants,
      keywords,
      tokenizer: {
        root: root,
      },
    })
    monaco.languages.setLanguageConfiguration('plantuml', {
      autoClosingPairs: [
        { open: '(', close: ')', notIn: ['string', 'comment'] },
        { open: '[', close: ']', notIn: ['string', 'comment'] },
        { open: '{', close: '}', notIn: ['string', 'comment'] },
      ],
      brackets: [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
      ],
    })
    monaco.languages.registerCompletionItemProvider('plantuml', {
      triggerCharacters: ['@'],
      provideCompletionItems: (model, position) => {
        const suggestions = [
          {
            label: '@startuml',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: '@startuml\n\n@enduml',
            range: new monaco.Range(position.lineNumber, 1, position.lineNumber, position.column),
          },
        ]

        return {
          suggestions,
          incomplete: false,
        }
      },
    })

    monaco.editor.defineTheme('plantuml', {
      base: 'vs',
      inherit: true,
      rules: rules,
      colors: {},
    })
  }
  return (
    <Editor
      width={props.width}
      height={props.heigth}
      language='plantuml'
      theme='plantuml'
      beforeMount={handleBeforeMount}
      onChange={handleChange}
    />
  )
}

export default MonacoEditor
