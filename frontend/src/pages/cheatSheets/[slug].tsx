import { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '../api/cheatSheets/getMdFiles'
import AppBarWithDrawer from '@/components/common/templates/appBar'
import { Box, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import TopicsCard from '../api/cheatSheets/toc'

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
  const mdxSource = await serialize(post.content);

  // content を詰め直して返す
  return {
    props: {
      posts,
      post: {
        ...post,
        mdxSource,
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
          <ListItem key='introduction'>
            <ListItemButton onClick={() => router.push(`/cheatSheets/`)}>
              <ListItemText primary='Introduction' />
            </ListItemButton>
          </ListItem>
          {posts.map((items) => (
            <ListItem key={items.slug}>
              <ListItemButton onClick={() => router.push(`/cheatSheets/${items.slug}`)}>
                <ListItemText primary={items.slug} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AppBarWithDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      <div className="cheatSheets">
          <TopicsCard/>
          <MDXRemote {...post.mdxSource}></MDXRemote>
      </div>
      </Box>
    </>
  )
}

export default Post
