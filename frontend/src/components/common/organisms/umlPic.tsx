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
  const plantUmlEncoder = require('plantuml-encoder') // eslint-disable-line
  const encodedText = plantUmlEncoder.encode(umlText)
  const url = process.env.AWS_IP_ADDRESS || 'localhost:80'
  const { data, error } = useSWR(`http://${url}/plantuml/png/${encodedText}`, fetcher)

  if (error) {
    // log for debug
    console.log(error)
    return <div>Failed to load</div>
  }

  return !data ? (
    <div>Loading...</div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      style={{ width: '60%', height: 'auto' }}
      src={`data:image/png;base64, ${data}`}
      alt='your uml diagram'
    />
  )
}
