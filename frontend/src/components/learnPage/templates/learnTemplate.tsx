import SideBar from '../../common/organisms/sidebar'
import Header from '../../common/organisms/header'
import Text from '@/components/common/atoms/text'
import styled, { keyframes } from 'styled-components'
import { theme } from '@/themes'
import { useState } from 'react'
import BreadcrumbItem from '../atoms/breadcrumbItem'
import Link from 'next/link'

const ContentArea = styled.div`
  display: flex;
  height: 100vh;
`
interface LearnTemplateProps {
  data?: any
  title?: any
  problemNo?: any
  children: React.ReactNode
}

const LearnTemplate = ({ children, data, title, problemNo }: LearnTemplateProps) => {
  const [isShow, setIsShow] = useState(true)
  const switchSideBar = () => setIsShow(!isShow)
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <main>
        <ContentArea>
          {isShow ? (
            <SideBar data={data} handle={switchSideBar} flag={true} />
          ) : (
            <SideBar handle={switchSideBar} flag={false} />
          )}
          <div>
            <Text variant='large' marginLeft='1em' fontColor={theme.colors.black}>
              {title}
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
                      <Link href={`/learn/${title}`}>{title}</Link>
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
                    {title}
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
