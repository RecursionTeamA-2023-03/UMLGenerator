import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import { Toolbar } from '@mui/material'

const drawerWidth = 240

type Props = {
  open: boolean
  children?: React.ReactNode
}

export default function DrawerLeft({ children, open }: Props) {
  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <Toolbar />
      <Divider />
      {children}
    </Drawer>
  )
}
