import { Container, PostContent, PostInfo, PostText, Retweet } from './styles'
import { useActionPostMutation } from '../../services/api'
import { formatDate } from '../../utils'
import { Link, useNavigate } from 'react-router-dom'
import {
  Calendar,
  Calendar2DateFill,
  CalendarFill
} from 'react-bootstrap-icons'
import Avatar from '../Avatar'

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
          <Avatar url={user.image} page="post" />
        </div>
        <PostContent>
          <PostInfo>
            <div>
              <Link to={`/user/${user.username}/`}>
                <p className="name">
                  {user.first_name ? user.first_name : user.username}
                </p>
              </Link>
              <p className="user">@{user.username}</p>
            </div>

            <p className="time" title={created_at}>
              {created_at}
            </p>
          </PostInfo>
          <div onClick={(e) => handleNavigate(id, e)}>
            <PostText>{content}</PostText>
            {parent && (
              <Retweet>
                <span>
                  repupado from{' '}
                  <Link to={`/user/${parent.user.username}`}>
                    @{parent.user.username}
                  </Link>
                </span>
                <p>{parent.content}</p>
              </Retweet>
            )}
          </div>
        </PostContent>
      </Container>
    </>
  )
}

export default Apupo
