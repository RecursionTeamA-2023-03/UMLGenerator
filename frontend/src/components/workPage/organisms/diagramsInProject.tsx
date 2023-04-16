import { Diagram } from '@/interfaces/dataTypes'
import { useState } from 'react'
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material'
import { EditIcon } from '@/components/common/atoms/icon'

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
            <TextField variant='filled' onChange={(e) => setName(e.target.value)} value={name} />
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
              <CardContent>{d.name}</CardContent>
            </Card>
          )
        })}
        <Card
          onClick={() => addDiagram(projectId)}
          sx={{ height: '100px', width: '150px', m: '15px', bgcolor: 'lightgray' }}
        >
          <CardContent>新規作成</CardContent>
        </Card>
      </Box>
    </>
  )
}
