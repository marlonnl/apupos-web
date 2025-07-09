import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles'
import { Provider } from 'react-redux'
import { store } from './store'

import Rotas from './routes'

type Props = {
  username?: string
}

function App(username: Props) {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <Rotas />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
