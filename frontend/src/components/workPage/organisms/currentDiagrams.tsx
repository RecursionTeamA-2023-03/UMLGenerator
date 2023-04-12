import { Project, Diagram } from '@/interfaces/dataTypes'
import styled from 'styled-components'
import Icon from '../atoms/icon'
import RectButton from '../atoms/rectButton'
import { useEffect, useState } from 'react'

type Props = {
  projects?: (Project & { diagrams: Diagram[] })[]
  handleSelectDiagram: (dId: number, pId?: number | undefined) => void
}

export default function CurrentDiagrams({ projects, handleSelectDiagram }: Props) {
  const [ diagramArray, setDiagramArray ] = useState<(Diagram & { projectId: number; projectName: string })[]>([])
  useEffect(()=>{
    let arr: (Diagram & { projectId: number; projectName: string })[] = []
    projects?.forEach((p) => {
      const dArr:(Diagram & { projectId: number; projectName: string })[] = p.diagrams.map(d => {
        return { ...d, projectId: p.id, projectName: p.name }
      })
      arr = [...arr, ...dArr]
      arr = arr.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 3)
    })
    setDiagramArray(arr)
  },[projects])

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
