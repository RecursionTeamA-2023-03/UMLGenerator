import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { User, Project, Diagram } from '@/interfaces/dataTypes'

type Data = User & {
  projects: (Project & {
    diagrams: Diagram[]
  })[]
}

// test code. you can get user data from supabase if write path work?id={targetId}

const inter = Inter({ subsets: ['latin'] })
const fetcher: Fetcher<Data, string> = (...args) => fetch(...args).then((res) => res.json())

export default function Temp() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/api/user?id=${id}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}></div>

        <div>
          <p>{data.name}</p>
          <br />
          {data.projects.map((project) => {
            return (
              <div key={project.id.toString()}>
                <p>{project.name}</p>
                {project.diagrams.map((diagram) => {
                  return (
                    <div key={diagram.id.toString()}>
                      <p>{diagram.name}</p>
                      <p>{diagram.content}</p>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className={styles.grid}></div>
      </main>
    </>
  )
}
