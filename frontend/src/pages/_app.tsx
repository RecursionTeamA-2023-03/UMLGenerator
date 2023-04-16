// supabase廃止に伴いリセット

/* import '@/styles/globals.css'
import { theme } from '../themes'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionContextProvider>
  )
}
 */

import { theme } from '@/themes'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import '../styles/global.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const api_url = `https://${process.env.AWS_DOMAIN || 'localhost'}:443/api`

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(`${api_url}/auth/csrf`)
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
