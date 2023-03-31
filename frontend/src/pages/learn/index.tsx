import Text from '../../components/common/atoms/text'
import LearnTemplate from '@/components/learnPage/templates/learnTemplate'
import { getDiagramsData } from '../../../lib/diagram'

export const getStaticProps = async () => {
  const data = getDiagramsData()
  return {
    props: {
      data,
    },
  }
}

export default function Learn({ data }: any) {
  console.log(data)
  return (
    <LearnTemplate sidebarData={data} data={data}>
      <div>
        <Text variant='large' marginLeft='1em'>
          イントロダクション
        </Text>
      </div>
    </LearnTemplate>
  )
}
