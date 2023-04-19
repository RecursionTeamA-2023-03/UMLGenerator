import { Project, Diagram } from '@/interfaces/dataTypes'
import styled from 'styled-components'
import DiagramsInProject from '../organisms/diagramsInProject'
import ProjectMembers from '../organisms/projectMembers'

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
  const handleDeleteProject = () => {
    if (confirm('Do you really want to delete this project?') && project) deleteProject(project.id)
  }
  return (
    <>
      {!project ? (
        <></>
      ) : (
        <>
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
            {<ProjectMembers projectId={project.id} />}
          </div>
          <DeleteButton onClick={handleDeleteProject}>このプロジェクトを削除</DeleteButton>
        </>
      )}
    </>
  )
}

const DeleteButton = styled.button`
  width: 100%;
  color: red;
  background-color: white;
  border: 3px solid red;
  border-radius: 5px;
  padding: 6px 16px;
  margin-top: 50px;

  &:hover {
    color: white;
    background-color: red;
  }
`
