import { theme } from '../../../themes'
import Link from 'next/link'
import styled from 'styled-components'
import Text from '../atoms/text'

const HeaderArea = styled.header`
  background-color: ${theme.colors.secondary};
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;
`
const Nav = styled.div`
  & > span:not(:first-child) {
    margin-left: 1em;
  }
`
const Anchor = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`
const Header = ({ className }: any) => {
  return (
    <HeaderArea className={className}>
      <Nav>
        <Anchor>
          <Link href={'/'}>UDG</Link>
        </Anchor>
        <Anchor>
          <Link href={'/work'}>Work</Link>
        </Anchor>
        <Anchor>
          <Link href={'/learn'}>Learn</Link>
        </Anchor>
        <Anchor>
          <Link href={'/docs'}>Docs</Link>
        </Anchor>
      </Nav>
      <Nav>
        <Anchor>
          <Link href={'/auth'}>Icon</Link>
        </Anchor>
      </Nav>
    </HeaderArea>
  )
}

export default Header
