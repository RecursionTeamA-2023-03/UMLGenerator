import Text from '@/components/learnPage/atoms/text'

export default function Docs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>This is docPage.</Text>
      <Text fontColor='red'>フォントカラー</Text>
      <Text fontSize='2em'>フォントサイズ</Text>
      <Text backgroundColor='blue'>背景色</Text>
      <Text display='block' textAlign='center'>
        配置
      </Text>
      <Text border='2px white solid' width='10%'>
        ボーダー
      </Text>
      <Text display='block' overflow='auto' fontSize='2em'>
        はみ出し部分 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Text>
      <Text backgroundColor='red' margin='30px'>
        magin
      </Text>
      <Text backgroundColor='red' padding='10px'>
        padding
      </Text>
    </div>
  )
}
