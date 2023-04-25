import MonacoEditor from '@/components/common/atoms/editor'
import UmlPic from '@/components/common/organisms/umlPic'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface EditorPreviewProps {
  height?: string
  width?: string
  placeholder?: string
  imgWidth?: string
  imgHeight?: string
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

const EditorPreview = ({
  width = '40%',
  height = '25vh',
  placeholder,
  imgWidth = 'auto',
  imgHeight = '100%',
}: EditorPreviewProps) => {
  useEffect(() => {
    if (placeholder) setUmlText(placeholder)
  }, [])
  const [umlText, setUmlText] = useState('')
  return (
    <Wrapper>
      <MonacoEditor onChange={setUmlText} placeholder={placeholder} width={width} height={height} />
      <UmlPicWrapper>
        <UmlPic umlText={umlText} width={imgWidth} height={imgHeight} />
      </UmlPicWrapper>
    </Wrapper>
  )
}

export default EditorPreview
