import styled from 'styled-components'
import { color } from '../../styles/colors'

export const Container = styled.div`
  display: flex;
`

export const PostContent = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 16px;
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

  & .time {
    font-size: 13px;
  }
`

export const PostText = styled.div`
  max-width: 100%;
  width: 100%;
  overflow-wrap: break-word;
  /* margin-top: 6px; */
  line-height: 20px;
`

export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  margin-bottom: 8px;
  text-overflow: hidden;

  .time {
    justify-self: flex-end;
  }
`

export const Retweet = styled.div`
  border: 1px solid ${color.separator};
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;

  span {
    color: ${color.secondaryText};
    font-size: 13px;
    display: block;
    margin-bottom: 12px;
  }
`
