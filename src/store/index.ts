import { configureStore } from '@reduxjs/toolkit'
import api from '../services/api'
import postApiSlice from '../services/api'

export const store = configureStore({
  reducer: {
    [postApiSlice.reducerPath]: postApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApiSlice.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
