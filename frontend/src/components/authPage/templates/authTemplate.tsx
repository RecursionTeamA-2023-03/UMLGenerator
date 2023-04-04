import styled from 'styled-components'
import SignInForm from '../organisms/singInForm'

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const AuthTemplate = () => {
  return (
    <>
      <main>
        <ContentArea>
          <SignInForm />
        </ContentArea>
      </main>
    </>
  )
}

export default AuthTemplate
