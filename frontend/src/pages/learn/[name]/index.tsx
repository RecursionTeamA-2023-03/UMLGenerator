import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React from 'react'
import Link from 'next/link'
import { getAllDiagramIds, getDiagramData, getAllDiagramsData, getProblemIds } from 'lib/diagram'

export const getStaticPaths = async () => {
  const paths = getAllDiagramIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const allDiagramData = getAllDiagramsData()
  const currDiagramData = await getDiagramData(params.name)
  const problems = getProblemIds(params.name)
  return {
    props: {
      allDiagramData,
      currDiagramData,
      problems,
    },
  }
}

export default function LearnContent({ allDiagramData, currDiagramData, problems }: any) {
  return (
    <LearnTemplate sidebarData={allDiagramData} data={currDiagramData}>
      <Text variant='small' fontColor={theme.colors.black}>
        <div dangerouslySetInnerHTML={{ __html: currDiagramData.diagramContentHTML }} />
      </Text>
      <br />
      <Text variant='medium' fontColor={theme.colors.black}>
        練習問題に取り組みましょう
      </Text>
      {problems.map((id: any) => {
        return (
          <Text as='p' variant='medium' key={id.id} fontColor={theme.colors.black}>
            <Link href={`/learn/${currDiagramData.id}/${id.id}`}>{id.title}</Link>
          </Text>
        )
      })}
    </LearnTemplate>
  )
}
