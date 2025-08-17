import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useActionPostMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetUserFeedQuery
} from '../../services/api'

import Compose from '../Compose'
import Apupo from '../Apupo'
import ActionButton from '../ActionButton'
import Loader from '../Loader'

import { FeedContainer, PostActions, PostContainer } from './styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { Signpost2Fill } from 'react-bootstrap-icons'

type actionProps = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

type feedProps = {
  usernameFeed?: string
  showFeed: boolean
  canPost?: boolean
}

const Feed = ({ showFeed, usernameFeed, canPost = false }: feedProps) => {
  const navigate = useNavigate()
  const [feed, setFeed] = useState<PostsAPI[]>([])
  const [page, setPage] = useState<number>(1)

  const { user: userStateData } = useSelector(
    (state: RootReducer) => state.authSlice
  )

  // async??
  if (!usernameFeed) {
    usernameFeed = userStateData?.username
  }

  const [createPostMutation, { isSuccess: newPostSuccess }] =
    useCreatePostMutation()
  const [
    createActionPostMutation,
    { data: actionResponse, isSuccess: actionSuccess }
  ] = useActionPostMutation()

  const queryObj = { pageNumber: page }

  const { data, isLoading, isSuccess, refetch } = useGetUserFeedQuery(
    {
      pageNumber: page,
      username: usernameFeed,
      feed: showFeed
    },
    {
      refetchOnMountOrArgChange: true
    }
  )

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

  const handleAction = (e: React.MouseEvent, actionContent: actionProps) => {
    createActionPostMutation({
      id: actionContent.id,
      action: actionContent.action
    })
    console.log('action', actionContent)
    setFeed([])
    refetch()
    // e.stopPropagation()
  }

  const handleNavigate = (detailId: number, e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      const linkTo = `/post/${detailId}/`
      navigate(linkTo)
    }
  }

  const handleNewPost = async (e: React.MouseEvent, newApupo: string) => {
    e.preventDefault()

    const newPostData: Omit<PostsAPI, 'id' | 'parent' | 'created_at' | 'user'> =
      {
        content: newApupo,
        likes: 0,
        is_retweet: false
      }

    const createPostResponse = await createPostMutation(newPostData).unwrap()

    if (createPostResponse) {
      const newFeed = [createPostResponse, ...feed]
      setFeed(newFeed)
    }
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

    if (newPostSuccess) {
      refetch()
    }
  }, [data, isSuccess, usernameFeed, newPostSuccess])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {canPost && (
        <Compose onClick={(e, newApupo) => handleNewPost(e, newApupo)} />
      )}
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
                alignItems: 'center',
                gap: '16px',
                padding: '8px',
                fontSize: '13px'
              }}
            >
              <Signpost2Fill />
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
                        active={post.is_liked}
                        onClick={(e) =>
                          handleAction(e, {
                            id: post.id,
                            action: post.is_liked ? 'unlike' : 'like'
                          })
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
