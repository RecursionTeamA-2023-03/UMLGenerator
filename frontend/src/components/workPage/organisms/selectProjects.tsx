import { Project, Diagram } from '@/interfaces/dataTypes'
import Icon from '../atoms/icon'

type Props = {
  projects: (Project & { diagrams: Diagram[] })[]
  projectId: number | null
  addProject: () => void
  handleSelectProject: (id: number) => void
}

export default function SelectProjects({
  projects,
  projectId,
  addProject,
  handleSelectProject,
}: Props) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        Projects
        <button onClick={addProject}>
          <Icon srcPath='/plus.png' />
        </button>
      </div>

      {projects.map((p) => {
        return (
          <div key={p.id}>
            <button
              onClick={() => handleSelectProject(p.id)}
              style={{
                backgroundColor: `${p.id === projectId ? 'rgba(200, 200, 200, .8)' : 'white'}`,
              }}
            >
              {p.name}
            </button>
          </div>
        )
      })}
    </>
  )
}
