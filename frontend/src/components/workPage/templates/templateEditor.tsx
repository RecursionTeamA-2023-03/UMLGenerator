import useSWR, { Fetcher } from 'swr'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import plantUmlEncoder from 'plantuml-encoder'
import fileDownload from 'js-file-download'
import { Project, Diagram } from '@/interfaces/dataTypes'
import { useState } from 'react'
import UmlPic from '@/components/common/organisms/umlPic'
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Card,
  CardContent,
  InputLabel,
  FormControl,
  CardMedia,
  Modal,
  IconButton,
  Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import MonacoEditor from '@/components/common/atoms/editor'

type Template = {
  name: string
  content: string[]
}

type Props = {
  template: Template
  handleSelectTemplate: (name?: string) => void
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

export default function TemplateEditor({ template, handleSelectTemplate }: Props) {
  const [name, setName] = useState(template.name)
  const [nameEdit, setNameEdit] = useState(false)
  const [content, setContent] = useState(template.content.join(''))
  const [saveProjectId, setSaveProjectId] = useState<number>()
  const [saveType, setType] = useState('png')
  const [openModal, setOpenModal] = useState(false)
  const { data, mutate } = useSWR(`${apiUrl}/project`, fetcher)

  const handleResetName = () => {
    setName(template.name)
  }

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
  }

  const handleChangeContent = (newString: string) => setContent(newString)

  const handleAddDiagram = async () => {
    if (!data || !saveProjectId) return
    await axios
      .post(
        `${apiUrl}/project/${saveProjectId}/diagram`,
        {
          name: name,
          content: content,
        },
        axiosConfig,
      )
      .then((res: AxiosResponse<Diagram>) =>
        mutate(
          data.map((p) => {
            if (p.id !== saveProjectId) return p
            else return { ...p, diagrams: [...p.diagrams, res.data] }
          }),
        ),
      )
      .catch((e) => console.log(e))
  }

  const handleSaveFile = async () => {
    const encodedUml = plantUmlEncoder.encode(content)
    const url = `${picUrl}/${saveType}/${encodedUml}`
    const fileName = `${name}.${saveType}`
    const res = await fetch(url)
    const blob = await res.blob()
    fileDownload(blob, fileName)
  }

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: '1rem' }}>
        <Button variant='text' onClick={() => handleSelectTemplate()}>
          <Typography variant='h5'>テンプレート</Typography>
        </Button>
        <Typography variant='h5' sx={{ pl: 1, pr: 1 }}>
          {'/'}
        </Typography>
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
      <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Grid item xs={7}>
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
            <FormControl variant='standard' sx={{ ml: '0.5rem', minWidth: 120 }}>
              <InputLabel>保存先</InputLabel>
              <Select
                value={saveProjectId}
                label='SaveProject'
                onChange={(e) => setSaveProjectId(Number(e.target.value))}
              >
                {data &&
                  data.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              variant='contained'
              sx={{ ml: '0.5rem' }}
              disabled={saveProjectId ? false : true}
              onClick={handleAddDiagram}
            >
              変更を保存
            </Button>
            <FormControl variant='standard' sx={{ ml: '0.5rem', minWidth: 60 }}>
              <InputLabel>形式</InputLabel>
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
            </FormControl>
            <Button variant='outlined' sx={{ ml: '0.5rem' }} onClick={handleSaveFile}>
              ダウンロード
            </Button>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Card variant='outlined' sx={{ height: '70vh' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 0,
              }}
            >
              <Typography gutterBottom variant='h6'>
                出力結果
              </Typography>
              <Button onClick={handleOpenModal}>
                <IconButton>
                  <ZoomInIcon />
                </IconButton>
              </Button>
            </CardContent>
            <Divider sx={{ mb: 1 }} />
            <CardMedia sx={{ textAlign: 'center' }}>
              <UmlPic umlText={content} maxWidth='100%' maxHeight='60vh' />
            </CardMedia>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Card sx={{ maxWidth: '95%', maxHeight: '95vh' }}>
          <CardMedia>
            <UmlPic umlText={content} maxWidth='100%' maxHeight='95vh' />
          </CardMedia>
        </Card>
      </Modal>
    </>
  )
}
