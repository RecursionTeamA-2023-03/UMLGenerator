import Head from 'next/head'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useEffect } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/mdxComponets'
import { useRouter } from 'next/router'

const apiUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/api`
const theme = createTheme()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get(`${apiUrl}/auth/csrf`).then(res=>{
      axios.defaults.headers.common['csrf-token'] = res.data.csrfToken
    })
  }, [router.pathname])
  return (
    <>
      <Head>
        <title>UDG</title>
        <meta name='description' content='UML Diagram generator' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <MDXProvider components={mdxComponents}>
            <Component {...pageProps} />
          </MDXProvider>
        </ThemeProvider>
      </Box>
    </>
  )
}
