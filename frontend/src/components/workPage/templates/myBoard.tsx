import { Project, Diagram } from '@/interfaces/dataTypes'
import CurrentDiagrams from '../organisms/currentDiagrams'
import DiagramsInProject from '../organisms/diagramsInProject'
import styled from 'styled-components'

type Props = {
  projects?: (Project & { diagrams: Diagram[] })[]
  editProjectName: (id: number, name: string) => void
  addDiagram: (projectId: number) => void
  handleSelectDiagram: (dId: number, pId?: number) => void
}

export default function MyBoard({
  projects,
  editProjectName,
  addDiagram,
  handleSelectDiagram,
}: Props) {
  return (
    <Container>
      <CurrentDiagrams projects={projects} handleSelectDiagram={handleSelectDiagram} />
      {projects?.map((p) => {
        return (
          <DiagramsInProject
            key={p.id}
            projectId={p.id}
            projectName={p.name}
            diagrams={p.diagrams}
            handleSelectDiagram={handleSelectDiagram}
            addDiagram={addDiagram}
            editProjectName={editProjectName}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding-left: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
