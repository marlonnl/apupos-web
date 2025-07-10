import { ArrowLeftCircle, Calendar2Check } from 'react-bootstrap-icons'
import { useGetPostDetailQuery } from '../../services/api'
import {
  PostDetailContainer,
  PostDetailContent,
  PostDetailHeader,
  PostStats,
  UserInfo,
  UserInfoHeader
} from './styles'

type Props = {
  id: string
}

const PostDetail = ({ id }: Props) => {
  const { data, isSuccess } = useGetPostDetailQuery(id)

  return (
    <>
      <PostDetailHeader>
        <ArrowLeftCircle />
        <h2>Postagem</h2>
      </PostDetailHeader>
      {isSuccess && (
        <PostDetailContainer>
          <UserInfo>
            <UserInfoHeader>
              <img src="https://cdn.bsky.app/img/avatar/plain/did:plc:fjye6cgixsgbtfa3pfbaeuko/bafkreibjobzsdumpa6b7v747gjvqxkpkjqd3nyailuyof7qgagvr42jby4@jpeg" />
              <div>
                <p>nome do usuário</p>
                <p>@username</p>
              </div>
            </UserInfoHeader>
          </UserInfo>
          <PostDetailContent>
            {data?.content}
            <p>
              <Calendar2Check />
              {data?.created_at}
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
        </PostDetailContainer>
      )}
    </>
  )
}

export default PostDetail
