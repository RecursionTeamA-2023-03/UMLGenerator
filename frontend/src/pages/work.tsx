import { useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import { Project, Diagram } from '@/interfaces/dataTypes'
import { isProject, isDiagram } from '@/types/data.guard'
import styled from 'styled-components'
import Header from '@/components/common/organisms/header'
import Sidebar from '@/components/workPage/templates/sidebar'
import DiagramEditor from '@/components/workPage/templates/diagramEditor'
import MyBoard from '@/components/workPage/templates/myBoard'
import ProjectBoard from '@/components/workPage/templates/projectBoard'
import TemplateBoard from '@/components/workPage/templates/templateBoard'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

type Data = (Project & { diagrams: Diagram[]})[] | []

const axiosConfig: AxiosRequestConfig = {
  transformResponse: (data) => JSON.parse(data, (key, val)=>{
    if(key==="createdAt"||key==="updatedAt") return new Date(val)
    else return val
  })
}

const fetcher: Fetcher<Data, string> = async (url:string) => {
  return await axios.get(url, axiosConfig).then(res=>res.data)
}
const api_url = process.env.AWS_IP_ADDRESS || 'localhost:443'

export default function Work() {
  const { data, error, isLoading, mutate } = useSWR(`https://${api_url}/api/project`, fetcher)
  
  const [isMyBoard, setIsMyBoard] = useState<boolean>(true)
  const [projectId, setProjectId] = useState<number | null>(null)
  const [diagramId, setDiagramId] = useState<number | null>(null)

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

    if(!data || !nextProjectName) return
    
    await axios.post(`https://${api_url}/api/project`, 
      {
        name: nextProjectName,
      },
      axiosConfig
    ).then((res: AxiosResponse<Project>) => {
      const newProject = {...res.data, diagrams: []}
      mutate([ ...data, newProject ])
    }).catch((error) => {
      console.log(error)
    })
  }

  const getUniqueProjectName = (name = 'Project_1') => {
    if(!data) return
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

    if(!data || !nextProjectName) return

    await axios.patch(`https://${api_url}/api/project/${id}`, 
      {
        name: nextProjectName
      },
      axiosConfig
    ).then((res: AxiosResponse<Project>) => mutate(data.map(p=>{
      if(p.id !== id) return p
      else return { ...res.data, diagrams: p.diagrams }
    }))).catch(e=>console.log(e))
    
  }

  const handleDeleteProject = async (id: number) => {
    // db update api call here
    // if response is error then return

    if(!data) return

    await axios.delete(`https://${api_url}/api/project/${id}`)
    .then(() => {
      handleRefreshPage()
      mutate(data.filter(p=> p.id !== id))}
    )
    .catch(e=>console.log(e))
  }

  const handleAddDiagram = async (id: number) => {
    const nextDiagramName = getUniqueDiagramName(id)
    
    // db update api call here
    // if response is error then return

    if(!data || !nextDiagramName) return

    await axios.post(`https://${api_url}/api/project/${id}/diagram`,
      {
        name: nextDiagramName
      },
      axiosConfig
    ).then((res: AxiosResponse<Diagram>) => mutate(data.map(p=>{
      if(p.id !== id) return p
      else return {...p, diagrams: [...p.diagrams, res.data]}
    }))).catch(e=>console.log(e))
  }

  const getUniqueDiagramName = (projectId: number, name = 'Diagram_1') => {
    if(!data) return

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

    if(!data || !nextDiagramName) return

    await axios.patch(`https://${api_url}/api/project/${pId}/diagram/${dId}`,
      {
        name: nextDiagramName
      },
      axiosConfig
    ).then((res: AxiosResponse<Diagram>) => mutate(data.map(p=>{
      if(p.id !== pId) return p
      else return {...p, diagrams: p.diagrams.map(d=>{
        if(d.id !== dId) return d
        else return res.data
      })}
    }))).catch(e=>console.log(e))
  }

  const handleEditDiagramContent = async (pId: number, dId: number, content: string) => {
    // db update api call here
    // if response is error then return
    if(!data) return

    await axios.patch(`https://${api_url}/api/project/${pId}/diagram/${dId}`,
      {
        content: content
      },
      axiosConfig
    ).then((res: AxiosResponse<Diagram>) => mutate(data.map(p=>{
      if(p.id !== pId) return p
      else return {...p, diagrams: p.diagrams.map(d=>{
        if(d.id !== dId) return d
        else return res.data
      })}
    }))).catch(e=>console.log(e))
  }

  const handleDeleteDiagram = async (pId: number, dId: number) => {
    // db update api call here
    // if response is error then return
    if(!data) return

    await axios.delete(`https://${api_url}/api/project/${pId}/diagram/${dId}`)
    .then(() => {
      setDiagramId(null)
      mutate(data.map(p=>{
        if(p.id!==pId) return p
        else return {...p, diagrams: p.diagrams.filter(d=>d.id!==dId)}
      }))
    }).catch(e=>console.log(e))
  }

  if (error) return (
    <div>
      <Header />
      <main>
        <h2>Fail to load</h2>
      </main>
    </div>
  )
  if (isLoading) return (
    <div>
      <Header />
      <main>
        <h2>Loading</h2>
      </main>
    </div>
  )

  return (
    <div>
      <Header />
      <main>
        <Container>
          <Sidebar
            projects={data}
            isMyBoard={isMyBoard}
            handleSelectBoard={handleSelectBoard}
            projectId={projectId}
            diagramId={diagramId}
            handleSelectProject={handleSelectProject}
            handleSelectDiagram={handleSelectDiagram}
            addProject={handleAddProject}
          />
          {isMyBoard ? (
            projectId ? (
              diagramId ? (
                <DiagramEditor
                  projectId={projectId}
                  diagram={
                    data?.find((p) => p.id === projectId)
                      ?.diagrams?.find((d) => d.id === diagramId) as Diagram
                  }
                  editDiagramName={handleEditDiagramName}
                  editDiagramContent={handleEditDiagramContent}
                  deleteDiagram={handleDeleteDiagram}
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
        </Container>
      </main>
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background-color: white;
  color: black;
`
