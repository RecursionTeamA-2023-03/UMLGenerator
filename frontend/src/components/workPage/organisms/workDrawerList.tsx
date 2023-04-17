import useSWR, { Fetcher } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Project, Diagram } from '@/interfaces/dataTypes'
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CollectionsIcon from '@mui/icons-material/Collections'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import FolderIcon from '@mui/icons-material/Folder'

type Data = (Project & { diagrams: Diagram[] })[]
type Props = {
  isMyBoard: boolean
  projectId: number | null
  handleSelectBoard: (b: boolean) => void
  handleSelectProject: (id: number) => void
}

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

const apiUrl = `https://${process.env.AWS_DOMAIN || 'localhost'}:443/api`

export default function WorkDrawerList({
  isMyBoard,
  projectId,
  handleSelectBoard,
  handleSelectProject,
}: Props) {
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
  return (
    <>
      <List>
        <ListItem key='MyBoard' disablePadding>
          <ListItemButton selected={isMyBoard} onClick={() => handleSelectBoard(true)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='MyBoard' />
          </ListItemButton>
        </ListItem>
        <ListItem key='Template' disablePadding>
          <ListItemButton selected={!isMyBoard} onClick={() => handleSelectBoard(false)}>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary='Template' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key='UserProjects' sx={{ pl: '1rem' }}>
          <ListItemText primary='Projects' />
          <ListItemButton sx={{ justifyContent: 'end' }} onClick={handleAddProject}>
            <ListItemIcon sx={{ justifyContent: 'end' }}>
              <PlaylistAddIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {isLoading && <CircularProgress />}
        {data &&
          data.map((project) => (
            <ListItem key={project.id}>
              <ListItemButton
                onClick={() => handleSelectProject(project.id)}
                selected={project.id === projectId}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </>
  )
}
