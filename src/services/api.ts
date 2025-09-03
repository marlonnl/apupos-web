import { baseApi } from './baseApi'

type actionType = {
  id: number
  action: 'like' | 'unlike' | 'rt'
}

export type userGetPostsQuery = {
  pageNumber: number | null
  username?: string | null
  feed: boolean
}

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // returns all posts
    // TODO: username in context
    // /api/apupo/?page={paege}&username={username}
    getPosts: builder.query<Pagination, userGetPostsQuery>({
      query: (userPostsContext) => ({
        url: `/apupo/?page=${userPostsContext.pageNumber}${
          userPostsContext.username
            ? `&username=${userPostsContext.username}`
            : ''
        }`
      })
    }),
    // all posts from a designated username
    getUserFeed: builder.query<Pagination, userGetPostsQuery>({
      query: (userFeedContext) => ({
        url: `/apupo${userFeedContext.feed ? '/feed/' : '/'}?page=${
          userFeedContext.pageNumber
        }${
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
    }),
    getMe: builder.query<ProfileType, void>({
      query: () => ({
        url: '/me/'
      })
    })
  })
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useActionPostMutation,
  useGetPostDetailQuery,
  useGetUserFeedQuery,
  useGetMeQuery
} = postsApi
export default postsApi
