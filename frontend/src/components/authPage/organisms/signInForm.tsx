import Button from '@/components/common/atoms/button'
import { useState } from 'react'
import styled from 'styled-components'
import InputField from '../molecules/inputField'
import axios from 'axios'
import { useRouter } from 'next/router'

const Container = styled.div`
display: flex:
flex-direction: column;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const SignInForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(`http://localhost/auth/login`, {
        email: email,
        password: password,
      })
      router.push('/')
    } catch (e) {
      alert(e)
    }
  }

  const handleInputChange = (event) => {
    const { target } = event
    switch (target.id) {
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
    <Container>
      <Form onSubmit={handleSubmit}>
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
        <Button type='submit' width='100%'>
          Login
        </Button>
      </Form>
      <Button
        width='100%'
        onClick={() => {
          router.push(`/auth/signUp`)
        }}
      >
        新規登録
      </Button>
    </Container>
  )
}

export default SignInForm
