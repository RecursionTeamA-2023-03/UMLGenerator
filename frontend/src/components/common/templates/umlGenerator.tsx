import UmlEditor from '../organisms/umlEditor'
import UmlPic from '../organisms/umlPic'

import { useState } from 'react'

export default function UmlGenerator() {
  const [umlText, setUmlText] = useState('')

  return (
    <>
      <UmlEditor umlText={umlText} setUmlText={setUmlText} />
      <h1>↓↓↓↓↓↓↓↓↓↓</h1>
      <UmlPic umlText={umlText} />
    </>
  )
}
