import styled from 'styled-components'
import { color } from '../../styles/colors'

export const PostContainer = styled.div`
  border-top: 1px solid ${color.separator};
  padding: 12px 16px;

  display: flex;
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

export const PostContent = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;

  width: 100%;

  p {
    display: inline;
  }

  & .name {
    font-weight: bold;
  }

  & .user,
  & .time {
    margin-left: 12px;
    color: ${color.secondaryText};
  }

  & .content {
    margin-top: 6px;
  }
`

export const PostActions = styled.div`
  margin-top: 18px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  color: ${color.secondaryText};
`

export const ActionIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 8px;

  &:hover {
    background-color: ${color.bgActionIconHover};
  }
`
