import withIconStyle from '../../common/atoms/icon'
import { theme } from '@/themes'
import { Close, Dehaze } from '@mui/icons-material'
import Link from 'next/link'
import styled from 'styled-components'
import Text from '../../common/atoms/text'

const SideBarArea = styled.div`
  padding-left: 1em;
  padding-top: 0.5em;
  border-right: 1px solid gray;
  background-color: ${theme.colors.white};
`

const Anchor = styled(Text)`
  color: black;
  &:hover {
    text-decoration: underline;
  }
`

const CloseIcon = withIconStyle(Close)

const DehazeIcon = withIconStyle(Dehaze)

const IconArea = styled.div`
  display: flex;
  justify-content: space-between;
`
interface SideBarProps {
  data?: any
  handle?: any
  flag?: boolean
}

const SideBar = (v: SideBarProps) => {
  return (
    <SideBarArea>
      {v.flag ? (
        <>
          <IconArea>
            <DehazeIcon color='gray' onClick={v.handle} />
            <CloseIcon color='gray' onClick={v.handle} />
          </IconArea>
          <ul>
            {v.data?.map((i: any) => (
              <li key={i.slug}>
                <Anchor variant='small'>
                  <Link href={`/cheatSheets/${i.slug}`}>{i.slug}</Link>
                </Anchor>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <DehazeIcon color='gray' onClick={v.handle} />
      )}
    </SideBarArea>
  )
}

export default SideBar
