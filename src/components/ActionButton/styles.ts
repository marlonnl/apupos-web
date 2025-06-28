import styled from 'styled-components'
import { color } from '../../styles/colors'

export const ActionIconContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 8px;
  outline: none;
  background-color: transparent;
  border: none;
  color: ${color.secondaryText};

  &:hover {
    background-color: ${color.bgActionIconHover};
  }
`
