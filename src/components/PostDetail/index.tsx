import { ArrowLeftCircle, Calendar2Check } from 'react-bootstrap-icons'
import {
  useActionPostMutation,
  useGetPostDetailQuery,
  useGetPostsQuery
} from '../../services/api'
import {
  DetailPostActions,
  PostDetailContainer,
  PostDetailContent,
  PostDetailHeader,
  PostStats,
  UserInfo,
  UserInfoHeader
} from './styles'
import { useNavigate } from 'react-router-dom'
import { PostActions } from '../Feed/styles'
import ActionButton from '../ActionButton'

type Props = {
  id: string
}

type actionProps = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

const PostDetail = ({ id }: Props) => {
  const { data, isSuccess, refetch } = useGetPostDetailQuery(id)
  const [
    createActionPostMutation,
    { data: actionResponse, isSuccess: actionSuccess }
  ] = useActionPostMutation()

  const navigate = useNavigate()

  const handleBackNavigate = () => {
    navigate('/')
  }

  const handleAction = (e: React.MouseEvent, actionContent: actionProps) => {
    createActionPostMutation({
      id: actionContent.id,
      action: actionContent.action
    })
    refetch()
    e.stopPropagation()
  }

  return (
    <>
      <PostDetailHeader onClick={handleBackNavigate}>
        <ArrowLeftCircle style={{ cursor: 'pointer' }} />
        <h2>Postagem</h2>
      </PostDetailHeader>
      {isSuccess && (
        <>
          <PostDetailContainer>
            <UserInfo>
              <UserInfoHeader>
                <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
                <div>
                  <p>
                    {data.user.first_name
                      ? data.user.first_name
                      : data.user.username}
                  </p>
                  <p style={{ fontSize: '14px' }}>@{data.user.username}</p>
                </div>
              </UserInfoHeader>
            </UserInfo>
            <PostDetailContent>
              {data.content}
              <p>
                <Calendar2Check />
                {data.created_at}
              </p>
            </PostDetailContent>
            <PostStats>
              <p>
                <span>121</span> repostagens
              </p>
              <p>
                <span>11</span> citações
              </p>
              <p>
                <span>{data?.likes}</span> curtidas
              </p>
            </PostStats>
            <PostActions>
              {/*  TODO: include size to icons */}
              <ActionButton action="reply" active={false} />
              <ActionButton
                action="like"
                count={data.likes}
                active={false}
                onClick={(e) =>
                  handleAction(e, { id: data.id, action: 'like' })
                }
              />
              <ActionButton
                action="rt"
                count={0}
                active={false}
                onClick={(e) => handleAction(e, { id: data.id, action: 'rt' })}
              />
            </PostActions>
          </PostDetailContainer>
        </>
      )}
    </>
  )
}

export default PostDetail
