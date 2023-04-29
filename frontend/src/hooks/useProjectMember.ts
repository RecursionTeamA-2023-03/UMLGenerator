import useSWR, { Fetcher } from 'swr'
import axios from 'axios'

type ProjectMember = {
  name: string
  email: string
}

const apiUrl = `https://${process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'}:443/api`

const fetcher: Fetcher<ProjectMember[], string> = async (url: string) => {
  return await axios.get(url).then((res) => res.data)
}

export default function useProjectMember(projectId: number) {
  axios.defaults.withCredentials = true
  const { data, isLoading, error, mutate } = useSWR(
    `${apiUrl}/project/${projectId}/members`,
    fetcher,
  )

  const deleteMember = async (email: string) =>
    await axios
      .delete(`${apiUrl}/project/${projectId}/member`, {
        data: {
          email: email,
        },
      })
      .then(() => mutate())
      .catch((e) => alert(e.response.data.message))

  const inviteMember = async (email: string) =>
    await axios
      .post(`${apiUrl}/project/${projectId}/member`, {
        email: email,
      })
      .then(() => {
        mutate()
      })
      .catch((e) => alert(e.response.data.message))

  return {
    data: data,
    isLoading: isLoading,
    error: error,
    handlers: {
      invite: inviteMember,
      delete: deleteMember,
    },
  }
}
