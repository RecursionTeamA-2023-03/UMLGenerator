import { useState, Dispatch, SetStateAction } from 'react'
import styled, { keyframes } from 'styled-components'
import { Project, Diagram } from '@prisma/client'
import Icon from '../atoms/icon'
import SelectProjects from '../organisms/selectProjects'
import SelectBoards from '../organisms/selectBoards'

type Props = {
  projects: (Project & { diagrams: Diagram[] })[]
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
      <Content>
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
      </Content>
    </Container>
  )
}

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const Container = styled.div`
  height: 100%;
  color: black;
  display: flex;
`

const Content = styled.div`
  height: 100%;
  display: flex;
`

const ClosedSideBar = styled.div`
  max-width: 30px;
  width: 100%;
  height: 100%;
  border: 3px solid grey;
  border-radius: 5px;

  position: fixed;
  left: 0;
  top: 0;
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
  min-width: 60px;
  max-width: 300px;
  height: 100%;
  padding: 5px;
  border: 3px solid grey;
  border-radius: 5px;

  position: fixed;
  left: 0;
  top: 0;
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

    max-width: 240px;

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
