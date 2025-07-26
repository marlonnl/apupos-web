import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthTokenType = {
  access: '',
  refresh: ''
}

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    refresh: (state) => {
      const new_access_token = localStorage.getItem('access_token')
      const new_refresh_token = localStorage.getItem('refresh_token')

      console.log(new_access_token, new_refresh_token)

      if (new_access_token && new_refresh_token) {
        state.access = new_access_token
        state.refresh = new_refresh_token
      }
    }
  }
})

export const { refresh } = tokenSlice.actions
export default tokenSlice.reducer
