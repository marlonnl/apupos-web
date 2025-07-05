import { useCallback, useEffect, useState } from 'react'
import PostList from '../PostList'
import Compose from '../Compose'
import { useGetPostsQuery } from '../../services/api'

const Feed = () => {
  const [postsFeed, setPostsFeed] = useState<PostsAPI[]>()
  const { data, isLoading, isSuccess, refetch } = useGetPostsQuery()

  useEffect(() => {
    if (isSuccess) {
      setPostsFeed(data)
      // refetch()
    }
  }, [data, isSuccess])

  if (isLoading) {
    return <p>Carregando posts...</p>
  }

  return (
    <>
      <Compose />
      <PostList posts={postsFeed} />
    </>
  )
}

export default Feed
