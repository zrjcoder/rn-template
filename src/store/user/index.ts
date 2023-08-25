import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type MessageTypeProps, MessageTypes } from './value'

export type UserState = {
  token: string
  userName: string
  messageTypes: MessageTypeProps[]
}

const initialState: UserState = {
  token: '',
  userName: 'dudu',
  messageTypes: MessageTypes,
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
