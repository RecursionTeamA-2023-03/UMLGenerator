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
  const router = useRouter()
  return (
    <>
      <AppBarWithDrawer withDrawer={true}>
        <List>
          <ListItem key="introduction">
            <ListItemButton onClick={()=>router.push(`/learn/`)}>
              <ListItemText primary="Introduction" />
            </ListItemButton>
          </ListItem>
          {sidebarData.map((data:any)=>(
            <ListItem key={data.id}>
              <ListItemButton onClick={()=>router.push(`/learn/${data.id}`)}>
                <ListItemText primary={data.id} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AppBarWithDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
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
                    {data.id}
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
