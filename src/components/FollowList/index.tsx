import { Link } from 'react-router-dom'
import { PostContent } from '../Apupo/styles'
import { PostContainer } from '../Feed/styles'

type FollowListProps = {
  list: [] | undefined
  title: string
}

const FollowList = ({ list, title }: FollowListProps) => {
  const a = 1

  return (
    <div>
      <h3 style={{ padding: '16px' }}>{title}</h3>
      {list?.map((person) => {
        return (
          <PostContainer key={person}>
            <Link to={person}>@{person}</Link>
          </PostContainer>
        )
      })}
    </div>
  )
}

export default FollowList
