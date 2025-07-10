import styled from 'styled-components'
import { color } from '../../styles/colors'

// https://codepen.io/P1N2O/pen/pyBNzX

export const Content = styled.div`
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
