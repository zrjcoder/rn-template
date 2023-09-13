import { api } from '../../api'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    authorize: build.mutation<
      { token: string; message: string },
      { userName: string; userPsw: string; verCode: string }
    >({
      query: (body) => ({
        url: '/dispatch/authclient/user/login',
        method: 'POST',
        body,
      }),
    }),

    getUserInfo: build.mutation<any, any>({
      query: (body) => ({
        url: '/auth/service/passportInfo/findPassportInfoByConditionInList',
        method: 'POST',
        body,
      }),
    }),

    // 意见反馈
    feedback: build.mutation<any, any>({
      query: (body) => ({
        url: '/dispatch/adviceBox/save',
        method: 'POST',
        body,
      }),
    }),

    // 获取通讯录
    getAddressBook: build.query<any, any>({
      query: () => ({
        url: '/auth/service/passportInfo/findAllPassportInfoInList',
        method: 'GET',
      }),
    }),
  }),

  overrideExisting: false,
})

export const {
  useAuthorizeMutation,
  useGetUserInfoMutation,
  useFeedbackMutation,
  useGetAddressBookQuery,
} = userApi
