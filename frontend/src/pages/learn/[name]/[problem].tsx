import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React from 'react'
import { useRouter } from 'next/router'
import Editor from '@/components/common/atoms/editor'
import NewEditor from '@/components/common/atoms/editor'

const tempData = [
  {
    name: 'シーケンス図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
  {
    name: 'ユースケース図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
  {
    name: 'クラス図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
  {
    name: 'オブジェクト図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
  {
    name: 'アクティビティ図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
  {
    name: 'コンポーネント図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
  {
    name: '状態遷移図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
  {
    name: 'タイミング図',
    description: 'nodata',
    problems: ['problem1', 'problem2,'],
  },
]

export const getStaticPaths = async () => {
  const paths = tempData
    .map((diagram) => {
      const problemPath = diagram.problems.map((i) => {
        return {
          params: {
            name: diagram.name,
            problem: i,
          },
        }
      })
      return problemPath.flat()
    })
    .flat()
  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const data = tempData.find((v) => v.name === context.params.name)
  return {
    props: {
      data,
    },
  }
}

export default function Problem({ data }: any) {
  const router = useRouter().query
  console.log(router)
  return (
    <LearnTemplate data={tempData} title={data.name} problemNo={router.problem}>
      <Text fontColor={theme.colors.black}>ここは例題{router.problem}</Text>
      <NewEditor />
    </LearnTemplate>
  )
}
