import styled from 'styled-components'
import Separator from '../atoms/separator'
import Header from '../organisms/header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default Layout
