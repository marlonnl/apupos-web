import styled from 'styled-components'
import { color } from '../../styles/colors'

export const PostContainer = styled.div`
  border-top: 1px solid ${color.separator};
  padding: 12px 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  &:hover {
    background-color: ${color.bgPostItemHover};
  }
`

export const PostActions = styled.div`
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  color: ${color.secondaryText};
`
