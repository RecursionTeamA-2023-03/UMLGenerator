import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const apiUrl = `https://${process.env.AWS_DOMAIN || 'localhost'}:443/api`

export const useQueryUser = () => {
  const router = useRouter()
  const getUser = async () => {
    const { data } = await axios.get(`${apiUrl}/user`)
    return data
  }
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) return router.push('/')
    },
  })
}
