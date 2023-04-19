import React from 'react'
import Box from '@mui/material/Box'

interface CustomBoxProps {
  children: React.ReactNode
  position?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
}

const CustomBox = ({ children, position = 'space-between' }: CustomBoxProps) => {
  return (
    <Box display='flex' justifyContent={position}>
      {children}
    </Box>
  )
}

export default CustomBox
