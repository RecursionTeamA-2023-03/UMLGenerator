import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { readFileSync } from 'fs'

const diagramsDirectory = path.join(process.cwd(), 'public', 'learn', 'diagrams')

export const getIntroductionMdxData = async () => {
  const introductionFilePath = path.join(
    process.cwd(),
    'public',
    'learn',
    'introduction',
    'introduction.mdx',
  )
  const introductionFileContent = readFileSync(introductionFilePath, 'utf8')
  const { data, content } = matter(introductionFileContent)
  const mdxSource = await serialize(content)
  return {
    ...data,
    mdxSource,
  }
}

export const getDiagramDataList = async () => {
  const directories = ['sequence', 'activity', 'state', 'gantt']
  const diagramDataList = await Promise.all(
    directories.map(async (directory) => {
      const fullPath = path.join(diagramsDirectory, directory, `${directory}.mdx`)
      const fileContents = readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        id: directory,
        ...data,
      }
    }),
  )
  return diagramDataList
}

export const getAllDiagramNames = async () => {
  const directoryNames = await fs.promises.readdir(diagramsDirectory)
  const namePromises = directoryNames.map(async (directoryName) => {
    const nameFilePath = path.join(diagramsDirectory, directoryName, `${directoryName}.mdx`)
    const name = path.parse(nameFilePath).name
    return {
      params: {
        name,
      },
    }
  })
  return Promise.all(namePromises)
}

export const getDiagramData = async (id: string) => {
  const fullPath = path.join(diagramsDirectory, id, `${id}.mdx`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const mdxSource = await serialize(content)
  return {
    id,
    mdxSource,
    ...data,
  }
}

export const getProblemDataList = async (name: string) => {
  const problemDirectory = path.join(diagramsDirectory, name, 'problems')
  const fileNames = await fs.promises.readdir(problemDirectory)
  const problemDataList = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(problemDirectory, fileName)
      const fileContents = readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const mdxSource = await serialize(content)
      return {
        id,
        ...data,
        mdxSource,
      }
    }),
  )
  return problemDataList
}
