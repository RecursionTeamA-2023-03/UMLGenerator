import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React from 'react'
import { useRouter } from 'next/router'
import MonacoEditor from '@/components/common/atoms/editor'
import { getDiagramsData, getProblemIds } from 'lib/diagram'

export const getStaticPaths = async () => {
  const paths = getDiagramsData()
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
  const currdata = getDiagramsData().find((v) => v.id === params.name)
  const alldata = getDiagramsData()
  return {
    props: {
      currdata,
      alldata,
    },
  }
}

export default function Problem({ currdata, alldata }: any) {
  const router = useRouter().query
  return (
    <LearnTemplate sidebarData={alldata} data={currdata} problemNo={router.problem}>
      <Text fontColor={theme.colors.black}>ここは例題{router.problem}</Text>
      <MonacoEditor />
    </LearnTemplate>
  )
}
