import { configureStore } from '@reduxjs/toolkit'
import postApiSlice from '../services/api'

import postsReducer from './reducers/posts'
import { baseApi } from '../services/baseApi'

export const store = configureStore({
  reducer: {
    postsState: postsReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
