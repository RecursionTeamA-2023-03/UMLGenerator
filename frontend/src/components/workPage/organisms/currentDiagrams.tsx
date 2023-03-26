import { Project, Diagram } from '@/interfaces/dataTypes'
import styled from 'styled-components'
import Icon from '../atoms/icon'
import RectButton from '../atoms/rectButton'

type Props = {
  projects: (Project & { diagrams: Diagram[] })[]
  handleSelectDiagram: (dId: number, pId?: number | undefined) => void
}

export default function currentDiagrams({ projects, handleSelectDiagram }: Props) {
  let diagramArray: (Diagram & { projectId: number; projectName: string })[] = []
  projects.forEach((p) =>
    p.diagrams.forEach((d) => diagramArray.push({ ...d, projectId: p.id, projectName: p.name })),
  )
  diagramArray = diagramArray
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Icon srcPath='/clock-icon.png' />
        最近使用したもの
      </div>
      <Container>
        {diagramArray.map((d) => {
          return (
            <RectButton
              key={d.id}
              name={d.name + '/' + d.projectName}
              color='blue'
              onClick={() => handleSelectDiagram(d.id, d.projectId)}
            />
          )
        })}
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
