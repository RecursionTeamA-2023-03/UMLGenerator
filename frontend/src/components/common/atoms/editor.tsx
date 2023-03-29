import React, { useRef, useEffect } from 'react'
import * as monaco from 'monaco-editor'
import plantumlLanguage from '@sinm/monaco-plantuml'
import Editor from '@monaco-editor/react'

const NewEditor = () => {
  return <Editor height='100vh' defaultLanguage='markdown' defaultValue='# Write your own story' />
}

export default NewEditor
