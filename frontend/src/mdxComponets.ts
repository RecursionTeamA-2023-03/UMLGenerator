import Link from 'next/link'
import MonacoEditor from './components/common/atoms/editor'
import EditorPreview from './components/common/molecules/editorPreview'
import CheatSheetsEditorPreview from './components/cheetSheetsPage/molecules/editorPreview'
import UmlPic from './components/common/organisms/umlPic'
import IconButton from './components/learnPage/molecules/IconButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CustomBox from './components/common/atoms/box'

export const mdxComponents = {
  MonacoEditor,
  EditorPreview,
  CheatSheetsEditorPreview,
  Link,
  UmlPic,
  CustomBox,
  IconButton,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
}
