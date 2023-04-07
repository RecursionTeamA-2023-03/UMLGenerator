import { useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import { Project, Diagram, User } from '@/interfaces/dataTypes'
import { isProject, isDiagram } from '@/types/data.guard'
import styled from 'styled-components'
import Sidebar from '@/components/workPage/templates/sidebar'
import DiagramEditor from '@/components/workPage/templates/diagramEditor'
import MyBoard from '@/components/workPage/templates/myBoard'
import ProjectBoard from '@/components/workPage/templates/projectBoard'
import TemplateBoard from '@/components/workPage/templates/templateBoard'

type Data = User & {
  projects: (Project & { diagrams: Diagram[]})[]
}

const fetcher: Fetcher<Data, string> = (...args) => fetch(...args).then((res) => res.json())
const api_url = process.env.AWS_IP_ADDRESS || 'localhost'

export default function Work() {
  const { data, error, isLoading, mutate } = useSWR(`http://${api_url}/api/project`, fetcher)
  
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
    
    const response = await fetch(`http://${api_url}/api/project`, {
      method: 'POST',
      body: JSON.stringify({name: nextProjectName})
    }).then((res) => res.json())

    if(response.error || !isProject(response)) return
    const newProject = {...response, diagrams: []}
    
    mutate({ ...data, projects: [...data.projects, newProject]})
  }

  const getUniqueProjectName = (name = 'Project_1') => {
    if(!data) return
    let nextProjectName = name
    data.projects?.forEach((p) => {
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

    const response = await fetch(`http://${api_url}/api/project/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({name: nextProjectName})
    }).then((res) => res.json())

    if(response.error || !isProject(response)) return
    
    mutate({ ...data, projects: data.projects.map(p=>{
      if(p.id !== id) return p
      else return { ...response, diagrams: p.diagrams }
    })})
  }

  const handleDeleteProject = async (id: number) => {
    // db update api call here
    // if response is error then return

    if(!data) return

    const response = await fetch(`http://${api_url}/api/project/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())

    if(response.error) return
    
    mutate({ ...data, projects: data.projects.filter(p=> p.id !== id)})
  
    handleRefreshPage()
  }

  const handleAddDiagram = async (id: number) => {
    const nextDiagramName = getUniqueDiagramName(id)
    
    // db update api call here
    // if response is error then return

    if(!data || !nextDiagramName) return

    const response = await fetch(`http://${api_url}/api/project/${id}/diagram`, {
      method: 'POST',
      body: JSON.stringify({name: nextDiagramName})
    }).then((res) => res.json())

    if(response.error || !isDiagram(response)) return
    
    mutate({ ...data, projects: data.projects.map(p=>{
      if(p.id !== id) return p
      else return {...p, diagrams: [...p.diagrams, response]}
    })})
  }

  const getUniqueDiagramName = (projectId: number, name = 'Diagram_1') => {
    if(!data) return

    let nextDiagramName = name
    const targetProject = data.projects.find((p) => p.id === projectId)
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

    const response = await fetch(`http://${api_url}/api/project/${pId}/diagram/${dId}`, {
      method: 'PATCH',
      body: JSON.stringify({name: nextDiagramName})
    }).then((res) => res.json())

    if(response.error || !isDiagram(response)) return
    
    mutate({ ...data, projects: data.projects.map(p=>{
      if(p.id !== pId) return p
      else return {...p, diagrams: p.diagrams.map(d=>{
        if(d.id !== dId) return d
        else return response
      })}
    })})
  }

  const handleEditDiagramContent = async (pId: number, dId: number, content: string) => {
    // db update api call here
    // if response is error then return
    if(!data) return

    const response = await fetch(`http://${api_url}/api/project/${pId}/diagram/${dId}`, {
      method: 'PATCH',
      body: JSON.stringify({content: content})
    }).then((res) => res.json())

    if(response.error || !isDiagram(response)) return
    
    mutate({ ...data, projects: data.projects.map(p=>{
      if(p.id !== pId) return p
      else return {...p, diagrams: p.diagrams.map(d=>{
        if(d.id !== dId) return d
        else return response
      })}
    })})
  }

  const handleDeleteDiagram = async (pId: number, dId: number) => {
    // db update api call here
    // if response is error then return
    if(!data) return

    const response = await fetch(`http://${api_url}/api/project/${pId}/diagram/${dId}`, {
      method: 'DELETE',
    }).then(res => res.json())

    if(response.error) return
    
    mutate({ ...data, projects: data.projects.map(p=>{
      if(p.id!==pId) return p
      else return {...p, diagrams: p.diagrams.filter(d=>d.id!==dId)}
    })})

    setDiagramId(null)
  }

  if (error) return <div>Failed to load</div>
  if (!data || isLoading) return <div>Loading...</div>

  return (
    <Container>
      <Sidebar
        projects={data.projects}
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
                data.projects
                  .find((p) => p.id === projectId)
                  ?.diagrams.find((d) => d.id === diagramId) as Diagram
              }
              editDiagramName={handleEditDiagramName}
              editDiagramContent={handleEditDiagramContent}
              deleteDiagram={handleDeleteDiagram}
            />
          ) : (
            <ProjectBoard
              project={
                data.projects.find((p) => p.id === projectId) as Project & { diagrams: Diagram[] }
              }
              editProjectName={handleEditProjectName}
              handleSelectDiagram={handleSelectDiagram}
              addDiagram={handleAddDiagram}
              deleteProject={handleDeleteProject}
            />
          )
        ) : (
          <MyBoard
            projects={data.projects}
            editProjectName={handleEditProjectName}
            addDiagram={handleAddDiagram}
            handleSelectDiagram={handleSelectDiagram}
          />
        )
      ) : (
        <TemplateBoard />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: row;
  background-color: white;
  color: black;
`
