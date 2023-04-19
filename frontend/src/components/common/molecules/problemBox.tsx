import Link from 'next/link'
import { Typography, Box } from '@mui/material'
import ComputerIcon from '@mui/icons-material/Computer'

interface ProblemBoxProps {
  link: string
  title: string
}

const ProblemBox = ({ link, title }: ProblemBoxProps) => {
  return (
    <Box
      sx={{
        border: '2px solid blue',
        borderRadius: '4px',
        p: '16px',
        m: '16px',
        width: '80%',
      }}
    >
      <Typography component='h2' sx={{ mb: 2 }}>
        コーディング問題でアウトプットして、学んだ知識を定着させましょう！
      </Typography>
      <Link href={link}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ComputerIcon sx={{ mr: 1 }} />
          <Typography sx={{ flex: '1 1 auto' }}>{title}</Typography>
        </Box>
      </Link>
    </Box>
  )
}

export default ProblemBox
