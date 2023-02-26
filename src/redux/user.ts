import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  email: string
  name: string
  user_id: number
  accessToken: string
  isLoggedIn: boolean
}
export interface UserData {
  accessToken: string
  user: {
    email: string
    name: string
    user_id: number
  }
}

const initialState: UserState = {
  email: '',
  name: '',
  user_id: -1,
  accessToken: '',
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginOrRegister: (state, action: PayloadAction<UserData>) => {
      const {
        accessToken,
        user: { email, name, user_id },
      } = action.payload
      state.accessToken = accessToken
      state.email = email
      state.name = name
      state.isLoggedIn = true
      state.user_id = user_id
    },
    logout: (state) => {
      state.accessToken = ''
      state.email = ''
      state.name = ''
      state.isLoggedIn = false
      state.user_id = -1
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginOrRegister, logout } = userSlice.actions

export default userSlice.reducer
