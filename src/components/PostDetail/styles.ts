import styled from 'styled-components'
import { color } from '../../styles/colors'
import { PostActions } from '../Feed/styles'

export const PostDetailHeader = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid ${color.separator};
`

export const PostDetailContainer = styled.div`
  padding: 16px;
`

export const UserInfo = styled.div`
  img {
    width: 48px;
    height: 48px;
    border: 1px solid ${color.separator};
    border-radius: 50%;
  }
`

export const UserInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  p {
    color: ${color.secondaryText};
  }

  p:first-of-type {
    color: ${color.text};
    font-weight: bold;
    margin-bottom: 4px;
  }
`

export const PostDetailContent = styled.div`
  font-size: 20px;
  line-height: 24px;
  word-wrap: break-word;
  /* flex-wrap: wrap; */

  p {
    margin-top: 16px;
    font-size: 12px;
    color: ${color.secondaryText};
  }
`

export const PostStats = styled.div`
  margin-top: 8px;
  padding: 12px 4px;
  border-top: 1px solid ${color.separator};
  border-bottom: 1px solid ${color.separator};
  color: ${color.secondaryText};
  font-size: 14px;

  display: flex;
  gap: 16px;

  span {
    font-family: 'Source Code Pro', monospace;
    font-weight: bold;
    color: ${color.text};
  }
`

export const DetailPostActions = styled(PostActions)`
  font-size: 88px;
  /* background-color: red; */
`
