import styled from 'styled-components'
import { color } from '../../styles/colors'

export const ApupoSide = styled.aside`
  background-color: ${color.separator};
  border-radius: 16px;
  padding: 16px 32px;
  width: 50%;
  /* border-left: 1px solid ${color.separator}; */

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    display: flex;
    font-family: 'Source Code Pro', monospace;
  }

  #animation {
    margin: 0 16px 0 0;
  }
`

export const SideHeader = styled.div`
  display: flex;
  flex-direction: column;
`

export const Dicionario = styled.div`
  margin-top: 16px;
  border: 1px solid ${color.bgLight};
  border-radius: 12px;
  padding: 16px;

  justify-self: initial;

  h2 {
    font-size: 18px;
  }

  span {
    font-size: 12px;
    color: ${color.secondaryText};
  }

  p {
    margin-top: 12px;
    font-size: 14px;
  }
`

export const SideFooter = styled.div`
  font-size: 13px;
  align-self: flex-end;

  a {
    padding: 4px 6px;
    border-radius: 4px;
  }

  a:hover {
    background-color: ${color.bgItemHover};
  }
`
