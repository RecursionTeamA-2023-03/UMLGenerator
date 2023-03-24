import styled from 'styled-components'

interface ButtonProps {
  fontSize?: string
  fontWeight?: string
  letterSpacing?: string
  lineHeight?: string
  textAlign?: string
  color?: string
  backgroundColor?: string
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  display?: string
  border?: string
  borderRadius?: string
  overflow?: string
  margin?: string
  marginTop?: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  padding?: string
  paddingTop?: string
  paddingLeft?: string
  paddingRight?: string
  paddingBottom?: string
  pseudoClass?: {
    hover?: {
      backgroundColor?: string
    }
    disabled?: {
      backgroundColor?: string
    }
  }
}

const Button = styled.button<ButtonProps>`
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: ${({ fontWeight }) => fontWeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  display: ${({ display }) => display};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  overflow: ${({ overflow }) => overflow};
  margin: ${({ margin }) => margin};
  margin-top: ${({ marginTop }) => marginTop};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  padding: ${({ padding }) => padding};
  padding-top: ${({ paddingTop }) => paddingTop};
  padding-left: ${({ paddingLeft }) => paddingLeft};
  padding-right: ${({ paddingRight }) => paddingRight};
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
  &:hover {
    background-color: ${({ pseudoClass }) => pseudoClass?.hover?.backgroundColor};
    opacity: 0.7;
  }
  &:disabled {
    background-color: ${({ pseudoClass }) => pseudoClass?.disabled?.backgroundColor};
    opacity: 0.5;
  }
`

Button.defaultProps = {
  padding: '1em',
  border: 'none',
  borderRadius: '20%',
}

export default Button
