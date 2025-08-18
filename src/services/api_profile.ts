import { baseApi } from './baseApi'

export type ProfileResponseAPI = {
  username: string
  profile: {
    id: number
    username: string
    first_name: string
    bio: string
    site: string
    location: string
    following_count: number
    followers_count: number
    posts: number
  }
  is_following: boolean
  follows_me: boolean
}

export type UpdateProfile = {
  name: string
  bio: string
  site: string
  location: string
}

export type FollowProfile = {
  username: string
  action: 'follow' | 'unfollow'
}

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponseAPI, string>({
      query: (username) => ({
        url: `/profile/${username}/`,
        method: 'GET'
      })
    }),
    updateProfile: builder.mutation<unknown, UpdateProfile>({
      query: (updateProfileContext) => ({
        url: `/profile-update/`,
        method: 'POST',
        body: updateProfileContext
      })
    }),
    follow: builder.mutation<unknown, FollowProfile>({
      query: (followContext) => ({
        url: `/profile/${followContext.username}/follow/`,
        method: 'POST',
        body: { action: followContext.action }
      })
    })
  })
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useFollowMutation
} = profileApi
export default profileApi
