import styled from 'styled-components'
import { color } from '../../styles/colors'

export const SidebarSection = styled.aside`
  margin-top: 24px;
  max-width: 240px;
  width: 100%;
  padding-right: 12px;

  hr {
    color: ${color.separator};
    margin: 16px 0;
  }
`

export const UserBar = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  div {
    margin-left: 8px;

    h3 {
      font-size: 14px;
      font-weight: 600;
    }

    p {
      font-size: 11px;
      color: ${color.secondaryText};
    }
  }
`

export const LinkList = styled.ul`
  font-size: 18px;
`

export const LinkItem = styled.li`
  a,
  button {
    padding: 16px;
    display: flex;
    align-items: end;
    border-radius: 8px;

    p {
      margin-left: 8px;
    }
  }

  button {
    font-size: 18px;
    width: 100%;
    border: 0;
    outline: none;
    color: ${color.text};
    background-color: transparent;
    cursor: pointer;

    display: flex;
    gap: 8px;
  }

  a:hover,
  button:hover {
    background-color: ${color.bgItemHover};
  }
`
