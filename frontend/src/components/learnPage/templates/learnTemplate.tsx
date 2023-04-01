import SideBar from '../../common/organisms/sidebar'
import Header from '../../common/organisms/header'
import Text from '@/components/common/atoms/text'
import styled from 'styled-components'
import { theme } from '@/themes'
import { useState } from 'react'
import BreadcrumbItem from '../atoms/breadcrumbItem'
import Link from 'next/link'

const ContentArea = styled.div`
  display: flex;
  height: 100vh;
`
interface LearnTemplateProps {
  sidebarData?: any
  data?: any
  problemNo?: any
  children: React.ReactNode
}

const LearnTemplate = ({ children, sidebarData, data, problemNo }: LearnTemplateProps) => {
  const [isShow, setIsShow] = useState(true)
  const switchSideBar = () => setIsShow(!isShow)
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <main>
        <ContentArea>
          {isShow ? (
            <SideBar data={sidebarData} handle={switchSideBar} flag={true} />
          ) : (
            <SideBar handle={switchSideBar} flag={false} />
          )}
          <div>
            <Text variant='large' marginLeft='1em' fontColor={theme.colors.black}>
              {data.title}
            </Text>
            <div>
              <BreadcrumbItem>
                <Text variant='small'>
                  <Link href='/learn'>イントロダクション</Link>
                </Text>
              </BreadcrumbItem>
              {problemNo ? (
                <>
                  <BreadcrumbItem>
                    <Text variant='small'>
                      <Link href={`/learn/${data.id}`}>{data.diagram}</Link>
                    </Text>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Text variant='small' fontColor={theme.colors.black}>
                      {problemNo}
                    </Text>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <Text variant='small' fontColor={theme.colors.black}>
                    {data.id}
                  </Text>
                </BreadcrumbItem>
              )}
            </div>
            {children}
          </div>
        </ContentArea>
      </main>
    </div>
  )
}

export default LearnTemplate
