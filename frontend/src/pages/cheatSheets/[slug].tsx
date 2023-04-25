import { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '../api/cheatSheets/getMdFiles'
import AppBarWithDrawer from '@/components/common/templates/appBar'
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import TopicsCard from '../api/cheatSheets/toc'
import { useEffect, useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import tocbot from 'tocbot'

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
  const mdxSource = await serialize(post.content)

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

interface Open {
  [key: number]: boolean
}

let openKeys: Open = { 0: true }

const Post: NextPage<Props> = ({ posts, post }) => {
  const router = useRouter()

  const [, setOpen] = useState<Open[]>([openKeys])

  useEffect(() => {
    openKeys = { 0: true }
    setOpen([openKeys])
    tocbot.refresh()
  }, [])

  const handleClick = (id: number) => {
    for (let i = 0; i < Object.keys(openKeys).length; i++) {
      if (id != i) openKeys[i] = false
    }

    openKeys[id] = true
    setOpen([openKeys])
  }

  return (
    <>
      <AppBarWithDrawer withDrawer={true}>
        <List>
          {posts.map((items, key) => (
            <>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    router.push(`/cheatSheets/${items.slug}`)
                    handleClick(key)
                  }}
                >
                  <ListItemText primary={items.slug} />
                  {openKeys[key] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={openKeys[key]}
                unmountOnExit
                timeout={'auto'}
                onExit={() => {
                  tocbot.destroy(), console.log('onExit')
                }}
              >
                <List component='div' disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <TopicsCard />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ))}
        </List>
      </AppBarWithDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div className='cheatSheets'>
          <MDXRemote {...post.mdxSource}></MDXRemote>
        </div>
      </Box>
    </>
  )
}

export default Post
