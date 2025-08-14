import { baseApi } from './baseApi'

type actionType = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

export type userGetPostsQuery = {
  pageNumber: number | null
  username?: string | null
}

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // returns all posts
    getPosts: builder.query<Pagination, number>({
      query: (pageNumber) => ({
        url: `/apupo/?page=${pageNumber}`
      })
    }),
    // all posts from a designated username
    getUserFeed: builder.query<Pagination, userGetPostsQuery>({
      query: (userFeedContext) => ({
        url: `/apupo/feed/?page=${userFeedContext.pageNumber}${
          userFeedContext.username
            ? `&username=${userFeedContext.username}`
            : ''
        }`
      })
    }),
    // creates a post
    createPost: builder.mutation<
      PostsAPI,
      Omit<PostsAPI, 'id' | 'parent' | 'created_at' | 'user'>
    >({
      query: (content) => ({
        url: '/apupo/create/',
        method: 'POST',
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
  useGetPostDetailQuery,
  useGetUserFeedQuery
} = postsApi
export default postsApi
