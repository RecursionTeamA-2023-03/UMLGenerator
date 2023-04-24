import * as React from 'react'
import Editor, { BeforeMount } from '@monaco-editor/react'
import { plantumlConstants, plantumlKeywords, plantumlRoot, plantumlThemes } from '@/editor'

interface EditorProps {
  height?: string
  width?: string
  placeholder?: string
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
        const inputText = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        })
        const hasStartUml = inputText.includes('@startuml')
        if (hasStartUml && inputText.indexOf('@startuml') !== inputText.lastIndexOf('@startuml')) {
          return {
            suggestions: [],
            incomplete: false,
          }
        }

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
      base: 'vs-dark',
      inherit: true,
      rules: rules,
      colors: { 'editor.foreground': '#F8F8F8' },
    })
  }
  return (
    <Editor
      width={props.width}
      height={props.height}
      language='plantuml'
      theme='plantuml'
      beforeMount={handleBeforeMount}
      onChange={handleChange}
      value={props.placeholder}
    />
  )
}

export default MonacoEditor
