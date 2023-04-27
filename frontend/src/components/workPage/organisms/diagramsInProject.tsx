import { Diagram } from '@/interfaces/dataTypes'
import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

type Props = {
  projectId: number
  projectName: string
  diagrams: Diagram[]
  handleSelectDiagram: (dId: number, pId?: number) => void
  addDiagram: (projectId: number) => void
  editProjectName: (id: number, name: string) => void
}

export default function DiagramsInProject({
  projectId,
  projectName,
  diagrams,
  handleSelectDiagram,
  addDiagram,
  editProjectName,
}: Props) {
  const [nameEdit, setNameEdit] = useState(false)
  const [name, setName] = useState(projectName)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {!nameEdit ? (
          <>
            <Typography variant='h5'>{name}</Typography>
            <Button sx={{ ml: '0.5rem', color: 'black' }} onClick={() => setNameEdit(true)}>
              <EditIcon />
            </Button>
          </>
        ) : (
          <>
            <TextField
              variant='filled'
              label='New Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Button
              disabled={name === ''}
              variant='contained'
              sx={{ ml: '0.5rem' }}
              onClick={() => {
                editProjectName(projectId, name)
                setNameEdit(false)
              }}
            >
              保存
            </Button>
            <Button
              variant='outlined'
              sx={{ ml: '0.5rem' }}
              onClick={() => {
                setName(projectName)
                setNameEdit(false)
              }}
            >
              キャンセル
            </Button>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          p: '30px',
        }}
      >
        {diagrams.map((d) => {
          return (
            <Card
              key={d.id}
              onClick={() => handleSelectDiagram(d.id, projectId)}
              sx={{ height: '100px', width: '150px', m: '15px', bgcolor: 'DodgerBlue' }}
            >
              <CardActionArea
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                }}
              >
                <CardContent component='h3' sx={{ m: 0, pb: 0, color: 'white' }}>
                  {d.name}
                </CardContent>
                <CardContent component='p' sx={{ m: '0', pt: 0, color: 'white', textAlign: 'end' }}>
                  {'at ' + (d.updatedAt.getMonth() + 1) + '/' + d.updatedAt.getDate()}
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
        <Card
          onClick={() => addDiagram(projectId)}
          sx={{
            height: '100px',
            width: '150px',
            m: '15px',
            bgcolor: 'gray',
            alignItems: 'flex-start',
          }}
        >
          <CardActionArea sx={{ height: '100%' }}>
            <CardContent component='h3' sx={{ m: '0', color: 'white' }}>
              新規作成
            </CardContent>
            <CardContent component='h3' sx={{ m: '0' }}>
              {' '}
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  )
}
