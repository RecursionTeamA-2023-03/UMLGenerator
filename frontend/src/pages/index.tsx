import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/common/templates/layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>UDG</title>
        <meta name='description' content='UML Diagram generator' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1>ここがAuth Page</h1>
        </main>
      </Layout>
    </>
  )
}
