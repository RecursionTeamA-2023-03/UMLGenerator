import CurrentDiagrams from '../organisms/currentDiagrams'
import DiagramsInProject from '../organisms/diagramsInProject'
import useProjectData from '@/hooks/useProjectData'

type Props = {
  handleSelectDiagram: (dId: number, pId?: number) => void
}

export default function MyBoard({ handleSelectDiagram }: Props) {
  const { data } = useProjectData()
  return (
    <>
      <CurrentDiagrams handleSelectDiagram={handleSelectDiagram} />
      {data?.map((p) => {
        return (
          <DiagramsInProject
            key={p.id}
            projectId={p.id}
            handleSelectDiagram={handleSelectDiagram}
          />
        )
      })}
    </>
  )
}
