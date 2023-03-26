import SideBar from '@/components/common/organisms/sidebar'
import LearnTemplate from '@/components/learnPage/templates/learnTemplate'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../../components/common/templates/layout'
import Text from '../../components/learnPage/atoms/text'
import { theme } from '../../themes'

const tempData = [
  {
    name: 'イントロダクション',
  },
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

export default function Learn() {
  return <LearnTemplate data={tempData} title={'イントロダクション'} />
}
