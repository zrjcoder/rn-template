// import { api } from '../../api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const messageApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     // 警情列表数据
//     fetchMessageList: build.query<any, any>({
//       query: (body) => ({
//         url: '/auth/service/alertMsg/byPage',
//         body: body,
//         method: 'POST',
//       }),
//     }),
//     // fetchMessageList: build.query<any, any>({
//     //   query: (body) => ({
//     //     url: '/auth/service/alertMsg/update',
//     //     body: body,
//     //     method: 'POST',
//     //   }),
//     // }),
//   }),
//   overrideExisting: false,
// })

export const messageApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://172.19.45.72:18455',
    // baseUrl: 'http://172.19.46.100:18805/',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as any).user.token
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }
    //   return headers
    // },
  }),

  endpoints: (build) => ({
    fetchMessageList: build.query<any, any>({
      query: (body) => ({
        url: '/auth/service/alertMsg/byPage',
        body: body,
        method: 'POST',
      }),
    }),
  }),
})

export const { useLazyFetchMessageListQuery, useFetchMessageListQuery } = messageApi
