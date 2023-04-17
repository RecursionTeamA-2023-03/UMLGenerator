import { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '../api/cheatSheets/getMdFiles'
import markdownToHtml from '../api/cheatSheets/markdownToHtml'
import AppBarWithDrawer from '@/components/common/templates/appBar'
import { Box, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'

type Props = InferGetStaticPropsType<typeof getStaticProps>

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

/**
 * 記事の内容を取得する
 */
export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, ['slug', 'title', 'date', 'content'])
  const posts = getAllPosts(['slug'])
  // Markdown を HTML に変換する
  const tmpContent = await markdownToHtml(post.content)

  // 枠線と改行を追記する
  const addCustomReplaces = tmpContent
    .replace(/<table>/g, '<table border="1">')
    .replace(/-br-/g, '<br>')
  const content = addCustomReplaces

  // content を詰め直して返す
  return {
    props: {
      posts,
      post: {
        ...post,
        content,
      },
    },
  }
}

const Post: NextPage<Props> = ({ posts, post }) => {
  const router = useRouter()
  
  return (
    <>
      <AppBarWithDrawer withDrawer={true}>
        <List>
          <ListItem key="introduction">
            <ListItemButton onClick={()=>router.push(`/cheatSheets/`)}>
              <ListItemText primary="Introduction" />
            </ListItemButton>
          </ListItem>
          {posts.map((items)=>(
            <ListItem key={items.slug}>
              <ListItemButton onClick={()=>router.push(`/cheatSheets/${items.slug}`)}>
                <ListItemText primary={items.slug} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AppBarWithDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Box>
    </>
  )
}

export default Post
