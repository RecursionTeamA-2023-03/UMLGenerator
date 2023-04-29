import { Fragment } from 'react'
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
import useProjectMember from '@/hooks/useProjectMember'
import useUserData from '@/hooks/useUserData'

type Props = {
  projectId: number
}

export default function ProjectMembers({ projectId }: Props) {
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const { data: members, isLoading, handlers } = useProjectMember(projectId)
  const { data: user } = useUserData()
  const theme = useTheme()
  const router = useRouter()

  const handleDeleteMember = async (email: string) => {
    if (user?.email === email) {
      if (confirm('Do you really want to leave this project?')) {
        router.push('/work')
        await handlers.delete(email)
      }
    } else {
      if (confirm('Do you really delete this member?')) await handlers.delete(email)
    }
  }

  const handleEmailChange = (email: string) => setNewMemberEmail(email)
  const handleInviteMember = async () =>
    await handlers.invite(newMemberEmail).then(() => setNewMemberEmail(''))

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
