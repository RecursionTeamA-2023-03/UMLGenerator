import SideBar from '@/components/cheetSheetsPage/organisms/sidebar'
import Header from '@/components/common/organisms/header'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { useState } from 'react'
import Text from '@/components/common/atoms/text'
import { getAllPosts } from '../api/cheatSheets/getMdFiles'
import styled from 'styled-components'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const ContentArea = styled.div`
  display: flex;
  height: 100vh;
`

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date'])
  return {
    props: { allPosts },
  }
}

const CheatSheets: NextPage<Props> = ({ allPosts }) => {
  const [isShow, setIsShow] = useState(true)
  const switchSideBar = () => setIsShow(!isShow)

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <main>
        <ContentArea>
          {isShow ? (
            <SideBar data={allPosts} handle={switchSideBar} flag={true} />
          ) : (
            <SideBar handle={switchSideBar} flag={false} />
          )}
          <Text variant='large'>チートシート</Text>
        </ContentArea>
      </main>
    </div>
  )
}

export default CheatSheets
