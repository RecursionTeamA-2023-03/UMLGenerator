import { useEffect, useState } from 'react'
import styled from 'styled-components'
import MonacoEditor from '../atoms/editor'
import UmlPic from '../organisms/umlPic'

interface EditorPreviewProps {
  height?: string
  width?: string
  placeholder?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 1.5rem;
`

const EditorWrapper = styled.div`
  width: 50%;
  height: 50vh;
  max-width: 50%;
`

const UmlPicWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 100%;
  max-width: 50%;
`

const EditorPreview = (props: EditorPreviewProps) => {
  useEffect(() => {
    if (props.placeholder) setUmlText(props.placeholder)
  }, [])
  const [umlText, setUmlText] = useState('')
  return (
    <Wrapper>
      <EditorWrapper>
        <MonacoEditor onChange={setUmlText} placeholder={props.placeholder} height='100%' />
      </EditorWrapper>
      <UmlPicWrapper>
        <UmlPic umlText={umlText} />
      </UmlPicWrapper>
    </Wrapper>
  )
}

export default EditorPreview
