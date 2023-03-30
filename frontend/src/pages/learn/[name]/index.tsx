import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React from 'react'
import Link from 'next/link'

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
  const data = tempData
  const paths = data.map((v) => {
    return {
      params: {
        name: v.name,
        description: v.description,
        problem: v.problems[0],
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: any) => {
  const data = tempData.find((v) => v.name === context.params.name)
  return {
    props: {
      data,
    },
  }
}

export default function LearnContent({ data }: any) {
  console.log(data)
  return (
    <LearnTemplate data={tempData} title={data.name}>
      <Text fontColor={theme.colors.black}>
        ここは説明です↓
        <br />
        {data.description}
      </Text>
      <br />
      <Text fontColor={theme.colors.black}>
        ここは練習問題です↓
        <br />
        {data.problems.map((i: any) => (
          <li key={i}>
            <Text variant='small' fontColor={theme.colors.black}>
              <Link href={`/learn/${data.name}/${i}`}>{i}</Link>
            </Text>
          </li>
        ))}
      </Text>
    </LearnTemplate>
  )
}
