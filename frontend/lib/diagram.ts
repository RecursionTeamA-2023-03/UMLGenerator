import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const diagramDirectory = path.join(process.cwd(), 'public', 'learn', 'diagrams')

export function getDiagramsData() {
  const directories = ['sequence', 'usecase']
  const allDiagramsData = directories.map((directory) => {
    const fullPath = path.join(diagramDirectory, directory, `${directory}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    return {
      id: directory,
      ...matterResult.data,
    }
  })
  return allDiagramsData
}

export const getAllDiagramIds = () => {
  const fileNames = fs.readdirSync(diagramDirectory)
  return fileNames.map((diagram) => {
    return {
      params: {
        name: diagram.replace(/\.md$/, ''),
      },
    }
  })
}

export const getDiagramData = async (id) => {
  const fullPath = path.join(diagramDirectory, `${id}/${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const diagramContent = await remark().use(html).process(matterResult.content)
  const diagramContentHTML = diagramContent.toString()
  return {
    id,
    diagramContentHTML,
    ...matterResult.data,
  }
}

export function getProblemIds(id) {
  const currPath = path.join(diagramDirectory, `${id}/problems`)
  const fileNames = fs.readdirSync(currPath, 'utf8')
  const problemsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(currPath, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      content: matterResult.content,
      ...matterResult.data,
    }
  })

  return problemsData
}
