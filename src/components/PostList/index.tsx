import { ArrowRepeat, Chat, Heart } from 'react-bootstrap-icons'
import {
  ActionIconContainer,
  PostActions,
  PostContainer,
  PostContent,
  PostListContainer
} from './styles'

const PostList = () => {
  const posts = [
    {
      content: 'Sejam bem vindos ao microblogging APUPOS.',
      user: 'joao',
      name: 'Joao Joao'
    },
    { content: 'segunda postagem', user: 'mariam', name: 'Maria Maria' }
  ]

  return (
    <PostListContainer>
      {posts.map((post, index) => {
        return (
          <>
            <PostContainer key={index}>
              <div>
                <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
              </div>
              <PostContent>
                <div>
                  <p className="name">{post.name}</p>
                  <p className="user">@{post.user}</p>
                  <p className="time">5m</p>
                </div>
                <p className="content">{post.content}</p>
                <PostActions>
                  <ActionIconContainer>
                    <Chat />3
                  </ActionIconContainer>
                  <ActionIconContainer>
                    <Heart />
                    12
                  </ActionIconContainer>
                  <ActionIconContainer>
                    <ArrowRepeat />6
                  </ActionIconContainer>
                </PostActions>
              </PostContent>
            </PostContainer>
          </>
        )
      })}
    </PostListContainer>
  )
}

export default PostList
