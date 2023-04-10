import { User, Project, Diagram } from '@/interfaces/dataTypes'

export function isDiagram(diagram: unknown): diagram is Diagram {
  return (
    typeof diagram === 'object' &&
    diagram !== null &&
    'id' in diagram &&
    'name' in diagram &&
    'createdAt' in diagram &&
    'updatedAt' in diagram &&
    'content' in diagram &&
    typeof diagram.id === 'number' &&
    typeof diagram.name === 'string' &&
    diagram.createdAt instanceof Date &&
    diagram.updatedAt instanceof Date &&
    typeof diagram.content === 'string'
  )
}

export function isProject(project: unknown): project is Project {
  return (
    typeof project === 'object' &&
    project !== null &&
    'id' in project &&
    'name' in project &&
    'createdAt' in project &&
    'updatedAt' in project &&
    typeof project.id === 'number' &&
    typeof project.name === 'string' &&
    project.createdAt instanceof Date &&
    project.updatedAt instanceof Date
  )
}

export function isUser(user: unknown): user is User {
  return (
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'name' in user &&
    typeof user.id === 'number' &&
    typeof user.name === 'string'
  )
}
