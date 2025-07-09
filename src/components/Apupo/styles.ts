import styled from 'styled-components'
import { color } from '../../styles/colors'

export const Container = styled.div`
  display: flex;
`

export const PostContent = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-left: 16px;

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

  & .time {
    justify-self: flex-end;
  }

  & .content {
    margin-top: 6px;
  }
`

export const PostInfo = styled.div`
  display: flex;
  margin-bottom: 8px;
`

export const Retweet = styled.div`
  border: 1px solid ${color.separator};
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
`
