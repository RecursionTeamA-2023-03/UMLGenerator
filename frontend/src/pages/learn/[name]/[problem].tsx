import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React from 'react'
import { useRouter } from 'next/router'
import MonacoEditor from '@/components/common/atoms/editor'
import { getAllDiagramsData, getProblemIds } from 'lib/diagram'

export const getStaticPaths = async () => {
  const paths = getAllDiagramsData()
    .map((diagram) => {
      const problemPath = getProblemIds(diagram.id).map((i: any) => {
        return {
          params: {
            name: diagram.id,
            problem: i.id,
          },
        }
      })
      return problemPath.flat()
    })
    .flat()
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: any) => {
  const currDiagramData = getAllDiagramsData().find((v) => v.id === params.name)
  const currProblem = getProblemIds(params.name).find((v) => v.id === params.problem)
  console.log(currProblem)
  const allData = getAllDiagramsData()
  return {
    props: {
      currDiagramData,
      currProblem,
      allData,
    },
  }
}

export default function Problem({ currDiagramData, currProblem, allData }: any) {
  return (
    <LearnTemplate sidebarData={allData} data={currProblem} problemNo={currProblem.id}>
      <Text variant='small' fontColor={theme.colors.black}>
        <div dangerouslySetInnerHTML={{ __html: currProblem.content }} />
      </Text>
      <MonacoEditor />
    </LearnTemplate>
  )
}
