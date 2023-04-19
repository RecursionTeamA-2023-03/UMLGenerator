import Head from 'next/head'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useEffect } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/mdxComponets'
import useSWR, { Fetcher } from 'swr'

const apiUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/api`
const theme = createTheme()

type Csrf = { csrfToken: string }

const fetcher: Fetcher<Csrf, string> = async (url: string) => {
  return await axios.get(url).then((res) => res.data)
}

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  const { data } = useSWR(`${apiUrl}/auth/csrf`, fetcher)
  useEffect(() => {
    axios.defaults.headers.common['csrf-token'] = data?.csrfToken
  }, [data])
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
