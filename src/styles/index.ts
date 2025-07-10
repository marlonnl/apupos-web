import styled, { createGlobalStyle } from 'styled-components'
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

  a {
    text-decoration: none;
    color: ${color.text};
  }

  .container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
`

export const Main = styled.div`
  display: flex;
`

export const Content = styled.div`
  margin-top: 8px;
  width: 100%;
  max-width: 560px;
  border-left: 1px solid ${color.separator};

  #animation {
    margin-bottom: 8px;
  }

  #animation {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    padding: 6px;
    border-radius: 50%;
    background-size: 400% 400%;
    width: 32px;
    margin: 0 auto;
    animation: gradient 15s ease infinite;
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
