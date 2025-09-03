import styled from 'styled-components'
import { color } from '../../styles/colors'

export const ConfigForm = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
  padding: 8px 24px;

  h3 {
    margin-bottom: 16px;
  }

  label {
    /* font-weight: bold; */
    margin: 16px 0 8px 0;
  }

  input {
    width: 50%;
    padding: 6px 8px;
    border-radius: 6px;
    border: none;
  }

  button {
    margin: 12px 0;
    width: fit-content;
    padding: 6px 8px;
    color: ${color.text};
    background-color: ${color.likeActive};
    border: none;
    outline: none;
    border-radius: 8px;
  }

  img {
    width: 96px;
    height: 96px;
  }
`

export const ConfigNav = styled.nav`
  padding-left: 16px;

  ul {
    display: flex;
    gap: 8px;
  }

  li {
    display: block;
    padding: 16px;
    cursor: pointer;
  }

  li:hover {
    background-color: ${color.bgItemHover};
    /* filter: brightness(110%); */
  }
`
