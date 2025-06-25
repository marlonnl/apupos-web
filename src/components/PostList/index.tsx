import { PostListContainer } from './styles'
import { useEffect, useState } from 'react'
import Apupo from '../Apupo'

const PostList = () => {
  function loadApupos(callback: any) {
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'http://localhost:8000/api/apupo'
    const responseType = 'json'

    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
      console.log(xhr.response)
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (error) {
      callback({ content: 'the request was an error' }, 400)
    }
    xhr.send()
  }

  const [posts, setPosts] = useState<PostsAPI[]>()

  // setPosts({ content: 'loading' })

  useEffect(() => {
    const myCallback = (response: PostsAPI[], status: number) => {
      console.log(response)
      if (status === 200) {
        setPosts(response)
      } else {
        alert('Ocorreu um erro.')
      }
    }
    loadApupos(myCallback)
  }, [])

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
