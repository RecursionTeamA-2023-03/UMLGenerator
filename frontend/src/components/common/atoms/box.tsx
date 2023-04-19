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
  direction?: 'row' | 'column'
}

const CustomBox = ({ children, position = 'space-between', direction }: CustomBoxProps) => {
  return (
    <Box display='flex' justifyContent={position} flexDirection={direction}>
      {children}
    </Box>
  )
}

export default CustomBox
