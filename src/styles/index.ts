import { createGlobalStyle } from 'styled-components'
import { color } from './colors'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style-type: none;
    // TODO: add Isoevka
  }

  body {
    background-color: ${color.bgPrimary};
    color: ${color.text};
  }

  .container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
`
