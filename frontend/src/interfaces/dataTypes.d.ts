export interface User {
  id: number;
  createdAt: Date;
  name: string;
  email: string;
}

export interface Project {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Diagram {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  content: string
}
