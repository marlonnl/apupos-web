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

const postApiSlice = createApi({
  reducerPath: 'fecthPosts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api'
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostsAPI[], void>({
      query: () => 'apupo'
    }),
    createPost: builder.mutation<PostsAPI, Omit<PostsAPI, 'id' | 'parent'>>({
      query: (content) => ({
        url: 'apupo/create/',
        method: 'POST',
        // headers: { 'X-CSRFToken': csrftoken, 'Content-Type': 'application/json',  },
        body: content
      })
    })
  })
})

export const { useGetPostsQuery, useCreatePostMutation } = postApiSlice
export default postApiSlice
