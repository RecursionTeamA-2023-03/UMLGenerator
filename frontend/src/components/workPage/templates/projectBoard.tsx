import styled from 'styled-components'
import useProjectData from '@/hooks/useProjectData'
import DiagramsInProject from '../organisms/diagramsInProject'
import ProjectMembers from '../organisms/projectMembers'
import { CircularProgress } from '@mui/material'

type Props = {
  projectId: number
  handleSelectDiagram: (dId: number, pId?: number) => void
  handleRefreshPage: () => void
}

export default function ProjectBoard({ projectId, handleSelectDiagram, handleRefreshPage }: Props) {
  const { isLoading, handlers } = useProjectData()

  const handleDeleteProject = () => {
    if (confirm('Do you really want to delete this project?') && projectId)
      handlers.project.delete(projectId, handleRefreshPage)
  }
  return (
    <>
      <DiagramsInProject projectId={projectId} handleSelectDiagram={handleSelectDiagram} />
      <div>
        <p>メンバー</p>
        {isLoading ? <CircularProgress /> : <ProjectMembers projectId={projectId} />}
      </div>
      <DeleteButton onClick={handleDeleteProject}>このプロジェクトを削除</DeleteButton>
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
