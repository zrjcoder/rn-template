import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Toast } from '@/components'

const baseUrl =
  process.env.NODE_ENV === 'development' ? process.env.BASE_URL : process.env.BUILD_URL

const baseQuery = fetchBaseQuery({
  baseUrl,
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
