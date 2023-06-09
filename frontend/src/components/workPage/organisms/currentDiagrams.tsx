import { Diagram } from '@/interfaces/dataTypes'
import { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import useProjectData from '@/hooks/useProjectData'

type Props = {
  handleSelectDiagram: (dId: number, pId?: number | undefined) => void
}

export default function CurrentDiagrams({ handleSelectDiagram }: Props) {
  const { data } = useProjectData()
  const [diagramArray, setDiagramArray] = useState<
    (Diagram & { projectId: number; projectName: string })[]
  >([])
  useEffect(() => {
    let arr: (Diagram & { projectId: number; projectName: string })[] = []
    data?.forEach((p) => {
      const dArr: (Diagram & { projectId: number; projectName: string })[] = p.diagrams.map((d) => {
        return { ...d, projectId: p.id, projectName: p.name }
      })
      arr = [...arr, ...dArr]
      arr = arr.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 3)
    })
    setDiagramArray(arr)
  }, [data])

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
