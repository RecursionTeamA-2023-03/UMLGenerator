import styled from 'styled-components'
import SvgIcon from '@mui/material/SvgIcon'
import {
  Home,
  Close,
  Undo,
  CheckBoxOutlineBlank,
  CheckBox,
  Person,
  GitHub,
  PlayArrow,
  History,
  Schema,
  Dvr,
  Settings,
  AddCircle,
  BorderColor,
  ArrowBack,
  ArrowForward,
  KeyboardArrowDown,
  KeyboardArrowRight,
  ContentCopy,
} from '@mui/icons-material'

interface IconProps {
  fontSize?: string
  color?: string
  width?: string
  height?: string
  backgroundColor?: string
  display?: string
}

const IconComponent = styled.div<IconProps>`
font-size: ${({ fontSize }) => fontSize}
color: ${({ color }) => color}
width: ${({ width }) => width}
height: ${({ height }) => height}
background-color: ${({ backgroundColor }) => backgroundColor}
display: inline-block
svg {
    display: block;
}
`

interface IconWrapperProps {
  fontSize?: string
  width?: string
  height?: string
  color?: string
  backgroundColor?: string
}

const IconWapper = styled.div<IconWrapperProps>`
  display: inline-block;
  font-size: ${({ fontSize }) => fontSize};
  width: ${({ width }) => width};
  heigth: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  svg {
    display: block;
  }
`
export interface IconButtonProps {
  color?: string
  backgroundColor?: string
  fontSize?: string
  onClick?: React.MouseEventHandler<SVGSVGElement>
}

function withIconStyle(Icon: typeof SvgIcon): React.ComponentType<IconButtonProps> {
  const IconWithStyle = (props: IconButtonProps) => {
    const { onClick, ...rest } = props
    return (
      <IconWapper {...rest}>
        <Icon onClick={onClick} />
      </IconWapper>
    )
  }
  return IconWithStyle
}

export default withIconStyle
export const CloseIcon = withIconStyle(Close)

export const HomeIcon = withIconStyle(Home)

export const BackIcon = withIconStyle(Undo)

export const CheckBoxOutlineBlankIcon = withIconStyle(CheckBoxOutlineBlank)

export const CheckBoxIcon = withIconStyle(CheckBox)

export const PersonIcon = withIconStyle(Person)

export const GitHubIcon = withIconStyle(GitHub)

export const PlayIcon = withIconStyle(PlayArrow)

export const HistoryIcon = withIconStyle(History)

export const TemplateIcon = withIconStyle(Schema)

export const BoardIcon = withIconStyle(Dvr)

export const SettingIcon = withIconStyle(Settings)

export const AddIcon = withIconStyle(AddCircle)

export const EditIcon = withIconStyle(BorderColor)

export const ArrowBackIcon = withIconStyle(ArrowBack)

export const ArrowForwardIcon = withIconStyle(ArrowForward)

export const ArrowDownIcon = withIconStyle(KeyboardArrowDown)

export const ArrowRightIcon = withIconStyle(KeyboardArrowRight)

export const ContentCopyIcon = withIconStyle(ContentCopy)
