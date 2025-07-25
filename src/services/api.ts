import { baseApi } from './baseApi'

type actionType = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // returns all posts
    getPosts: builder.query<PostsAPI[], void>({
      // query: (user?: string) => ''
      query: () => '/apupo/'
    }),
    // creates a post
    createPost: builder.mutation<
      PostsAPI,
      Omit<PostsAPI, 'id' | 'parent' | 'created_at'>
    >({
      query: (content) => ({
        url: '/apupo/create/',
        method: 'POST',
        // headers: { 'X-CSRFToken': csrftoken, 'Content-Type': 'application/json',  },
        body: content
      })
    }),
    // do actions (fav, unfav, rt, reply)
    actionPost: builder.mutation<PostsAPI, actionType>({
      query: (actionContent) => ({
        url: '/apupo/action/',
        method: 'POST',
        body: actionContent
      })
    }),
    getPostDetail: builder.query<PostsAPI, number | string>({
      query: (id) => ({ url: `/apupo/${id}` })
    })
  })
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useActionPostMutation,
  useGetPostDetailQuery
} = postsApi
export default postsApi
