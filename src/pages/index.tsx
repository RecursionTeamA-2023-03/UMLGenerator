import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import UmlGenerator from '@/components/common/templates/umlGenerator'

export default function Home() {
  return (
    <>
      <Head>
        <title>UDG</title>
        <meta name='description' content='UML Diagram generator' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <UmlGenerator />
      </main>
    </>
  )
}
