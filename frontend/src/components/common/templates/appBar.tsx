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
import axios, { AxiosRequestConfig } from 'axios'
import useSWR, { Fetcher } from 'swr'
import { User } from '@/interfaces/dataTypes'
import { useRouter } from 'next/router'
import DrawerLeft from './drawer'

const pages = [
  { name: 'work', link: 'work' },
  { name: 'learn', link: 'learn' },
  { name: 'cheat sheet', link: 'cheatSheets' },
]
const settings = [
  { name: 'Account', link: 'acount', mode: 'login' },
  { name: 'Signup', link: 'signIn', mode: 'logout' },
  { name: 'Login', link: 'login', mode: 'logout' },
  { name: 'Logout', link: 'logout', mode: 'login' },
]

const apiUrl = `https://${process.env.AWS_DOMAIN || 'localhost'}:443/api`
const axiosConfig: AxiosRequestConfig = {
  transformResponse: (data) =>
    JSON.parse(data, (key, val) => {
      if (key === 'createdAt' || key === 'updatedAt') return new Date(val)
      else return val
    }),
}
const fetcher: Fetcher<User, string> = async (url: string) => {
  return await axios.get(url, axiosConfig).then((res) => res.data)
}

type Props = {
  children?: React.ReactNode
  withDrawer?: boolean
}

function AppBarWithDrawer({ children, withDrawer = false }: Props) {
  const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/user`, fetcher)
  const [openDrawer, setDrawer] = React.useState<boolean>(withDrawer)
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
      router.push('/')
      axios.post(`${apiUrl}/auth/logout`).then(() => mutate())
    } else {
      router.push(`/${link}`)
    }
  }

  if (error && router.pathname !== '/') router.push('/')

  return (
    <>
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {withDrawer && data && (
              <IconButton
                size='large'
                aria-label='account of current user'
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
              {data &&
                !isLoading &&
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
                    data ? setting.mode === 'login' : setting.mode === 'logout',
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
