import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

function getCookie(name: any) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

const csrftoken = getCookie('csrftoken')

type actionType = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

const postApiSlice = createApi({
  reducerPath: 'fecthPosts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/apupo'
  }),
  endpoints: (builder) => ({
    // returns all posts
    getPosts: builder.query<PostsAPI[], void>({
      // query: (user?: string) => ''
      query: () => ''
    }),
    // creates a post
    createPost: builder.mutation<
      PostsAPI,
      Omit<PostsAPI, 'id' | 'parent' | 'created_at'>
    >({
      query: (content) => ({
        url: 'create/',
        method: 'POST',
        // headers: { 'X-CSRFToken': csrftoken, 'Content-Type': 'application/json',  },
        body: content
      })
    }),
    // do actions (fav, unfav, rt, reply)
    actionPost: builder.mutation<PostsAPI, actionType>({
      query: (actionContent) => ({
        url: 'action/',
        method: 'POST',
        body: actionContent
      })
    })
  })
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useActionPostMutation
} = postApiSlice
export default postApiSlice
