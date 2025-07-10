import { useParams } from 'react-router-dom'
import PostDetail from '../../components/PostDetail'
import Sidebar from '../../components/Sidebar'
import { Content, Main } from '../../styles'

const Post = () => {
  const { postId } = useParams()

  // TODO: implementar dentro do return principal
  if (!postId) {
    return <></>
  }

  return (
    <div className="container">
      <Main>
        <Sidebar />
        <Content>
          <PostDetail id={postId} />
        </Content>
      </Main>
    </div>
  )
}

export default Post
