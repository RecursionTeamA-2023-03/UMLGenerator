import Button from '@/components/common/atoms/button'
import { useState } from 'react'
import styled from 'styled-components'
import InputField from '../molecules/inputField'
import axios from 'axios'
import { useRouter } from 'next/router'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const apiUrl = `https://${process.env.AWS_DOMAIN || 'localhost'}:443/api`

const SignUpForm = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await axios.post(`${apiUrl}/auth/signup`, {
        name: username,
        email: email,
        password: password,
      })
      await axios.post(`${apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      router.push('/learn')
    } catch (e) {
      alert(e)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    switch (target.id) {
      case 'username':
        setUsername(target.value)
        break
      case 'email':
        setEmail(target.value)
        break
      case 'password':
        setPassword(target.value)
        break
      default:
        break
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        label='UserName'
        type='text'
        id='username'
        placeholder='Enter your name'
        onChange={handleInputChange}
      />
      <InputField
        label='Email'
        type='email'
        id='email'
        placeholder='Enter your email'
        onChange={handleInputChange}
      />
      <InputField
        label='Password'
        type='password'
        id='password'
        placeholder='Enter your password'
        onChange={handleInputChange}
      />
      <Button type='submit'>Sign Up</Button>
    </Form>
  )
}

export default SignUpForm
