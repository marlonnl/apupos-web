import { BASE_API_AUTH_URL } from '../utils'
import { baseApi } from './baseApi'

type loginType = {
  username: string
  password: string
}

type registerType = {
  username: string
  email: string
  password1: string
  password2: string
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: alterar type do primeiro valor (retorno)
    login: builder.mutation<loginResponseType, loginType>({
      query: (loginContext) => ({
        url: '/auth/token/',
        method: 'POST',
        body: loginContext
      })
    }),
    register: builder.mutation<unknown, registerType>({
      query: (registerContext) => ({
        url: '/auth/register/',
        method: 'POST',
        body: registerContext
      })
    }),
    authenticated: builder.query<boolean, void>({
      query: () => ({
        url: '/auth/authenticated/',
        method: 'POST'
      })
    }),
    doLogout: builder.mutation<unknown, void>({
      query: () => ({
        url: `${BASE_API_AUTH_URL}logout/`,
        method: 'POST'
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useAuthenticatedQuery,
  useDoLogoutMutation
} = authApi
export default authApi
