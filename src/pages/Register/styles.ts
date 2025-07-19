import styled from 'styled-components'
import { color } from '../../styles/colors'

export const Panels = styled.div`
  display: flex;
`

export const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin: 16px 0 32px 0;
  border-bottom: 1px solid ${color.separator};
  padding: 16px;
`

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 60%;
  padding: 16px 32px 0 0;
  /* background-color: pink; */

  button {
    font-size: 16px;
    font-weight: bold;
    outline: none;

    &#animation {
      margin-top: 18px;
      padding: 12px 8px;
      width: 100%;
      border-radius: 8px;
      border: none;
      color: ${color.text};

      &:disabled {
        background: ${color.separator};
        animation: none;
      }
    }

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
`

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input {
    padding: 12px 8px;
    border-radius: 8px;
    border: none;
  }
`
