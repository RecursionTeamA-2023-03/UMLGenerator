import { Logout } from '@mui/icons-material'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../atoms/button'
import withIconStyle, { PersonIcon } from '../atoms/icon'

interface IconWithPopupProps {
  popupText: string
  isLoggedIn: boolean
  onLogout?: () => void
}

const PopupWrapper = styled.div`
  position: relative;
`
const PopupBadge = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
`

const IconWithPopup = (props: IconWithPopupProps) => {
  const [showPopup, setShowPopup] = useState(false)

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const LogoutIcon = withIconStyle(Logout)

  return (
    <PopupWrapper>
      <PersonIcon onClick={togglePopup} fontSize='2rem' />
      {showPopup && (
        <PopupBadge>
          {props.isLoggedIn ? (
            <LogoutIcon onClick={props.onLogout} />
          ) : (
            <Link href={'/signIn'}>{props.popupText}</Link>
          )}
        </PopupBadge>
      )}
    </PopupWrapper>
  )
}

export default IconWithPopup
