import type { InferGetStaticPropsType, NextPage } from 'next'
import Text from '@/components/common/atoms/text'
import { getAllPosts } from '../api/cheatSheets/getMdFiles'
import AppBarWithDrawer from '@/components/common/templates/appBar'
import { Box, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date'])
  return {
    props: { allPosts },
  }
}

const CheatSheets: NextPage<Props> = ({ allPosts }) => {
  const router = useRouter()
  return (
    <>
      <AppBarWithDrawer withDrawer={true}>
        <List>
          <ListItem key='introduction'>
            <ListItemButton onClick={() => router.push(`/cheatSheets/`)}>
              <ListItemText primary='Introduction' />
            </ListItemButton>
          </ListItem>
          {allPosts.map((items) => (
            <ListItem key={items.title}>
              <ListItemButton onClick={() => router.push(`/cheatSheets/${items.title}`)}>
                <ListItemText primary={items.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AppBarWithDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Text variant='large'>チートシート</Text>
      </Box>
    </>
  )
}

export default CheatSheets
