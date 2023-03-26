import styled from 'styled-components'

const Separator = styled.div`
  height: 0.3em;
  display: flex;
  align-items: center;
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid white;
  }
`

export default Separator
