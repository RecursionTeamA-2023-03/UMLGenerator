import useSWR, { Fetcher } from 'swr'
import { CircularProgress } from '@mui/material'

type Props = {
  umlText: string
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
}

const fetcher: Fetcher<string, string> = async (url) => {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const base64Img = Buffer.from(buffer).toString('base64')
  return base64Img
}

export default function UmlPic({
  umlText,
  width,
  height = 'auto',
  maxWidth = '100%',
  maxHeight = '100%',
}: Props) {
  const plantUmlEncoder = require('plantuml-encoder') // eslint-disable-line
  const encodedText = plantUmlEncoder.encode(umlText)
  const url = process.env.NEXT_PUBLIC_AWS_DOMAIN || 'localhost'
  const { data, isLoading, error } = useSWR(
    `https://${url}:443/plantuml/png/${encodedText}`,
    fetcher,
  )

  if (error) {
    // log for debug
    console.log(error)
    return <div>Failed to load</div>
  }

  return isLoading || !data ? (
    <CircularProgress />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      style={{ width: width, height: height, maxWidth: maxWidth, maxHeight: maxHeight }}
      src={`data:image/png;base64, ${data}`}
      alt='your uml diagram'
    />
  )
}
