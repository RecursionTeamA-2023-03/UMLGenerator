import styled from 'styled-components'
import { Diagram } from '@/interfaces/dataTypes'
import { useState } from 'react'
import RectButton from '../atoms/rectButton'
import Icon from '../atoms/icon'

type Props = {
  projectId: number
  projectName: string
  diagrams: Diagram[]
  handleSelectDiagram: (dId: number, pId?: number) => void
  addDiagram: (projectId: number) => void
  editProjectName: (id: number, name: string) => void
}

export default function DiagramsInProject({
  projectId,
  projectName,
  diagrams,
  handleSelectDiagram,
  addDiagram,
  editProjectName,
}: Props) {
  const [nameEdit, setNameEdit] = useState(false)
  const [name, setName] = useState(projectName)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {!nameEdit ? (
          <>
            <p>{name}</p>
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
                editProjectName(projectId, name)
                setNameEdit(false)
              }}
            >
              保存
            </CustomButton>
            <CustomButton
              onClick={() => {
                setName(projectName)
                setNameEdit(false)
              }}
            >
              キャンセル
            </CustomButton>
          </>
        )}
      </div>
      <Container>
        {diagrams.map((d) => {
          return (
            <RectButton
              key={d.id}
              name={d.name}
              color='blue'
              onClick={() => handleSelectDiagram(d.id, projectId)}
            />
          )
        })}
        <RectButton name='新規作成' color='darkgray' onClick={() => addDiagram(projectId)} />
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: row;
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
