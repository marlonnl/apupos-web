import styled from 'styled-components'
import { color } from '../../styles/colors'

export const ComposeForm = styled.div`
  font-size: 12px;
  margin-bottom: 16px;

  input {
    width: 100%;
    background-color: ${color.bgPrimary};
    color: ${color.text};
    border: none;
    outline: none;
    padding: 8px;
  }
`
