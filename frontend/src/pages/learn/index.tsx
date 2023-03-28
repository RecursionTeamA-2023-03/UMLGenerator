import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../../components/common/templates/layout'
import Text from '../../components/common/atoms/text'
import { theme } from '../../themes'

const tempData = [
  {
    name: 'シーケンス図',
  },
  {
    name: 'ユースケース図',
  },
  {
    name: 'クラス図',
  },
  {
    name: 'オブジェクト図',
  },
  {
    name: 'アクティビティ図',
  },
  {
    name: 'コンポーネント図',
  },
  {
    name: '状態遷移図',
  },
  {
    name: 'タイミング図',
  },
]

const Anchor = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`

export default function Learn() {
  return (
    <Layout>
      <div>
        <Text variant='large' marginLeft='1em'>
          イントロダクション
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {tempData.map((i) => (
            <Anchor variant='small' key={i.name}>
              <Link href={`/learn/${i.name}`}>{i.name}</Link>
            </Anchor>
          ))}
        </div>
      </div>
    </Layout>
  )
}
