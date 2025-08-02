import styled from 'styled-components'
import { color } from '../../styles/colors'

export const UserContainer = styled.div`
  width: 100%;
  max-width: 560px;
  border-left: 1px solid ${color.separator};
  padding-left: 16px;
`

export const UserHeader = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`

export const UserHeaderNavContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 1px solid ${color.separator};
  }
`

export const UserHeaderNavbar = styled.div`
  display: flex;
  gap: 8px;

  button {
    border: none;
    background-color: ${color.bgActionIconHover};
    color: ${color.secondaryText};
    font-weight: bold;
    padding: 8px 10px;
    border-radius: 16px;

    &:hover {
      background-color: ${color.bgNavButtonHover};
      cursor: pointer;
    }
  }
`

export const UserInfo = styled.div`
  margin-top: 8px;

  h3 {
    font-size: 14px;
    font-weight: normal;
    color: ${color.secondaryText};
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;

    .doesfollow {
      font-size: 12px;
      background-color: ${color.bgActionIconHover};
      padding: 2px 4px;
      border-radius: 4px;
    }
  }
`

export const UserInfoItem = styled.div`
  font-size: 14px;
  margin-top: 4px;

  a {
    color: ${color.secondaryText};

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${color.secondaryText};
    font-size: 15px;
    /* margin-right: 6px; */

    &.number {
      font-weight: bold;
      color: ${color.text};
    }
  }
`

export const UserBio = styled.p`
  margin-top: 12px;
  font-size: 14px;
`
