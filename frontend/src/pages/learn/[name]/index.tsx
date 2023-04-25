import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import React from 'react'
import {
  getAllDiagramNames,
  getDiagramData,
  getDiagramDataList,
  getProblemDataList,
} from 'lib/diagram'
import { MDXRemote } from 'next-mdx-remote'
import ProblemBox from '@/components/common/molecules/problemBox'

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
        {problems.map((id: any) => {
          return (
            <ProblemBox
              key={id.title}
              link={`/learn/${currDiagramData.id}/${id.id}`}
              title={id.title}
            />
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
