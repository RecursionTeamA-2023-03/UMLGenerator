import styled from 'styled-components'
import Text from '../../components/common/atoms/text'
import LearnTemplate from '@/components/learnPage/templates/learnTemplate'

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
    <LearnTemplate data={tempData}>
      <div>
        <Text variant='large' marginLeft='1em'>
          イントロダクション
        </Text>
      </div>
    </LearnTemplate>
  )
}
