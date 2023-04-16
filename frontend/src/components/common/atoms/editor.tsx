import * as React from 'react'
import Editor, { BeforeMount } from '@monaco-editor/react'
import { plantumlKeywords, plantumlRoot, plantumlThemes } from '@/editor'

interface EditorProps {
  heigth?: string
  width?: string
  content?: string
  handleChange?: (newString: string | undefined) => void
}

const MonacoEditor = (props: EditorProps) => {
  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.register({ id: 'plantuml' })
    const keywords = plantumlKeywords
    const root = plantumlRoot
    const rules = plantumlThemes
    monaco.languages.setMonarchTokensProvider('plantuml', {
      keywords,
      tokenizer: {
        root: root,
      },
    })

    monaco.editor.defineTheme('plantuml', {
      base: 'vs',
      inherit: false,
      rules: rules,
      colors: {},
    })
  }

  return (
    <Editor
      width={props.width}
      height={props.heigth}
      value={props.content ?? ''}
      onChange={props.handleChange}
      language='plantuml'
      theme='plantuml'
      beforeMount={handleBeforeMount}
    />
  )
}

export default MonacoEditor
