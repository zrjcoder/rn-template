import { api } from '../../api'

export const messageApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 警情列表数据
    fetchMessageList: build.query<any, any>({
      query: (body) => ({
        url: '/auth/service/alertMsg/byPage',
        body: body,
        method: 'POST',
      }),
    }),
    updateMessage: build.query<any, any>({
      query: (body) => ({
        url: '/auth/service/alertMsg/update',
        body: body,
        method: 'PUT',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLazyFetchMessageListQuery,
  useFetchMessageListQuery,
  useLazyUpdateMessageQuery,
} = messageApi
