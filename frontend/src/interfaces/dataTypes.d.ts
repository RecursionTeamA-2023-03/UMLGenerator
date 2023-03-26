export interface User {
  id: number
  name: string
  projects: Project[]
}

export interface Project {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  diagrams: Diagram[]
}

export interface Diagram {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  content: string
}
