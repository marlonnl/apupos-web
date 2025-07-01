import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const postApiSlice = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api'
  }),
  endpoints: (builder) => ({
    getApupos: builder.query<PostsAPI[], void>({
      query: () => 'apupo'
    }),
    createPost: builder.mutation<PostsAPI, Omit<PostsAPI, 'id' | 'parent'>>({
      query: (content) => ({
        url: 'apupo/create/',
        method: 'POST',
        body: content
      })
    })
  })
})

export const { useGetApuposQuery, useCreatePostMutation } = postApiSlice
export default postApiSlice
