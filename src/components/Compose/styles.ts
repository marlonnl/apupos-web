import styled from 'styled-components'
import { color } from '../../styles/colors'

export const ComposeForm = styled.form`
  font-size: 12px;

  input {
    width: 100%;
    background-color: ${color.bgPrimary};
    color: ${color.text};
    border: none;
    outline: none;
  }
`
