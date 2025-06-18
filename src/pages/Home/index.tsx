import Compose from '../../components/Compose'
import Sidebar from '../../components/Sidebar'
import { Content, Main } from './styles'

const Home = () => {
  return (
    <div className="container">
      <Main>
        <Sidebar />
        <Content>
          <div id="animation">
            <p>📢</p>
          </div>
          <Compose />
        </Content>
      </Main>
    </div>
  )
}

export default Home
