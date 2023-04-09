import Text from '@/components/common/atoms/text'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SignInForm from '../organisms/signInForm'
import SignUpForm from '../organisms/signUpForm'

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const AuthTemplate = () => {
  const router = useRouter()
  return (
    <>
      <main>
        <ContentArea>
          {router.asPath == '/' ? (
            <>
              <Text variant='medium'>SIGNUP</Text>
              <SignUpForm />
            </>
          ) : (
            <>
              <Text variant='medium'>LOGIN</Text>
              <SignInForm />
            </>
          )}
        </ContentArea>
      </main>
    </>
  )
}

export default AuthTemplate
