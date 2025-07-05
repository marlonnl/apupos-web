import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import postApiSlice, { useCreatePostMutation } from '../../services/api'

type PostState = {
  posts: PostsAPI[]
}

const initialState: PostState = {
  posts: []
}

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<PostsAPI[]>) => {
      if (state.posts.length == 0) {
        console.log(action)
        state.posts = action.payload
      }
    },
    add: (state, action: PayloadAction<PostsAPI>) => {
      state.posts.push(action.payload)
    }
  }
})

export const { load, add } = postsSlice.actions
export default postsSlice.reducer
