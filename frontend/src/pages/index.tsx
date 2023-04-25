import AppBarWithDrawer from '@/components/common/templates/appBar'
import { Button, Box, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <AppBarWithDrawer />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Typography variant='h1'>UML</Typography>
            <Typography variant='h1'>Diagram</Typography>
            <Typography variant='h1'>Generator</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: '3rem' }}>
            <Button variant='contained' sx={{ mb: '1rem' }} onClick={() => router.push('/signUp')}>
              {'sign up'}
            </Button>
            <Button variant='outlined' onClick={() => router.push('/login')}>
              {'Log in'}
            </Button>
          </Box>
        </Box>
        {
          //  <Typography>サイトの説明やイメージ画像でルートページのデザインを改善する</Typography>
        }
      </Box>
    </>
  )
}
