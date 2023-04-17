import styled from 'styled-components'
import {theme} from '@/themes'

const BreadcrumbItem = styled.li`
  list-style: none;
  display: inline;
  &:not(:first-child) {
    &::before {
      content: '/';
      color: ${theme.colors.gray};
      padding: 0px 8px;
    }
  }
  a {
    color: ${theme.colors.gray};
    &:hover {
      text-decoration: underline;
    }
  }
`

export default BreadcrumbItem
