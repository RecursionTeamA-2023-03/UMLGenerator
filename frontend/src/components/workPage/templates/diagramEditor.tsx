import plantUmlEncoder from 'plantuml-encoder'
import fileDownload from 'js-file-download'
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
  Modal,
  CardMedia,
  IconButton,
  Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { useRouter } from 'next/router'
import MonacoEditor from '@/components/common/atoms/editor'
import useProjectData from '@/hooks/useProjectData'

type Props = {
  projectId: number
  diagramId: number
  setDiagramId: Dispatch<SetStateAction<number | null>>
}

const picUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/plantuml`

export default function DiagramEditor({ projectId, diagramId, setDiagramId }: Props) {
  const { data, isLoading, error, handlers } = useProjectData()
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [nameEdit, setNameEdit] = useState(false)
  const [saveType, setType] = useState('png')
  const [openModal, setOpenModal] = useState(false)

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

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  if (isLoading)
    return (
      <>
        <CircularProgress />
      </>
    )

  if (error) router.push('/')

  return (
    <>
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
                handlers.diagram.editName(projectId, diagramId, name)
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
            <Button
              variant='contained'
              sx={{ ml: '0.5rem' }}
              onClick={() => handlers.diagram.editContent(projectId, diagramId, content)}
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
              handlers.diagram.delete(projectId, diagramId, () => setDiagramId(null))
            }}
          >
            このダイアグラムを削除
          </DeleteButton>
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
              <IconButton onClick={handleOpenModal}>
                <ZoomInIcon />
              </IconButton>
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
