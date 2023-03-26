import styled from 'styled-components'

type Props = {
  name: string
  color: string
  onClick: () => void
}

export default function RectButton({ name, color, onClick }: Props) {
  return (
    <CustomButton onClick={onClick} color={color}>
      {name}
    </CustomButton>
  )
}

const CustomButton = styled.button`
  width: 150px;
  height: 100px;
  background-color: ${(props) => props.color};
  color: white;
  margin: 10px;
  border-radius: 5px;
  border: none;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
