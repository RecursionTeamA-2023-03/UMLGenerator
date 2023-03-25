type Props = {
  umlText: string
  setUmlText: React.Dispatch<React.SetStateAction<string>>
}

export default function UmlEditor({ umlText, setUmlText }: Props) {
  return (
    <textarea
      value={umlText}
      onChange={(e) => setUmlText(e.target.value)}
      style={{ height: '50vh' }}
    />
  )
}
