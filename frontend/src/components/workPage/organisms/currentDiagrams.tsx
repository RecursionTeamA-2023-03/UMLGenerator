import { Project, Diagram } from '@/interfaces/dataTypes'
import { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

type Props = {
  projects?: (Project & { diagrams: Diagram[] })[]
  handleSelectDiagram: (dId: number, pId?: number | undefined) => void
}

export default function CurrentDiagrams({ projects, handleSelectDiagram }: Props) {
  const [diagramArray, setDiagramArray] = useState<
    (Diagram & { projectId: number; projectName: string })[]
  >([])
  useEffect(() => {
    let arr: (Diagram & { projectId: number; projectName: string })[] = []
    projects?.forEach((p) => {
      const dArr: (Diagram & { projectId: number; projectName: string })[] = p.diagrams.map((d) => {
        return { ...d, projectId: p.id, projectName: p.name }
      })
      arr = [...arr, ...dArr]
      arr = arr.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 3)
    })
    setDiagramArray(arr)
  }, [projects])

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <AccessTimeIcon />
        <Typography variant='h5'>最近使用したもの</Typography>
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
        {diagramArray.map((d) => {
          return (
            <Card
              key={d.id}
              onClick={() => handleSelectDiagram(d.id, d.projectId)}
              sx={{ height: '100px', width: '150px', m: '15px', bgcolor: 'DodgerBlue' }}
            >
              <CardActionArea>
                <CardContent component='h3' sx={{ m: '0' }}>
                  {d.name}
                </CardContent>
                <CardContent component='p' sx={{ m: '0', textAlign: 'end' }}>
                  {'in ' + d.projectName}
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </Box>
    </>
  )
}
