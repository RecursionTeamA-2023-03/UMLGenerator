import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import SettingsIcon from '@mui/icons-material/Settings'
import { useRouter } from 'next/router'
import DrawerLeft from './drawer'
import useAuth from '@/hooks/useAuth'

const pages = [
  { name: 'work', link: 'work' },
  { name: 'learn', link: 'learn' },
  { name: 'cheat sheet', link: 'cheatSheets/アクティビティ図' },
]
const settings = [
  //  { name: 'Account', link: 'acount', mode: 'login' },
  { name: '新規登録', link: 'signUp', mode: 'logout' },
  { name: 'ログイン', link: 'login', mode: 'logout' },
  { name: 'ログアウト', link: 'logout', mode: 'login' },
]

type Props = {
  children?: React.ReactNode
  withDrawer?: boolean
}

function AppBarWithDrawer({ children, withDrawer = false }: Props) {
  const { isLogin, logout } = useAuth()
  const [openDrawer, setDrawer] = React.useState<boolean>(true)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleDrawer = () => {
    setDrawer(!openDrawer)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleClickLink = (link: string) => {
    handleCloseUserMenu()
    if (link === 'logout') {
      logout()
    } else {
      router.push(`/${link}`)
    }
  }

  React.useEffect(() => {
    if (!isLogin && router.pathname !== '/') router.push('/')
  }, [isLogin, router])

  return (
    <>
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {withDrawer && isLogin && (
              <IconButton
                size='large'
                aria-label='drawer-menu'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleDrawer}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
            )}
            <AccountTreeIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              UDG
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {isLogin &&
                pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => handleClickLink(page.link)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings
                  .filter((setting) =>
                    isLogin ? setting.mode === 'login' : setting.mode === 'logout',
                  )
                  .map((setting) => (
                    <MenuItem key={setting.name} onClick={() => handleClickLink(setting.link)}>
                      <Typography textAlign='center'>{setting.name}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {withDrawer && <DrawerLeft open={openDrawer}>{children}</DrawerLeft>}
    </>
  )
}
export default AppBarWithDrawer
