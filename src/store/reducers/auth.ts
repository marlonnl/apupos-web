import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type authState = {
  isLogged: boolean
  user?: {
    id: number
    username: string
    email: string
    tokens?: {
      access?: string
      refresh?: string
    }
  }
}

const initialState: authState = {
  isLogged: false
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authentication: (state, action: PayloadAction<loginActionType>) => {
      if (!state.isLogged) {
        state.isLogged = true
        state.user = action.payload
      }
    },
    logout: (state) => {
      state.isLogged = false
    }
  }
})

export const { authentication, logout } = authSlice.actions
export default authSlice.reducer
