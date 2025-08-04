import { baseApi } from './baseApi'

export type ProfileResponseAPI = {
  id: number
  user: number
  username: string
  name: string
  bio: string
  site: string
  location: string
}

export type UpdateProfile = {
  name: string
  bio: string
  site: string
  location: string
}

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponseAPI[], string>({
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
    })
  })
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
export default profileApi
