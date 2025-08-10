import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useActionPostMutation,
  useGetPostsQuery,
  useGetUserFeedQuery
} from '../../services/api'

import Compose from '../Compose'
import Apupo from '../Apupo'
import ActionButton from '../ActionButton'
import Loader from '../Loader'

import { FeedContainer, PostActions, PostContainer } from './styles'
import InfiniteScroll from 'react-infinite-scroll-component'

type actionProps = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

const Feed = () => {
  const [feed, setFeed] = useState<PostsAPI[]>([])

  // infinite scroll
  const [page, setPage] = useState<number>(1)

  const [
    createActionPostMutation,
    { data: actionResponse, isSuccess: actionSuccess }
  ] = useActionPostMutation()

  const queryObj = { pageNumber: page }

  // const { data, isLoading, isSuccess, refetch } = useGetPostsQuery(page)
  const { data, isLoading, isSuccess, refetch } = useGetUserFeedQuery(
    {
      pageNumber: page
    },
    {
      refetchOnMountOrArgChange: true
    }
  )

  const navigate = useNavigate()

  const doFetch = async () => {
    try {
      await refetch()
      if (feed.length == 0 && data) {
        setFeed(data.results)
        console.log('feed zerado', feed, data.results)
      } else if (data) {
        setFeed([...feed, ...data.results])
        console.log('feed usado', page, feed, data?.results)
      }
      console.log('refetched! ', data?.results)
    } catch (error) {
      console.log('ERRO! ', error)
    }
    return
  }

  const handleMoreData = async () => {
    console.log('handlemoredata call')
    const newPage = page + 1
    setPage(newPage)
    try {
      await refetch()
    } catch (error) {
      console.log('error ', error)
    }
    console.log('next ', data?.next)
  }

  useEffect(() => {
    if (isSuccess) {
      if (feed.length == 0 && data) {
        setFeed(data.results)
        console.log('feed zerado', feed, data.results)
      } else {
        setFeed([...feed, ...data.results])
        console.log('feed usado', page, feed, data.results)
      }
    }
  }, [data, isSuccess, refetch])

  const handleAction = (e: React.MouseEvent, actionContent: actionProps) => {
    createActionPostMutation({
      id: actionContent.id,
      action: actionContent.action
    })
    refetch()
    e.stopPropagation()
  }

  const handleNavigate = (detailId: number, e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      const linkTo = `/post/${detailId}/`
      navigate(linkTo)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Compose />
      {isSuccess && (
        <InfiniteScroll
          dataLength={data.results.length}
          next={handleMoreData}
          hasMore={feed.length < data.count}
          loader={<Loader />}
          endMessage={
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '8px'
              }}
            >
              Isso era tudo por hoje!
            </p>
          }
        >
          <FeedContainer>
            {feed?.map((post) => {
              return (
                <>
                  <PostContainer>
                    <Apupo
                      key={post.id}
                      id={post.id}
                      user={post.user}
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
                        onClick={(e) =>
                          handleAction(e, { id: post.id, action: 'like' })
                        }
                      />
                      <ActionButton
                        action="rt"
                        count={0}
                        active={false}
                        onClick={(e) =>
                          handleAction(e, { id: post.id, action: 'rt' })
                        }
                      />
                    </PostActions>
                  </PostContainer>
                </>
              )
            })}
            {/* <button onClick={handleMoreData}>Load more!</button> */}
          </FeedContainer>
        </InfiniteScroll>
      )}
    </>
  )
}

export default Feed
