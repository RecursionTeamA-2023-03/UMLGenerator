import useSWR, { Fetcher } from 'swr'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Project, Diagram } from '@/interfaces/dataTypes'

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

export default function useProjectData() {
  axios.defaults.withCredentials = true

  const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/project`, fetcher)

  const handleAddProject = async () => {
    const nextProjectName = getUniqueProjectName()

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
    const nameSet = new Set()
    data.forEach((p) => nameSet.add(p.name))
    while (nameSet.has(nextProjectName)) {
      const nameArray = nextProjectName.split('_')
      if (nameArray.length === 1 || Number.isNaN(Number(nameArray[nameArray.length - 1]))) {
        nameArray.push('1')
      } else {
        nameArray[nameArray.length - 1] = (Number(nameArray[nameArray.length - 1]) + 1).toString()
      }
      nextProjectName = nameArray.join('_')
    }
    return nextProjectName
  }

  const handleEditProjectName = async (id: number, name: string) => {
    const nextProjectName = getUniqueProjectName(name)

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

  const handleDeleteProject = async (id: number, beforeDelete?: () => void) => {
    if (!data) return
    if (beforeDelete) beforeDelete()

    await axios
      .delete(`${apiUrl}/project/${id}`)
      .then(() => {
        mutate(data.filter((p) => p.id !== id))
      })
      .catch((e) => console.log(e))
  }

  const handleAddDiagram = async (id: number, name?: string, content?: string) => {
    const nextDiagramName = getUniqueDiagramName(id, name)

    if (!data || !nextDiagramName) return

    await axios
      .post(
        `${apiUrl}/project/${id}/diagram`,
        {
          name: nextDiagramName,
          content: content ?? null,
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
    const nameSet = new Set()
    targetProject?.diagrams.forEach((d) => nameSet.add(d.name))
    while (nameSet.has(nextDiagramName)) {
      const nameArray = nextDiagramName.split('_')
      if (nameArray.length === 1 || Number.isNaN(Number(nameArray[nameArray.length - 1]))) {
        nameArray.push('1')
      } else {
        nameArray[nameArray.length - 1] = (Number(nameArray[nameArray.length - 1]) + 1).toString()
      }
      nextDiagramName = nameArray.join('_')
    }

    return targetProject ? nextDiagramName : null
  }

  const handleEditDiagramName = async (pId: number, dId: number, name: string) => {
    const nextDiagramName = getUniqueDiagramName(pId, name)

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

  const handleDeleteDiagram = async (pId: number, dId: number, beforeDelete?: () => void) => {
    if (!data) return
    if (beforeDelete) beforeDelete()

    await axios
      .delete(`${apiUrl}/project/${pId}/diagram/${dId}`)
      .then(() => {
        mutate(
          data.map((p) => {
            if (p.id !== pId) return p
            else return { ...p, diagrams: p.diagrams.filter((d) => d.id !== dId) }
          }),
        )
      })
      .catch((e) => console.log(e))
  }

  return {
    data: data,
    error: error,
    isLoading: isLoading,
    handlers: {
      project: {
        add: handleAddProject,
        editName: handleEditProjectName,
        delete: handleDeleteProject,
      },
      diagram: {
        add: handleAddDiagram,
        editName: handleEditDiagramName,
        editContent: handleEditDiagramContent,
        delete: handleDeleteDiagram,
      },
    },
  }
}
