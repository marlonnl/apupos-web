import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthTokenType = {
  access: '',
  refresh: ''
}

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    refreshTokens: (state) => {
      const new_access_token = localStorage.getItem('accessToken')
      const new_refresh_token = localStorage.getItem('refreshToken')

      if (new_access_token && new_refresh_token) {
        state.access = new_access_token
        state.refresh = new_refresh_token
      }
    }
  }
})

export const { refreshTokens } = tokenSlice.actions
export default tokenSlice.reducer
