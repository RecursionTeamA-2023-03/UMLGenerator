import { Fragment } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  useTheme,
  Button,
  Typography,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  projectId: number
}

type ProjectMember = {
  name: string
  email: string
}

type User = {
  id: number
  createdAt: Date
  name: string
  email: string
}

const apiUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/api`

const memberFetcher: Fetcher<ProjectMember[], string> = async (url: string) => {
  return await axios.get(url).then((res) => res.data)
}
const userFetcher: Fetcher<User, string> = async (url: string) => {
  return await axios.get(url).then((res) => res.data)
}

export default function ProjectMembers({ projectId }: Props) {
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const {
    data: members,
    isLoading,
    mutate,
  } = useSWR(`${apiUrl}/project/${projectId}/members`, memberFetcher)
  const { data: user } = useSWR(`${apiUrl}/user`, userFetcher)
  const theme = useTheme()
  const router = useRouter()

  const handleDeleteMember = async (email: string) => {
    const deleteMember = async () =>
      await axios
        .delete(`${apiUrl}/project/${projectId}/member`, {
          data: {
            email: email,
          },
        })
        .then(() => mutate())
        .catch((e) => alert(e.response.data.message))

    if (user?.email === email) {
      if (confirm('Do you really want to leave this project?')) {
        router.push('/work')
        deleteMember()
      }
    } else {
      if (confirm('Do you really delete this member?')) deleteMember()
    }
  }

  const handleEmailChange = (email: string) => setNewMemberEmail(email)
  const handleInviteMember = async () =>
    await axios
      .post(`${apiUrl}/project/${projectId}/member`, {
        email: newMemberEmail,
      })
      .then(() => {
        mutate()
        setNewMemberEmail('')
      })
      .catch((e) => alert(e.response.data.message))

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 500 }}>
        {isLoading && (
          <ListItem key='loading'>
            <CircularProgress />
          </ListItem>
        )}
        {members &&
          members.map((member) => (
            <Fragment key={member.email}>
              <ListItem alignItems='center'>
                <ListItemAvatar>
                  <Avatar alt={member.name} sx={{ bgcolor: theme.palette.primary.main }}>
                    {member.name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.name} secondary={member.email} />
                <Button
                  color='error'
                  variant='contained'
                  onClick={() => handleDeleteMember(member.email)}
                >
                  削除
                </Button>
              </ListItem>
              <Divider variant='inset' component='li' />
            </Fragment>
          ))}
        <ListItem key='invite new member' alignItems='center'>
          <Typography sx={{ mr: 1 }}>Add Member</Typography>
          <TextField
            id='outlined-multiline-flexible'
            label='Email'
            multiline
            sx={{ mr: 1, width: '100%' }}
            value={newMemberEmail}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <Button color='success' variant='contained' onClick={handleInviteMember}>
            追加
          </Button>
        </ListItem>
      </List>
    </>
  )
}
