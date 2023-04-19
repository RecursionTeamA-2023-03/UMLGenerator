import useSWR, { Fetcher } from 'swr'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import plantUmlEncoder from 'plantuml-encoder'
import fileDownload from 'js-file-download'
import { Project, Diagram } from '@/interfaces/dataTypes'
import styled from 'styled-components'
import { useState, Dispatch, SetStateAction, useEffect } from 'react'
import UmlPic from '@/components/common/organisms/umlPic'
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Card,
  CardContent,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import MonacoEditor from '@/components/common/atoms/editor'

type Props = {
  projectId: number
  diagramId: number
  setDiagramId: Dispatch<SetStateAction<number | null>>
}

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
const picUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/plantuml`

export default function DiagramEditor({ projectId, diagramId, setDiagramId }: Props) {
  const { data, isLoading, error, mutate } = useSWR(`${apiUrl}/project`, fetcher)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [nameEdit, setNameEdit] = useState(false)
  const [saveType, setType] = useState('png')

  const router = useRouter()

  const getDiagram = () =>
    data
      ?.find((project) => project.id === projectId)
      ?.diagrams.find((diagram) => diagram.id === diagramId)

  useEffect(() => {
    const diagram = getDiagram()
    setName(diagram?.name ?? '')
    setContent(diagram?.content ?? '')
  }, [data, projectId, diagramId])

  const handleResetName = () => {
    const diagram = getDiagram()
    setName(diagram?.name ?? '')
  }

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
  }

  const handleChangeContent = (newString: string) => setContent(newString)

  const handleSaveFile = async () => {
    const encodedUml = plantUmlEncoder.encode(content)
    const url = `${picUrl}/${saveType}/${encodedUml}`
    const fileName = `${name}.${saveType}`
    const res = await fetch(url)
    const blob = await res.blob()
    fileDownload(blob, fileName)
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

  const getUniqueDiagramName = (projectId: number, name = 'Diagram_1') => {
    if (!data) return

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

  const handleDeleteDiagram = async (pId: number, dId: number) => {
    if (!data) return

    await axios
      .delete(`${apiUrl}/project/${pId}/diagram/${dId}`)
      .then(() => {
        setDiagramId(null)
        mutate(
          data.map((p) => {
            if (p.id !== pId) return p
            else return { ...p, diagrams: p.diagrams.filter((d) => d.id !== dId) }
          }),
        )
      })
      .catch((e) => console.log(e))
  }

  if (isLoading)
    return (
      <>
        <CircularProgress />
      </>
    )

  if (error) router.push('/')

  return (
    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: '1rem' }}>
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
                  handleEditDiagramName(projectId, diagramId, name)
                  setNameEdit(false)
                }}
              >
                保存
              </Button>
              <Button
                variant='outlined'
                sx={{ ml: '0.5rem' }}
                onClick={() => {
                  handleResetName()
                  setNameEdit(false)
                }}
              >
                キャンセル
              </Button>
            </>
          )}
        </Box>
        <MonacoEditor
          height='70vh'
          width='100%'
          placeholder={content}
          onChange={handleChangeContent}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'end',
            mt: '1rem',
          }}
        >
          <Button
            variant='contained'
            sx={{ ml: '0.5rem' }}
            onClick={() => handleEditDiagramContent(projectId, diagramId, content)}
          >
            変更を保存
          </Button>
          <Select
            variant='standard'
            sx={{ ml: '0.5rem' }}
            defaultValue='png'
            value={saveType}
            label='SaveType'
            onChange={handleChangeType}
          >
            <MenuItem value={'png'}>png</MenuItem>
            <MenuItem value={'svg'}>svg</MenuItem>
            <MenuItem value={'txt'}>ascii</MenuItem>
          </Select>
          <Button variant='outlined' sx={{ ml: '0.5rem' }} onClick={handleSaveFile}>
            ダウンロード
          </Button>
        </Box>
        <DeleteButton
          onClick={() => {
            setName('')
            setContent('')
            handleDeleteDiagram(projectId, diagramId)
          }}
        >
          このダイアグラムを削除
        </DeleteButton>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              <ul>Current Result</ul>
            </Typography>
          </CardContent>
          <UmlPic umlText={content} />
        </Card>
      </Grid>
    </Grid>
  )
}

const DeleteButton = styled.button`
  width: 100%;
  color: red;
  background-color: white;
  border: 3px solid red;
  border-radius: 5px;
  margin-top: 1rem;

  &:hover {
    color: white;
    background-color: red;
  }
`
