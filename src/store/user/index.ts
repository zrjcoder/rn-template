import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type MessageTypeProps, MessageTypes } from './value'

export type UserState = {
  token: string
  userName: string
  isMessageFilter: boolean
  messageTypes: MessageTypeProps[]
}

const initialState: UserState = {
  token: '',
  userName: 'dudu',
  isMessageFilter: false,
  messageTypes: MessageTypes,
}

const slice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },

    // 消息过滤器
    setMessageFilter: (state, action: PayloadAction<boolean>) => {
      state.isMessageFilter = action.payload
    },
    setMessageTypes: (state, action: PayloadAction<MessageTypeProps[]>) => {
      state.messageTypes = action.payload
    },
    clearMessageTypes: (state) => {
      state.messageTypes = MessageTypes
    },
  },
})

export const { setToken, setMessageTypes, clearMessageTypes, setMessageFilter } =
  slice.actions

export default slice.reducer
