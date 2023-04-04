import styled from 'styled-components'
import InputField from '../molecules/inputField'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
`

const SignInForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    // submit the form data to the server
  }

  const handleInputChange = (event) => {
    // handle input changes
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

export default SignInForm
