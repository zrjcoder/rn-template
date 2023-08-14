import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  token: string
  userName: string
}

const initialState: UserState = {
  token: '',
  userName: 'dudu',
}

const slice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { setToken } = slice.actions

export default slice.reducer
