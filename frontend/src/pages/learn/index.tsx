import LearnTemplate from '@/components/learnPage/templates/learnTemplate'
import { getDiagramDataList, getIntroductionMdxData } from '../../../lib/diagram'
import { MDXRemote } from 'next-mdx-remote'

export const getStaticProps = async () => {
  const diagramData = await getDiagramDataList()
  const contentData = await getIntroductionMdxData()
  return {
    props: {
      diagramData,
      contentData,
    },
  }
}

export default function Learn({ diagramData, contentData }: any) {
  return (
    <LearnTemplate sidebarData={diagramData} data={contentData}>
      <div>
        <MDXRemote {...contentData.mdxSource}></MDXRemote>
      </div>
    </LearnTemplate>
  )
}
