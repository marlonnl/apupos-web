import Feed from '../../components/Feed'
import Logo from '../../components/Logo'
import Sidebar from '../../components/Sidebar'
import { Content, Main } from '../../styles'

const Home = () => {
  return (
    <div className="container">
      <Main>
        <Sidebar />
        <Content>
          <Logo />
          <Feed />
        </Content>
      </Main>
    </div>
  )
}

export default Home
