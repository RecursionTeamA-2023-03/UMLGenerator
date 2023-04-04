/* import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Auth from '@/components/authPage/organisms/auth'
import { useUser } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GetServerSidePropsContext, NextPage } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function AuthPage() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.replace('/')
  }, [router, user])

  return (
    <>
      <Head>
        <title>UDG</title>
        <meta name='description' content='UML Diagram generator' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Auth />
      </main>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  return {
    props: {},
  }
} */

import AuthTemplate from '@/components/authPage/templates/authTemplate'

export default function Auth() {
  return <AuthTemplate />
}
