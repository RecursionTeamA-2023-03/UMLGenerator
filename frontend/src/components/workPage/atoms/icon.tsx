import Image from 'next/image'

type Props = {
  srcPath: string
  title?: string
  degree?: number
}

export default function Icon({ srcPath, title = 'icon', degree = 0 }: Props) {
  return (
    <Image
      src={srcPath}
      alt={title}
      width={20}
      height={20}
      style={{ transform: `rotate(${degree}deg)` }}
    />
  )
}
