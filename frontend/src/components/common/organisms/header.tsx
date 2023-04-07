import { theme } from '../../../themes'
import Link from 'next/link'
import styled from 'styled-components'
import Text from '../atoms/text'
import { useEffect, useState } from 'react'
import IconWithPopup from '../molecules/iconWithPopup'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useQueryUser } from '../../../../hooks/useQueryUser'

const HeaderArea = styled.header`
  height: 20%;
  background-color: ${theme.colors.secondary};
  padding: 0.5em 2em;
  display: flex;
  justify-content: space-between;
`
const Nav = styled.div`
  & > span:not(:first-child) {
    margin-left: 1em;
  }
`
const Anchor = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data, isError } = useQueryUser()
  useEffect(() => {
    setIsLoggedIn(!isError && data)
  }, [data, isError])

  const handleLogout = async () => {
    setIsLoggedIn(false)
    queryClient.removeQueries['user']
    await axios.post(`http://localhost/auth/logout`)
    router.push('/auth')
  }
  return (
    <HeaderArea>
      <Nav>
        <Anchor>
          <Link href={'/'}>UDG</Link>
        </Anchor>
        {isLoggedIn && (
          <Anchor>
            <Link href={'/work'}>Work</Link>
          </Anchor>
        )}
        <Anchor>
          <Link href={'/learn'}>Learn</Link>
        </Anchor>
        <Anchor>
          <Link href={'/cheatSheets'}>CheatSheets</Link>
        </Anchor>
      </Nav>
      <Nav>
        <Anchor>
          <IconWithPopup
            popupText={isLoggedIn ? 'Logout' : 'SingIn/SingUp'}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        </Anchor>
      </Nav>
    </HeaderArea>
  )
}

export default Header
