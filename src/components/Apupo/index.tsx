import { Container, PostContent, PostInfo, PostText, Retweet } from './styles'
import { useActionPostMutation } from '../../services/api'
import { formatDate } from '../../utils'

type actionProps = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

const Apupo = ({
  id,
  content,
  parent,
  created_at
}: Omit<PostsAPI, 'likes'>) => {
  const [createActionPostMutation, { data: actionResponse, isSuccess }] =
    useActionPostMutation()

  const handleAction = (actionContent: actionProps) => {
    // all actions goes the same API, no if needed
    // if (actionContent.action === 'like') {
    createActionPostMutation({
      id: actionContent.id,
      action: actionContent.action
    })
    // console.log(actionResponse?.likes)
    // }
  }

  return (
    <>
      <Container>
        <div>
          <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
        </div>
        <PostContent>
          <PostInfo>
            <p className="name">post.name {id}</p>
            <p className="user">@post.user</p>
            <p className="time">{formatDate(created_at)}</p>
          </PostInfo>
          <div>
            <PostText>{content}</PostText>
            {parent && <Retweet>{parent.content}</Retweet>}
          </div>
        </PostContent>
      </Container>
    </>
  )
}

export default Apupo
