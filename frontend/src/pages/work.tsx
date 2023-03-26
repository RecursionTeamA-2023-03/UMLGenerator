import { useState } from 'react'
import { Project, Diagram } from '@/interfaces/dataTypes'
import styled from 'styled-components'
import Sidebar from '@/components/workPage/templates/sidebar'
import DiagramEditor from '@/components/workPage/templates/diagramEditor'
import MyBoard from '@/components/workPage/templates/myBoard'
import ProjectBoard from '@/components/workPage/templates/projectBoard'
import TemplateBoard from '@/components/workPage/templates/templateBoard'

// const fetcher: Fetcher<Data, string> = (...args) => fetch(...args).then((res) => res.json())

export default function Work() {
  // const router = useRouter()
  // const { id } = router.query
  // const { data, error } = useSWR(`/api/user?id=${id}`, fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>
  // data --> projects

  const [projects, setProjects] = useState<(Project & { diagrams: Diagram[] })[]>([
    {
      id: 1,
      name: '下書き',
      createdAt: new Date(),
      updatedAt: new Date(),
      diagrams: [],
    },
  ])
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

  const handleAddProject = () => {
    const nextProjectId = getUniqueProjectId()
    const nextProjectName = getUniqueProjectName()
    const project = {
      id: nextProjectId,
      name: nextProjectName,
      createdAt: new Date(),
      updatedAt: new Date(),
      diagrams: [],
    }

    // db update api call here
    // if response is error then return

    setProjects([...projects, project])
  }

  const getUniqueProjectId = () => {
    let nextProjectId = 1
    projects.forEach((p) => {
      nextProjectId = nextProjectId <= p.id ? p.id + 1 : nextProjectId
    })
    return nextProjectId
  }

  const getUniqueProjectName = (name = 'Project_1') => {
    let nextProjectName = name
    projects.forEach((p) => {
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

  const handleEditProjectName = (id: number, name: string) => {
    const nextProjectName = getUniqueProjectName(name)

    // db update api call here
    // if response is error then return

    setProjects((projects) =>
      projects.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            name: nextProjectName,
            updatedAt: new Date(),
          }
        } else {
          return p
        }
      }),
    )
  }

  const handleAddDiagram = (projectId: number) => {
    const nextDiagramId = getUniqueDiagramId(projectId)
    const nextDiagramName = getUniqueDiagramName(projectId)
    if (!nextDiagramId || !nextDiagramName) {
      console.log('Invalid projectId')
      return
    }

    const diagram = {
      id: nextDiagramId,
      name: nextDiagramName,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: '',
    }

    // db update api call here
    // if response is error then return

    setProjects((projects) =>
      projects.map((p) => {
        if (p.id === projectId) {
          return { ...p, updatedAt: new Date(), diagrams: [...p.diagrams, diagram] }
        } else {
          return p
        }
      }),
    )
  }

  const handleDeleteProject = (id: number) => {
    // db update api call here
    // if response is error then return

    setProjects((projects) => projects.filter((p) => p.id !== id))
    handleRefreshPage()
  }

  const getUniqueDiagramId = (projectId: number) => {
    let nextDiagramId = 1
    const targetProject = projects.find((p) => p.id === projectId)
    targetProject?.diagrams.forEach((d) => {
      nextDiagramId = nextDiagramId <= d.id ? d.id + 1 : nextDiagramId
    })

    return targetProject ? nextDiagramId : null
  }

  const getUniqueDiagramName = (projectId: number, name = 'Diagram_1') => {
    let nextDiagramName = name
    const targetProject = projects.find((p) => p.id === projectId)
    targetProject?.diagrams.forEach((d) => {
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

  const handleEditDiagramName = (projectId: number, diagramId: number, name: string) => {
    const nextDiagramName = getUniqueDiagramName(projectId, name)
    if (!nextDiagramName) {
      console.log('Invalid projectId')
      return
    }

    // db update api call here
    // if response is error then return

    setProjects((projects) =>
      projects.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            updatedAt: new Date(),
            diagrams: p.diagrams.map((d) => {
              if (d.id === diagramId) {
                return { ...d, name: nextDiagramName as string, updatedAt: new Date() }
              } else {
                return d
              }
            }),
          }
        } else {
          return p
        }
      }),
    )
  }

  const handleEditDiagramContent = (projectId: number, diagramId: number, content: string) => {
    // db update api call here
    // if response is error then return

    setProjects((projects) =>
      projects.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            updatedAt: new Date(),
            diagrams: p.diagrams.map((d) => {
              if (d.id === diagramId) {
                return { ...d, updatedAt: new Date(), content: content }
              } else {
                return d
              }
            }),
          }
        } else {
          return p
        }
      }),
    )
  }

  const handleDeleteDiagram = (projectId: number, diagramId: number) => {
    // db update api call here
    // if response is error then return

    setDiagramId(null)

    setProjects((projects) =>
      projects.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            updatedAt: new Date(),
            diagrams: p.diagrams.filter((d) => d.id !== diagramId),
          }
        } else {
          return p
        }
      }),
    )
  }

  return (
    <Container>
      <Sidebar
        projects={projects}
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
                projects
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
                projects.find((p) => p.id === projectId) as Project & { diagrams: Diagram[] }
              }
              editProjectName={handleEditProjectName}
              handleSelectDiagram={handleSelectDiagram}
              addDiagram={handleAddDiagram}
              deleteProject={handleDeleteProject}
            />
          )
        ) : (
          <MyBoard
            projects={projects}
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
