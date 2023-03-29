import { theme } from '../../../themes'
import styled, { css } from 'styled-components'

interface TextProps {
  variant?: 'small' | 'medium' | 'large'
  fontSize?: string
  fontColor?: string
  backgroundColor?: string
  fontWeight?: string
  letterSpacing?: string
  lineHeight?: string
  textAlign?: string
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  border?: string
  display?: string
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
}

const Text = styled.span<TextProps>`
  ${({ variant }) => {
    switch (variant) {
      case 'small':
        return css`
          font-size: ${theme.fontSizes[0]};
          letter-spacing: ${theme.letterSpacings[0]};
          line-height: ${theme.lineHeights[0]};
        `
      case 'medium':
        return css`
          font-size: ${theme.fontSizes[1]};
          letter-spacing: ${theme.letterSpacings[1]};
          line-height: ${theme.lineHeights[1]};
        `
      case 'large':
        return css`
          font-size: ${theme.fontSizes[2]};
          letter-spacing: ${theme.letterSpacings[2]};
          line-height: ${theme.lineHeights[2]};
        `
    }
  }}
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ fontColor }) => fontColor};
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
`

Text.defaultProps = {
  variant: 'medium',
}

export default Text
