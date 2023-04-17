import { useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Project, Diagram } from '@/interfaces/dataTypes'
import DiagramEditor from '@/components/workPage/templates/diagramEditor'
import MyBoard from '@/components/workPage/templates/myBoard'
import ProjectBoard from '@/components/workPage/templates/projectBoard'
import TemplateBoard from '@/components/workPage/templates/templateBoard'
import AppBarWithDrawer from '@/components/common/templates/appBar'
import WorkDrawerList from '@/components/workPage/organisms/workDrawerList'
import { Box, Toolbar, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

type Data = (Project & { diagrams: Diagram[] })[]

const axiosConfig: AxiosRequestConfig = {
  transformResponse: (data) =>
    JSON.parse(data, (key, val) => {
      if (key === 'createdAt' || key === 'updatedAt') return new Date(val)
      else return val
    }),
}

const fetcher: Fetcher<Data, string> = async (url: string) => {
  return await axios.get(url, axiosConfig).then((res) => res.data)
}

const apiUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/api`

export default function Work() {
  const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/project`, fetcher)

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

  const handleAddProject = async () => {
    const nextProjectName = getUniqueProjectName()

    // db update api call here
    // if response is error then return

    if (!data || !nextProjectName) return

    await axios
      .post(
        `${apiUrl}/project`,
        {
          name: nextProjectName,
        },
        axiosConfig,
      )
      .then((res: AxiosResponse<Project>) => {
        const newProject = { ...res.data, diagrams: [] }
        mutate([...data, newProject])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getUniqueProjectName = (name = 'Project_1') => {
    if (!data) return
    let nextProjectName = name
    data?.forEach((p) => {
      if (p.name === nextProjectName) {
        const nameArray = nextProjectName.split('_')
        if (nameArray.length === 1 || Number.isNaN(Number(nameArray[nameArray.length - 1]))) {
          nameArray.push('1')
        } else {
          nameArray[nameArray.length - 1] = (Number(nameArray[nameArray.length - 1]) + 1).toString()
        }
        nextProjectName = nameArray.join('_')
      }
    })
    return nextProjectName
  }

  const handleEditProjectName = async (id: number, name: string) => {
    const nextProjectName = getUniqueProjectName(name)

    // db update api call here
    // if response is error then return

    if (!data || !nextProjectName) return

    await axios
      .patch(
        `${apiUrl}/project/${id}`,
        {
          name: nextProjectName,
        },
        axiosConfig,
      )
      .then((res: AxiosResponse<Project>) =>
        mutate(
          data.map((p) => {
            if (p.id !== id) return p
            else return { ...res.data, diagrams: p.diagrams }
          }),
        ),
      )
      .catch((e) => console.log(e))
  }

  const handleDeleteProject = async (id: number) => {
    // db update api call here
    // if response is error then return

    if (!data) return

    await axios
      .delete(`${apiUrl}/project/${id}`)
      .then(() => {
        handleRefreshPage()
        mutate(data.filter((p) => p.id !== id))
      })
      .catch((e) => console.log(e))
  }

  const handleAddDiagram = async (id: number) => {
    const nextDiagramName = getUniqueDiagramName(id)

    // db update api call here
    // if response is error then return

    if (!data || !nextDiagramName) return

    await axios
      .post(
        `${apiUrl}/project/${id}/diagram`,
        {
          name: nextDiagramName,
        },
        axiosConfig,
      )
      .then((res: AxiosResponse<Diagram>) =>
        mutate(
          data.map((p) => {
            if (p.id !== id) return p
            else return { ...p, diagrams: [...p.diagrams, res.data] }
          }),
        ),
      )
      .catch((e) => console.log(e))
  }

  const getUniqueDiagramName = (projectId: number, name = 'Diagram_1') => {
    if (!data) return

    let nextDiagramName = name
    const targetProject = data.find((p) => p.id === projectId)
    targetProject?.diagrams?.forEach((d) => {
      if (d.name === nextDiagramName) {
        const nameArray = nextDiagramName.split('_')
        if (nameArray.length === 1 || Number.isNaN(Number(nameArray[nameArray.length - 1]))) {
          nameArray.push('1')
        } else {
          nameArray[nameArray.length - 1] = (Number(nameArray[nameArray.length - 1]) + 1).toString()
        }
        nextDiagramName = nameArray.join('_')
      }
    })
    return targetProject ? nextDiagramName : null
  }

  const handleEditDiagramName = async (pId: number, dId: number, name: string) => {
    const nextDiagramName = getUniqueDiagramName(pId, name)

    // db update api call here
    // if response is error then return

    if (!data || !nextDiagramName) return

    await axios
      .patch(
        `${apiUrl}/project/${pId}/diagram/${dId}`,
        {
          name: nextDiagramName,
        },
        axiosConfig,
      )
      .then((res: AxiosResponse<Diagram>) =>
        mutate(
          data.map((p) => {
            if (p.id !== pId) return p
            else
              return {
                ...p,
                diagrams: p.diagrams.map((d) => {
                  if (d.id !== dId) return d
                  else return res.data
                }),
              }
          }),
        ),
      )
      .catch((e) => console.log(e))
  }

  const handleEditDiagramContent = async (pId: number, dId: number, content: string) => {
    // db update api call here
    // if response is error then return
    if (!data) return

    await axios
      .patch(
        `${apiUrl}/project/${pId}/diagram/${dId}`,
        {
          content: content,
        },
        axiosConfig,
      )
      .then((res: AxiosResponse<Diagram>) =>
        mutate(
          data.map((p) => {
            if (p.id !== pId) return p
            else
              return {
                ...p,
                diagrams: p.diagrams.map((d) => {
                  if (d.id !== dId) return d
                  else return res.data
                }),
              }
          }),
        ),
      )
      .catch((e) => console.log(e))
  }

  const handleDeleteDiagram = async (pId: number, dId: number) => {
    // db update api call here
    // if response is error then return
    if (!data) return

    await axios
      .delete(`${apiUrl}/project/${pId}/diagram/${dId}`)
      .then(() => {
        setDiagramId(null)
        mutate(
          data.map((p) => {
            if (p.id !== pId) return p
            else return { ...p, diagrams: p.diagrams.filter((d) => d.id !== dId) }
          }),
        )
      })
      .catch((e) => console.log(e))
  }

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
                project={
                  data?.find((p) => p.id === projectId) as Project & {
                    diagrams: Diagram[]
                  }
                }
                editProjectName={handleEditProjectName}
                handleSelectDiagram={handleSelectDiagram}
                addDiagram={handleAddDiagram}
                deleteProject={handleDeleteProject}
              />
            )
          ) : (
            <MyBoard
              projects={data}
              editProjectName={handleEditProjectName}
              addDiagram={handleAddDiagram}
              handleSelectDiagram={handleSelectDiagram}
            />
          )
        ) : (
          <TemplateBoard />
        )}
      </Box>
    </>
  )
}
