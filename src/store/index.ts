import { configureStore } from '@reduxjs/toolkit'
import postApiSlice from '../services/api'

import postsReducer from './reducers/posts'

export const store = configureStore({
  reducer: {
    postsState: postsReducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApiSlice.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
