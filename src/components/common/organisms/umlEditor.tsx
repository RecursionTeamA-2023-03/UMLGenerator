type Props = {
  setUmlText: React.Dispatch<React.SetStateAction<string>>
}

export default function UmlEditor({ setUmlText }: Props) {
  return <textarea onChange={(e) => setUmlText(e.target.value)} />
}
