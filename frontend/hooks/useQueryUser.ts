import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const useQueryUser = () => {
  const router = useRouter()
  const getUser = async () => {
    const { data } = await axios.get(`http://localhost/api/user`)
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
