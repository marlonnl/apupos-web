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
    login: builder.mutation<loginType, loginType>({
      query: (loginContext) => ({
        url: '/auth/login/',
        method: 'POST',
        body: loginContext
      })
    }),
    register: builder.mutation<registerType, registerType>({
      query: (registerContext) => ({
        url: '/auth/register/',
        method: 'POST',
        body: registerContext
      })
    })
  })
})

export const { useLoginMutation, useRegisterMutation } = authApi
export default authApi
