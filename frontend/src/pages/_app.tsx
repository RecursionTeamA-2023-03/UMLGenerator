import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useEffect } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/mdxComponets'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'

const theme = createTheme()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { getCsrf } = useAuth()
  useEffect(() => {
    getCsrf()
  }, [router.pathname])
  return (
    <>
      <Head>
        <title>UDG</title>
        <meta name='description' content='UML Diagram Generator' />
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
