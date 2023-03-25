import { Diagram } from '@prisma/client'
import styled from 'styled-components'
import { useState } from 'react'
import UmlEditor from '@/components/common/organisms/umlEditor'
import UmlPic from '@/components/common/organisms/umlPic'
import Icon from '../atoms/icon'

type Props = {
  projectId: number
  diagram: Diagram
  editDiagramName: (projectId: number, diagramId: number, name: string) => void
  editDiagramContent: (projectId: number, diagramId: number, content: string) => void
  deleteDiagram: (projectId: number, diagramId: number) => void
}

export default function DiagramEditor({
  projectId,
  diagram,
  editDiagramName,
  editDiagramContent,
  deleteDiagram,
}: Props) {
  const [content, setContent] = useState(diagram.content ?? '')
  const [nameEdit, setNameEdit] = useState(false)
  const [name, setName] = useState(diagram.name)

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {!nameEdit ? (
          <>
            <p>{diagram.name}</p>
            <button
              onClick={() => setNameEdit(true)}
              style={{
                backgroundColor: 'white',
                border: 'none',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
            >
              <Icon srcPath='/edit-icon.png' />
            </button>
          </>
        ) : (
          <>
            <input onChange={(e) => setName(e.target.value)} value={name} />
            <CustomButton
              onClick={() => {
                editDiagramName(projectId, diagram.id, name)
                setNameEdit(false)
              }}
            >
              保存
            </CustomButton>
            <CustomButton
              onClick={() => {
                setName(diagram.name)
                setNameEdit(false)
              }}
            >
              キャンセル
            </CustomButton>
          </>
        )}
      </div>
      <UmlEditor umlText={content} setUmlText={setContent} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <CustomButton onClick={() => editDiagramContent(projectId, diagram.id, content)}>
          変更を保存
        </CustomButton>
        {
          // file download feature is not finished yet.
        }
        <CustomButton onClick={() => {}}>ダウンロード</CustomButton>
        <select>
          <option value='png'>png</option>
          <option value='svg'>svg</option>
        </select>
      </div>
      <UmlPic umlText={content} />
      <DeleteButton
        onClick={() => {
          setName('')
          setContent('')
          deleteDiagram(projectId, diagram.id)
        }}
      >
        このダイアグラムを削除
      </DeleteButton>
    </Container>
  )
}

const DeleteButton = styled.button`
  width: 100%;
  color: red;
  background-color: white;
  border: 3px solid red;
  border-radius: 5px;
  margin-top: 50px;

  &:hover {
    color: white;
    background-color: red;
  }
`

const Container = styled.div`
  width: 100%;
  padding-left: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const CustomButton = styled.button`
  margin-left: 3px;
  margin-bottom: 3px;
  color: lightgray;
  background-color: white;
  border: solid 3px lightgray;
  border-radius: 3px;

  &:hover {
    color: white;
    background-color: darkgray;
  }
`
