import Text from '../../../components/common/atoms/text'
import LearnTemplate from '../../../components/learnPage/templates/learnTemplate'
import { theme } from '../../../themes'
import React, { useState } from 'react'
import MonacoEditor from '@/components/common/atoms/editor'
import { getAllDiagramsData, getProblemIds } from 'lib/diagram'
import UmlPic from '@/components/common/organisms/umlPic'
import { display } from '@mui/system'
import styled from 'styled-components'
import withIconStyle from '@/components/common/atoms/icon'
import { ArrowDropDown } from '@mui/icons-material'

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
  const allData = getAllDiagramsData()
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
  const [showAnswer, setShowAnswer] = useState(false)
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
          <Text variant='small' fontColor={theme.colors.black}>
            <div dangerouslySetInnerHTML={{ __html: currProblem.htmlContent }} />
          </Text>
          <AnswerWrapper>
            <Text variant='medium' fontColor={theme.colors.black}>
              正解結果
            </Text>
            {showAnswer ? (
              <AnswerPicWrapper>
                <UmlPic umlText={currProblem.ans} />
              </AnswerPicWrapper>
            ) : (
              <AnswerPicWrapper onClick={() => setShowAnswer(true)}>
                <img alt='答えを見る' />
              </AnswerPicWrapper>
            )}
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
