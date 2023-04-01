import Text from '../../components/common/atoms/text'
import LearnTemplate from '@/components/learnPage/templates/learnTemplate'
import { getAllDiagramsData, getDiagramData, getIntroductionData } from '../../../lib/diagram'

export const getStaticProps = async () => {
  const diagramData = getAllDiagramsData()
  const contentData = await getIntroductionData()
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
        <Text variant='small' marginLeft='1em'>
          <div dangerouslySetInnerHTML={{ __html: contentData.contentHTML }} />
        </Text>
      </div>
    </LearnTemplate>
  )
}
