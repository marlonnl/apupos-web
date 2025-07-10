import styled from 'styled-components'
import { color } from '../../styles/colors'

export const ComposeForm = styled.div`
  font-size: 12px;
  margin: 16px 0;

  form {
    display: flex;
    align-items: end;
  }

  textarea {
    font-size: 14px;
    width: 100%;
    background-color: ${color.bgPrimary};
    color: ${color.text};
    border: 1px solid ${color.separator};
    border-radius: 8px;
    outline: none;
    padding: 8px;
    margin: 0 8px;
    resize: none;

    &:hover {
      opacity: 0.9;
      /* cursor: pointer; */
    }
  }

  button {
    height: min-content;
    margin-right: 8px;
    padding: 0 4px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    padding: 6px;
    border-radius: 8px;
    border: none;
    color: ${color.text};
    background-size: 400% 400%;
    /* width: 32px; */
    margin: 0 auto;
    animation: gradient 15s ease infinite;

    &:disabled {
      background: ${color.separator};
      animation: none;
    }

    &:hover {
      opacity: 0.9;
      /* cursor: pointer; */
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`
