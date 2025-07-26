import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './reducers/posts'
import authReducer from './reducers/auth'
import tokenReducer from './reducers/token'
import { baseApi } from '../services/baseApi'

export const store = configureStore({
  reducer: {
    postsState: postsReducer,
    authSlice: authReducer,
    tokenSlice: tokenReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
