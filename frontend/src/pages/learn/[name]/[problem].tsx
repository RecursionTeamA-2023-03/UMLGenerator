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

export default function Problem({ currProblem, allData }: any) {
  const [umlText, setUmlText] = useState('')
  const Wrapper = styled.div`
    width: 50%;
  `

  const AnswerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  const AnswerPicWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
  `
  const DownIcon = withIconStyle(ArrowDropDown)
  return (
    <LearnTemplate sidebarData={allData} data={currProblem} problemNo={currProblem.title}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Wrapper>
          <MDXRemote {...currProblem.mdxSource} />
          <AnswerWrapper>
            <Text variant='medium' fontColor={theme.colors.black}>
              解答例
            </Text>
            <AnswerPicWrapper>
              <UmlPic umlText={currProblem.ans} />
            </AnswerPicWrapper>
          </AnswerWrapper>
        </Wrapper>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1, width: '50vw', height: '25%', border: '1px solid black' }}>
            <MonacoEditor onChange={setUmlText} width='98%' />
          </div>
          <DownIcon fontSize='5rem' />
          <div
            style={{
              flex: 1,
              width: '25vw',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UmlPic umlText={umlText} />
          </div>
        </div>
      </div>
    </LearnTemplate>
  )
}
