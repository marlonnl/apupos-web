import { Container, PostContent, PostInfo, PostText, Retweet } from './styles'
import { useActionPostMutation } from '../../services/api'
import { formatDate } from '../../utils'
import { Link, useNavigate } from 'react-router-dom'

type actionProps = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

const Apupo = ({
  id,
  user,
  content,
  parent,
  created_at
}: Omit<PostsAPI, 'likes'>) => {
  const [createActionPostMutation, { data: actionResponse, isSuccess }] =
    useActionPostMutation()
  const navigate = useNavigate()

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

  const handleNavigate = (detailId: number, e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      const linkTo = `/post/${detailId}/`
      navigate(linkTo)
    }
  }

  return (
    <>
      <Container>
        <div>
          <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
        </div>
        <PostContent>
          <PostInfo>
            <Link to={`/user/${user.username}/`}>
              <p className="name">
                {user.first_name ? user.first_name : user.username}
              </p>
            </Link>

            <p className="user">@{user.username}</p>
            <p className="time">{formatDate(created_at)}</p>
          </PostInfo>
          <div onClick={(e) => handleNavigate(id, e)}>
            <PostText>{content}</PostText>
            {parent && <Retweet>{parent.content}</Retweet>}
          </div>
        </PostContent>
      </Container>
    </>
  )
}

export default Apupo
