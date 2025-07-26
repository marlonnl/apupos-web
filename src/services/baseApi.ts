import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue
} from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '../utils'
import { RootReducer } from '../store'
import { refresh } from '../store/reducers/token'
import { logout } from '../store/reducers/auth'

export const baseApi2 = createApi({
  reducerPath: 'baseApi2',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL
    // prepareHeaders: (headers, { getState }) => {
    //   const { user } = (getState() as RootReducer).authSlice
    //   if (user?.tokens.access) {
    //     headers.set('authorization', `Bearer ${user.tokens.access}`)
    //   }
    //   return headers
    // }
    // credentials: 'include'
  }),
  endpoints: () => ({})
})

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { access } = (getState() as RootReducer).tokenSlice
    if (access) {
      headers.set('Authorization', `Bearer ${access}`)
    }
    return headers
  }
  // credentials: 'include'
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token')

    if (refreshToken) {
      const refreshResult: any = await baseQuery(
        {
          url: '/auth/token/refresh/',
          method: 'POST'
        },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        if (refreshResult.data.refreshed === true) {
          // const new_access_token = localStorage.getItem('access_token')
          // const new_refresh_token = localStorage.getItem('refresh_token')
          api.dispatch(refresh())

          result = await baseQuery(args, api, extraOptions)
        }
      } else {
        api.dispatch(logout())
      }
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
})
