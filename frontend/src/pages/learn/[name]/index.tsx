import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React from 'react'
import Link from 'next/link'
import {
  getAllDiagramNames,
  getDiagramData,
  getDiagramDataList,
  getProblemDataList,
} from 'lib/diagram'
import { MDXRemote } from 'next-mdx-remote'

export const getStaticPaths = async () => {
  const paths = await getAllDiagramNames()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const allDiagramData = await getDiagramDataList()
  const currDiagramData = await getDiagramData(params.name)
  const problems = await getProblemDataList(params.name)
  return {
    props: {
      allDiagramData,
      currDiagramData,
      problems,
    },
  }
}

export default function LearnContent({ allDiagramData, currDiagramData, problems }: any) {
  const components = {
    ProblemList: () => (
      <>
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
      </>
    ),
  }
  return (
    <LearnTemplate sidebarData={allDiagramData} data={currDiagramData}>
      <MDXRemote components={components} {...currDiagramData.mdxSource}></MDXRemote>
    </LearnTemplate>
  )
}
