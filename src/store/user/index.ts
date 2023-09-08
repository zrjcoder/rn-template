import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type MessageTypeProps, MessageTypes } from './value'

export type UserState = {
  token: string

  userInfo: UserInfoProps

  // 消息设置
  isMessageFilter: boolean
  messageTypes: MessageTypeProps[]
}

export type UserInfoProps = {
  userName: string
  userId: string
  nickName: string // 姓名
  orgName: string // 公安局名、所在单位
  orgGid: string // 警号
  tel: string // 电话号码
  position: string // 职位
}

const initialState: UserState = {
  token: '',

  userInfo: {
    userName: '暂无',
    userId: '',
    nickName: '暂无', // 姓名
    orgName: '暂无', // 公安局名、所在单位
    orgGid: '', // 警号
    tel: '暂无', // 电话号码
    position: '暂无', // 职位
  },

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

    setUserInfo: (state, action: PayloadAction<UserInfoProps>) => {
      state.userInfo = action.payload
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

export const {
  setToken,

  setUserInfo,
  setMessageTypes,
  clearMessageTypes,
  setMessageFilter,
} = slice.actions

export default slice.reducer
