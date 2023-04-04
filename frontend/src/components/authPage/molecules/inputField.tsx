import styled from 'styled-components'

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

interface InputFieldProps {
  label: string
  type: string
  id: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ label, type, id, placeholder, onChange }: InputFieldProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <StyledInput type={type} id={id} placeholder={placeholder} onChange={onChange} />
    </>
  )
}

export default InputField
