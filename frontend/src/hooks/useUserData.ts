import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import useSWR, { Fetcher } from 'swr'
import { User } from '@/interfaces/dataTypes'

const apiUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/api`
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

export default function useUserData() {
  const { data, error, isLoading, mutate } = useSWR<User, AxiosError>(`${apiUrl}/user`, fetcher, {
    errorRetryCount: 0,
  })

  return {
    data: data,
    error: error,
    isLoading: isLoading,
    mutate: mutate,
  }
}
