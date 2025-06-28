import { PostActions, PostContainer, PostContent } from './styles'
import ActionButton from '../ActionButton'

const Apupo = ({ id, content, likes }: PostsAPI) => {
  return (
    <>
      <PostContainer>
        <div>
          <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
        </div>
        <PostContent>
          <div>
            <p className="name">post.name {id}</p>
            <p className="user">@post.user</p>
            <p className="time">5m</p>
          </div>
          <p className="content">{content}</p>
          <PostActions>
            <ActionButton action="reply" active={false} />
            <ActionButton action="like" count={likes} active={false} />
            <ActionButton action="rt" count={2} active={false} />
          </PostActions>
        </PostContent>
      </PostContainer>
    </>
  )
}

export default Apupo
