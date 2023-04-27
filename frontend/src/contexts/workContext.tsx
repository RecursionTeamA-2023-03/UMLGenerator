import { ReactNode, createContext, useContext, useReducer, Dispatch } from 'react'

const WorkContext = createContext<Condition | null>(null)

const WorkDispatchContext = createContext<Dispatch<Action> | null>(null)

type Condition = {
  isMyBoard: boolean
  projectId: number | null
  diagramId: number | null
  templateId: number | null
}

type Action = {
  type: string
  id?: number
  isMyBoard?: boolean
}

export function WorkProvider(children: ReactNode) {
  const [workCondition, dispatch] = useReducer(workReducer, initialCondition)

  return (
    <WorkContext.Provider value={workCondition}>
      <WorkDispatchContext.Provider value={dispatch}>{children}</WorkDispatchContext.Provider>
    </WorkContext.Provider>
  )
}

export function useWork() {
  return useContext(WorkContext)
}

export function useWorkDispatch() {
  return useContext(WorkDispatchContext)
}

function workReducer(workCondition: Condition, action: Action) {
  switch (action.type) {
    case 'board': {
      return {
        ...workCondition,
        isMyBoard: action.isMyBoard ?? false,
      }
    }
    case 'project': {
      return {
        ...workCondition,
        projectId: action.id ?? null,
      }
    }
    case 'diagram': {
      return {
        ...workCondition,
        diagramId: action.id ?? null,
      }
    }
    case 'template': {
      return {
        ...workCondition,
        templateId: action.id ?? null,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

const initialCondition: Condition = {
  isMyBoard: true,
  projectId: null,
  diagramId: null,
  templateId: null,
}
