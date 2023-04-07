import SignUpForm from '@/components/authPage/organisms/signUpForm'
import AuthTemplate from '@/components/authPage/templates/authTemplate'
import Text from '@/components/common/atoms/text'
import Layout from '@/components/common/templates/layout'
import axios from 'axios'

export default function Auth() {
  return (
    <Layout>
      <AuthTemplate />
    </Layout>
  )
}
