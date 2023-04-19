import { useEffect, useState } from 'react'
import styled from 'styled-components'
import MonacoEditor from '../atoms/editor'

interface EditorProps {
  height?: string
  width?: string
  placeholder?: string
  imgPath?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const Editor = (props: EditorProps) => {
  useEffect(() => {
    if (props.placeholder) setUmlText(props.placeholder)
  }, [])
  const [umlText, setUmlText] = useState('')
  return (
    <Wrapper>
      <MonacoEditor
        onChange={setUmlText}
        placeholder={props.placeholder}
        width='40%'
        height='25vh'
      />
      <img src={`${props.imgPath}`} height='100%' alt='' />
    </Wrapper>
  )
}

export default Editor
