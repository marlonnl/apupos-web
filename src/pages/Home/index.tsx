import Compose from '../../components/Compose'
import PostList from '../../components/PostList'
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
          <PostList />
        </Content>
      </Main>
    </div>
  )
}

export default Home
