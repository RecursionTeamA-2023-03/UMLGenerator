import Button from '@/components/learnPage/atoms/button'
import Text from '@/components/learnPage/atoms/text'

export default function Docs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>This is docPage.</Text>
      <div>
        <Button backgroundColor='blue' pseudoClass={{ hover: { backgroundColor: 'yellow' } }}>
          Button
        </Button>
        <Button disabled color='white' backgroundColor='blue'>
          Disabled Button
        </Button>
      </div>
    </div>
  )
}
