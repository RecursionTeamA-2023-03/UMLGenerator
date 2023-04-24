import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React, { useState } from 'react'
import MonacoEditor from '@/components/common/atoms/editor'
import { getDiagramDataList, getProblemDataList } from 'lib/diagram'
import UmlPic from '@/components/common/organisms/umlPic'
import { display } from '@mui/system'
import styled from 'styled-components'
import withIconStyle from '@/components/common/atoms/icon'
import { ArrowDropDown } from '@mui/icons-material'
import { MDXRemote } from 'next-mdx-remote'
import { Grid, Paper, Typography } from '@mui/material'

export const getStaticPaths = async () => {
  const diagrams = await getDiagramDataList()
  const paths = await Promise.all(
    diagrams.map(async (diagram) => {
      const problems = await getProblemDataList(diagram.id)
      return problems.map((problem) => ({
        params: { name: diagram.id, problem: problem.id },
      }))
    }),
  )
  return { paths: paths.flat(), fallback: false }
}

export const getStaticProps = async ({ params }: any) => {
  const currDiagramData = (await getDiagramDataList()).find((v) => v.id === params.name)
  const currProblem = (await getProblemDataList(params.name)).find(
    (v: any) => v.id === params.problem,
  )
  const allData = await getDiagramDataList()
  return {
    props: {
      currDiagramData,
      currProblem,
      allData,
    },
  }
}

const AnswerWrapper = styled.div`
  margin-top: 1rem;
`

const EditorWrapper = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 40vh;
  font-size: 0.9rem;
`

const UmlPicWrapper = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`

export default function Problem({ currProblem, allData }: any) {
  const [umlText, setUmlText] = useState('')

  return (
    <LearnTemplate sidebarData={allData} data={currProblem} problemNo={currProblem.title}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, flexBasis: '0' }}>
          <MDXRemote {...currProblem.mdxSource} />
          <AnswerWrapper>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>解答例</h3>
            <UmlPic umlText={currProblem.ans} />
          </AnswerWrapper>
        </div>
        <div style={{ flexGrow: 1, flexBasis: '0' }}>
          <EditorWrapper>
            <MonacoEditor onChange={setUmlText} />
          </EditorWrapper>
          <UmlPicWrapper>
            <UmlPic umlText={umlText} />
          </UmlPicWrapper>
        </div>
      </div>
    </LearnTemplate>
  )
}
