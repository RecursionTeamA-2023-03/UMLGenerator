import useSWR, { Fetcher } from 'swr'

type Props = {
  umlText: string
}

const fetcher: Fetcher<string, string> = async (url) => {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const base64Img = Buffer.from(buffer).toString('base64')
  return base64Img
}

export default function UmlPic({ umlText }: Props) {
  const plantUmlEncoder = require('plantuml-encoder')
  const encodedText = plantUmlEncoder.encode(umlText)
  const { data, error } = useSWR(`/api/uml/png/${encodedText}`, fetcher)

  if (error) {
    // log for debug
    console.log(error)
    return <div>Failed to load</div>
  }

  return !data ? (
    <div>Loading...</div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img style={{ width: '50%' }} src={`data:image/png;base64, ${data}`} alt='your uml diagram' />
  )
}
