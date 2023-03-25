import BreadcrumbItem from '@/components/learnPage/atoms/breadcrumbItem'
import Button from '@/components/learnPage/atoms/button'
import Text from '@/components/learnPage/atoms/text'
import Link from 'next/link'
import { theme } from '../themes'

export default function Docs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text variant='large' marginLeft='1em'>
        イントロダクション
      </Text>
      <Text variant='small' marginLeft='1em'>
        これは練習問題を通してPlantUMLの記述を学んでいくコンテンツです。
        <br />
        以下なんかイントロダクション的な説明文
        <br />
        学習に躓いた時や、よく使用する構文を知りたい場合はドキュメンテーションページをご確認下さい。
        <br />
        また、記述方法のより詳細な情報はPlantUMLを確認下さい。
      </Text>
      <Button>Sing up</Button>
      <Button variant='secondary'>保存</Button>
      <Button variant='danger'>削除</Button>
      <Button variant='gray'>ダウンロード</Button>

      {/* 以下の<div></div>はmoleculesでbreadcurmbとして実装予定 */}
      <div>
        <BreadcrumbItem>
          <Link href={'/docs'}>イントロダクション</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={'/docs/sequence'}>シーケンス図</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>問題1</BreadcrumbItem>
      </div>
    </div>
  )
}
