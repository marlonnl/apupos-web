import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type authState = {
  authenticated: boolean
  user?: ProfileType
}

const initialState: authState = {
  authenticated: false
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authentication: (state, action: PayloadAction<authState>) => {
      // if (!state.authenticated) {
      state.authenticated = action.payload.authenticated
      state.user = action.payload.user

      console.log('state:', state.user)
      // }
    },
    logout: (state) => {
      state.authenticated = false
    }
  }
})

export const { authentication, logout } = authSlice.actions
export default authSlice.reducer
