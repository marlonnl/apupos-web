import { useEffect, useState } from 'react'
import Compose from '../Compose'
import { useActionPostMutation, useGetPostsQuery } from '../../services/api'
import Apupo from '../Apupo'
import { PostActions, PostContainer } from './styles'
import ActionButton from '../ActionButton'
import { useNavigate } from 'react-router-dom'

type actionProps = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

const Feed = () => {
  const [
    createActionPostMutation,
    { data: actionResponse, isSuccess: actionSuccess }
  ] = useActionPostMutation()

  const [postsFeed, setPostsFeed] = useState<PostsAPI[]>()
  const { data, isLoading, isSuccess, refetch } = useGetPostsQuery()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      setPostsFeed(data)
      // refetch()
    }
  }, [data, isSuccess, refetch, postsFeed, actionResponse])

  const handleAction = (actionContent: actionProps) => {
    createActionPostMutation({
      id: actionContent.id,
      action: actionContent.action
    })
    refetch()
  }

  if (isLoading) {
    return <p>Carregando posts...</p>
  }

  const handleNavigate = (detailId: number) => {
    const linkTo = `/post/${detailId}`
    navigate(linkTo)
  }

  return (
    <>
      <Compose />
      {isSuccess && (
        <div>
          {postsFeed?.map((post) => {
            return (
              <>
                <PostContainer onClick={() => handleNavigate(post.id)}>
                  <Apupo
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    is_retweet={post.is_retweet}
                    parent={post.parent}
                    created_at={post.created_at}
                  />
                  <PostActions>
                    <ActionButton action="reply" active={false} />
                    <ActionButton
                      action="like"
                      count={post.likes}
                      active={false}
                      onClick={() =>
                        handleAction({ id: post.id, action: 'like' })
                      }
                    />
                    <ActionButton
                      action="rt"
                      count={0}
                      active={false}
                      onClick={() =>
                        handleAction({ id: post.id, action: 'rt' })
                      }
                    />
                  </PostActions>
                </PostContainer>
              </>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Feed
