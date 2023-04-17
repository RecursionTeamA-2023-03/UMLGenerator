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
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`

const UmlPicWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  max-width: 50%;
  max-height: 50%;
`

const EditorPreview = (props: EditorPreviewProps) => {
  useEffect(() => {
    if (props.placeholder) setUmlText(props.placeholder)
  }, [])
  const [umlText, setUmlText] = useState('')
  return (
    <Wrapper>
      <MonacoEditor
        onChange={setUmlText}
        placeholder={props.placeholder}
        width='50%'
        height='50vh'
      />
      <UmlPicWrapper>
        <UmlPic umlText={umlText} />
      </UmlPicWrapper>
    </Wrapper>
  )
}

export default EditorPreview
