import Icon from '../atoms/icon'

type Props = {
  isMyBoard: boolean
  handleSelectBoard: (b: boolean) => void
}

export default function SelectBoards({ isMyBoard, handleSelectBoard }: Props) {
  return (
    <>
      <button
        onClick={() => handleSelectBoard(true)}
        style={{ backgroundColor: `${isMyBoard ? 'rgba(200, 200, 200, .8)' : 'white'}` }}
      >
        <Icon srcPath='/board-icon.png' /> マイボード
      </button>
      <button
        onClick={() => handleSelectBoard(false)}
        style={{ backgroundColor: `${!isMyBoard ? 'rgba(200, 200, 200, .8)' : 'white'}` }}
      >
        <Icon srcPath='/diagram-template.png' /> テンプレート
      </button>
    </>
  )
}
