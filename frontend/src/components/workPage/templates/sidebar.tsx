import { useState } from 'react'
import styled from 'styled-components'
import { Project, Diagram } from '@/interfaces/dataTypes'
import Icon from '../atoms/icon'
import SelectProjects from '../organisms/selectProjects'
import SelectBoards from '../organisms/selectBoards'

type Props = {
  projects?: (Project & { diagrams: Diagram[] })[]
  isMyBoard: boolean
  handleSelectBoard: (b: boolean) => void
  projectId: number | null
  diagramId: number | null
  handleSelectProject: (id: number) => void
  handleSelectDiagram: (dId: number, pId?: number) => void
  addProject: () => void
}

export default function Sidebar({
  projects,
  isMyBoard,
  handleSelectBoard,
  projectId,
  diagramId,
  handleSelectProject,
  handleSelectDiagram,
  addProject,
}: Props) {
  const [sideBar, setSideBar] = useState(true)
  const handleChangeSideBar = () => {
    setSideBar((sideBar) => !sideBar)
  }
  return (
    <Container>
      {!sideBar ? (
        <ClosedSideBar>
          <button onClick={handleChangeSideBar}>
            <Icon srcPath='/right-arrow.png' />
          </button>
        </ClosedSideBar>
      ) : (
        <OpenSideBar>
          <section>
            <button onClick={handleChangeSideBar}>
              <Icon srcPath='/right-arrow.png' degree={180} />
            </button>
            <SelectBoards isMyBoard={isMyBoard} handleSelectBoard={handleSelectBoard} />
          </section>
          <hr style={{ width: '90%', border: 'solid 2px', color: 'gray' }} />
          <section>
            <SelectProjects
              projects={projects}
              projectId={projectId}
              addProject={addProject}
              handleSelectProject={handleSelectProject}
            />
          </section>
        </OpenSideBar>
      )}
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  color: black;
  display: flex;
`

const ClosedSideBar = styled.div`
  max-width: 30px;
  width: 100%;
  height: 100%;
  border: 3px solid grey;
  border-radius: 5px;

  background: white;

  background: white;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: start;

  button {
    width: 100%;
    padding: 18px 0;
    color: black;
    background-color: rgba(255, 255, 255, 0.9);
    border: none;

    &:hover {
      button {
        color: rgba(200, 200, 200, 0.8);
      }
    }
  }
`

const OpenSideBar = styled.div`
  min-width: 150px;
  max-width: 300px;
  height: 100%;
  padding: 5px;
  border: 3px solid grey;
  border-radius: 5px;

  background: white;

  display: flex-start;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  section {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: start;

    min-width: 150px;

    background: white;
    border-radius: 0 12px 12px 0;
  }

  button {
    width: 100%;
    padding: 18px;
    color: black;
    text-align: left;
    background-color: white;
    border: none;

    &:hover {
      background-color: rgba(200, 200, 200, 0.8);
      cursor: pointer;
    }
  }
`
