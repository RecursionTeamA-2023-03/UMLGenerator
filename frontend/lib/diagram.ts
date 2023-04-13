import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const diagramDirectory = path.join(process.cwd(), 'public', 'learn', 'diagrams')

export const getIntroductionData = async () => {
  const fullPath = path.join(process.cwd(), 'public', 'learn', 'introduction', 'introduction.md')
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContent)
  const content = await remark().use(html).process(matterResult.content)
  const contentHTML = content.toString()
  return {
    contentHTML,
    ...matterResult.data,
  }
}

export const getAllDiagramsData = () => {
  const directories = ['sequence', 'usecase', 'activity', 'state', 'gantt']
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

export const getDiagramData = async (id: string) => {
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

export const getProblemIds = (id: string) => {
  const currPath = path.join(diagramDirectory, `${id}/problems`)
  const fileNames = fs.readdirSync(currPath, 'utf8')
  const problemsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(currPath, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const problemContent = matterResult.content
    const problemHTML = remark().use(html).processSync(problemContent).toString()

    return {
      id,
      content: problemContent,
      htmlContent: problemHTML,
      ...matterResult.data,
    }
  })

  return problemsData
}
