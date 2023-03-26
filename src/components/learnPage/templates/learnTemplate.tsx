import SideBar from '../../common/organisms/sidebar'
import Header from '../../common/organisms/header'
import Text from '@/components/common/atoms/text'
import styled, { keyframes } from 'styled-components'
import Separator from '@/components/common/atoms/separator'
import { theme } from '@/themes'
import { useState } from 'react'
import Button from '../atoms/button'
import withIconStyle, { HistoryIcon } from '../atoms/icon'
import { Dehaze } from '@mui/icons-material'

const ContentArea = styled.div`
  display: flex;
  height: 100vh;
`
interface LearnTemplateProps {
  data?: any
  title?: any
}

const LearnTemplate = (props: LearnTemplateProps) => {
  const [isShow, setIsShow] = useState(true)
  const switchSideBar = () => setIsShow(!isShow)
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <ContentArea>
        {isShow ? (
          <SideBar data={props.data} handle={switchSideBar} flag={true} />
        ) : (
          <SideBar handle={switchSideBar} flag={false} />
        )}
        <div>
          <Text variant='large' marginLeft='1em' fontColor={theme.colors.black}>
            {props.title}
          </Text>
        </div>
      </ContentArea>
    </div>
  )
}

export default LearnTemplate
