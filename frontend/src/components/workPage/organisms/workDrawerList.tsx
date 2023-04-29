import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Typography,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CollectionsIcon from '@mui/icons-material/Collections'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import FolderIcon from '@mui/icons-material/Folder'
import useProjectData from '@/hooks/useProjectData'

type Props = {
  isMyBoard: boolean
  projectId: number | null
  handleSelectBoard: (b: boolean) => void
  handleSelectProject: (id: number) => void
}

export default function WorkDrawerList({
  isMyBoard,
  projectId,
  handleSelectBoard,
  handleSelectProject,
}: Props) {
  const { data, isLoading, handlers } = useProjectData()

  return (
    <>
      <List>
        <ListItem key='MyBoard' disablePadding>
          <ListItemButton selected={isMyBoard} onClick={() => handleSelectBoard(true)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='マイボード' />
          </ListItemButton>
        </ListItem>
        <ListItem key='Template' disablePadding>
          <ListItemButton selected={!isMyBoard} onClick={() => handleSelectBoard(false)}>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary='テンプレート' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem key='UserProjects' sx={{ pl: '1rem' }}>
          <ListItemText primary='Projects' />
          <ListItemButton sx={{ justifyContent: 'end' }} onClick={handlers.project.add}>
            <ListItemIcon sx={{ justifyContent: 'end' }}>
              <PlaylistAddIcon />
              <Typography>追加</Typography>
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
