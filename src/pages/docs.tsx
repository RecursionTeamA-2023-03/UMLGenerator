import {
  AddIcon,
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
  BackIcon,
  BoardIcon,
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
  CloseIcon,
  ContentCopyIcon,
  EditIcon,
  GitHubIcon,
  HistoryIcon,
  HomeIcon,
  PersonIcon,
  PlayIcon,
  SettingIcon,
  TemplateIcon,
} from '@/components/learnPage/atoms/icon'
import Text from '@/components/learnPage/atoms/text'

export default function Docs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>This is docPage.</Text>
      <HomeIcon />
      <CloseIcon />
      <BackIcon />
      <CheckBoxIcon />
      <CheckBoxOutlineBlankIcon />
      <PersonIcon />
      <GitHubIcon />
      <PlayIcon />
      <HistoryIcon />
      <TemplateIcon />
      <BoardIcon />
      <SettingIcon />
      <AddIcon />
      <EditIcon />
      <ArrowBackIcon />
      <ArrowForwardIcon />
      <ArrowDownIcon />
      <ArrowRightIcon />
      <ContentCopyIcon />
    </div>
  )
}
