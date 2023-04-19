import Button from '@mui/material/Button'
import Link from 'next/link'
import styled from 'styled-components'

interface IconButtonProps {
  text: string
  link: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
const Container = styled.div`
  margin-top: 2rem;
`

const StyledButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#000',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
})

const IconButton = ({ text, startIcon, endIcon, link }: IconButtonProps) => {
  return (
    <Container>
      <Link href={link} passHref>
        <StyledButton variant='outlined' startIcon={startIcon} endIcon={endIcon}>
          {text}
        </StyledButton>
      </Link>
    </Container>
  )
}

export default IconButton
