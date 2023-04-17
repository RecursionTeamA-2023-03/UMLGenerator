import Head from 'next/head'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { theme } from '@/themes'
import { ThemeProvider } from 'styled-components'
import { useEffect } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/mdxComponets'

const apiUrl = `https://${process.env.AWS_DOMAIN || 'localhost'}:443/api`

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(`${apiUrl}/auth/csrf`)
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
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
