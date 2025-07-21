import { baseApi } from './baseApi'

type loginType = {
  username: string
  password: string
}

type loginResponseType = {
  id: number
  username: string
  email: string
  tokens: {
    access?: string
    refresh?: string
  }
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
        url: '/auth/login/',
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
    })
  })
})

export const { useLoginMutation, useRegisterMutation } = authApi
export default authApi
