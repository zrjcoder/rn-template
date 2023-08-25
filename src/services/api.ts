import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Toast } from '@/components'

const baseQuery = fetchBaseQuery({
  baseUrl:
    // process.env.NODE_ENV === 'development' ? process.env.BASE_URL : process.env.BUILD_URL,
    // process.env.BASE_URL,
    'http://172.19.46.100:18805/',
  // 'http://26.152.201.150:18805/',
  timeout: 15000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).user.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === (401 || 404)) {
    Toast.error('出错了！')
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
