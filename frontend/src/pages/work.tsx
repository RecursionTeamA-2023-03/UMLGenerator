import { useState } from 'react'
import DiagramEditor from '@/components/workPage/templates/diagramEditor'
import MyBoard from '@/components/workPage/templates/myBoard'
import ProjectBoard from '@/components/workPage/templates/projectBoard'
import TemplateBoard from '@/components/workPage/templates/templateBoard'
import AppBarWithDrawer from '@/components/common/templates/appBar'
import WorkDrawerList from '@/components/workPage/organisms/workDrawerList'
import { Box, Toolbar, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import getTemplate from 'lib/template'
import useProjectData from '@/hooks/useProjectData'

type Template = {
  name: string
  content: string[]
}
type Props = {
  templates: Template[]
}

export default function Work({ templates }: Props) {
  const [isMyBoard, setIsMyBoard] = useState<boolean>(true)
  const [projectId, setProjectId] = useState<number | null>(null)
  const [diagramId, setDiagramId] = useState<number | null>(null)

  const router = useRouter()

  const handleSelectBoard = (b: boolean) => {
    setIsMyBoard(b)
    setProjectId(null)
    setDiagramId(null)
  }

  const handleSelectProject = (id: number) => {
    setDiagramId(null)
    setProjectId(id)
    setIsMyBoard(true)
  }

  const handleSelectDiagram = (dId: number, pId?: number) => {
    if (pId) setProjectId(pId)
    setDiagramId(dId)
    setIsMyBoard(true)
  }

  const handleRefreshPage = () => handleSelectBoard(true)

  const { error, isLoading } = useProjectData()

  if (isLoading)
    return (
      <>
        <AppBarWithDrawer />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <CircularProgress />
        </Box>
      </>
    )

  if (error) router.push('/')

  return (
    <>
      <AppBarWithDrawer withDrawer={true}>
        <WorkDrawerList
          isMyBoard={isMyBoard}
          projectId={projectId}
          handleSelectBoard={handleSelectBoard}
          handleSelectProject={handleSelectProject}
        />
      </AppBarWithDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {isMyBoard ? (
          projectId ? (
            diagramId ? (
              <DiagramEditor
                projectId={projectId}
                diagramId={diagramId}
                setDiagramId={setDiagramId}
              />
            ) : (
              <ProjectBoard
                projectId={projectId}
                handleSelectDiagram={handleSelectDiagram}
                handleRefreshPage={handleRefreshPage}
              />
            )
          ) : (
            <MyBoard handleSelectDiagram={handleSelectDiagram} />
          )
        ) : (
          <TemplateBoard templates={templates} />
        )}
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const templates = await getTemplate()
  return {
    props: templates,
  }
}
