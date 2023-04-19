import SideBar from '../../common/organisms/sidebar'
import Header from '../../common/organisms/header'
import Text from '@/components/common/atoms/text'
import styled from 'styled-components'
import { theme } from '@/themes'
import { useState } from 'react'
import BreadcrumbItem from '../atoms/breadcrumbItem'
import Link from 'next/link'
import AppBarWithDrawer from '@/components/common/templates/appBar'
import { Box, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'
import withIconStyle from '@/components/common/atoms/icon'
import { Topic } from '@mui/icons-material'

const ContentArea = styled.div`
  display: flex;
  height: 100vh;
`
const StyledListItem = styled(ListItem)`
  &.active {
    background-color: #f5f5f5;
    opacity: 1;
  }

  &:not(.active) {
    opacity: 0.7;
  }
`
interface LearnTemplateProps {
  sidebarData?: any
  data?: any
  problemNo?: any
  children: React.ReactNode
}

const LearnTemplate = ({ children, sidebarData, data, problemNo }: LearnTemplateProps) => {
  const router = useRouter()
  const currentPath = router.asPath.split('/')[2]
  return (
    <>
      <AppBarWithDrawer withDrawer={true}>
        <List>
          <StyledListItem key='introduction' className={currentPath === undefined ? 'active' : ''}>
            <ListItemButton onClick={() => router.push(`/learn/`)}>
              <ListItemText primary='イントロダクション' />
            </ListItemButton>
          </StyledListItem>
          {sidebarData.map((data: any) => (
            <StyledListItem key={data.id} className={currentPath === data.id ? 'active' : ''}>
              <ListItemButton onClick={() => router.push(`/learn/${data.id}`)}>
                <ListItemText primary={data.title} />
              </ListItemButton>
            </StyledListItem>
          ))}
        </List>
      </AppBarWithDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div style={{ padding: '2rem' }}>
          <Text variant='large' marginLeft='1em' fontColor={theme.colors.black}>
            {data.title}
          </Text>
          <div>
            {currentPath && (
              <BreadcrumbItem>
                <Text variant='small'>
                  <Link href='/learn'>イントロダクション</Link>
                </Text>
              </BreadcrumbItem>
            )}
            {problemNo ? (
              <>
                <BreadcrumbItem>
                  <Text variant='small'>
                    <Link href={`/learn/${data.diagram}`}>{data.diagram}</Link>
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
                  {data.title}
                </Text>
              </BreadcrumbItem>
            )}
          </div>
          {children}
        </div>
      </Box>
    </>
  )
}

export default LearnTemplate
