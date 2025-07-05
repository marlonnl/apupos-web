import { PostListContainer } from './styles'
import { useEffect, useState } from 'react'
import Apupo from '../Apupo'
import { useGetPostsQuery } from '../../services/api'

type Props = {
  posts?: PostsAPI[]
}

const PostList = ({ posts }: Props) => {
  return (
    <PostListContainer>
      {posts?.map((post) => {
        return (
          <Apupo
            id={post.id}
            content={post.content}
            likes={post.likes}
            is_retweet={post.is_retweet}
            parent={post.parent}
            key={post.id}
          />
        )
      })}
    </PostListContainer>
  )
}

export default PostList
