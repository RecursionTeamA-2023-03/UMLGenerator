import axios from 'axios'
import { useRouter } from 'next/router'
import useUserData from './useUserData'

const apiUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/api`

export default function useAuth() {
  axios.defaults.withCredentials = true
  const router = useRouter()
  const { data, error, mutate } = useUserData()

  const getCsrf = async () =>
    await axios.get(`${apiUrl}/auth/csrf`).then((res) => {
      axios.defaults.headers.common['csrf-token'] = res.data.csrfToken
    })

  const login = async (email: string, password: string) =>
    await axios
      .post(`${apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .then(() => mutate())
      .then(() => router.push('/work'))
      .catch((error) => alert(error.response.data.message))

  const signup = async (name: string, email: string, password: string) =>
    await axios
      .post(`${apiUrl}/auth/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then(() => login(email, password))
      .catch((error) => alert(error.response.data.message))

  const logout = async () =>
    await axios
      .post(`${apiUrl}/auth/logout`)
      .then(() => router.push('/'))
      .then(() => mutate(undefined))

  const hasUnAuthorizedError = () => {
    if (!error || !error.response) return false
    return error.response.status === 401
  }

  return {
    isLogin: Boolean(data && !hasUnAuthorizedError()),
    getCsrf: getCsrf,
    signup: signup,
    login: login,
    logout: logout,
  }
}
