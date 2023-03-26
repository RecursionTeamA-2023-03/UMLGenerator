import Layout from '@/components/common/templates/layout'
import Text from '@/components/learnPage/atoms/text'
import LearnTemplate from '@/components/learnPage/templates/learnTemplate'

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

export const getStaticPaths = async () => {
  const data = tempData
  const paths = data.map((v) => `/learn/${v.name}`)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: any) => {
  const data = context.params
  return {
    props: {
      data,
    },
  }
}

export default function LearnContent({ data }: any) {
  return <LearnTemplate data={tempData} title={data.name} />
}
