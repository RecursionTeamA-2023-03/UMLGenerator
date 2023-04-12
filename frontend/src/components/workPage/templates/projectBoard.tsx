import { Project, Diagram } from '@/interfaces/dataTypes'
import styled from 'styled-components'
import DiagramsInProject from '../organisms/diagramsInProject'

type Props = {
  project?: Project & { diagrams: Diagram[] }
  editProjectName: (id: number, name: string) => void
  handleSelectDiagram: (dId: number, pId?: number) => void
  addDiagram: (projectId: number) => void
  deleteProject: (id: number) => void
}

export default function ProjectBoard({
  project,
  handleSelectDiagram,
  editProjectName,
  addDiagram,
  deleteProject,
}: Props) {
  return (
    <Container>
      {!project? <></> : <>
        <DiagramsInProject
        projectName={project.name}
        projectId={project.id}
        diagrams={project.diagrams}
        handleSelectDiagram={handleSelectDiagram}
        addDiagram={addDiagram}
        editProjectName={editProjectName}
      />
      <div>
        <p>メンバー</p>
        {
          // <Owners />
          '*現在はまだグループ対応DBが無いので一時的に中身なし'
        }
      </div>
      <DeleteButton onClick={() => deleteProject(project.id)}>このプロジェクトを削除</DeleteButton>
      </>}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

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
