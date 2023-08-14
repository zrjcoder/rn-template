import { api } from '../../api'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    authorize: build.mutation<
      { token: string; message: string },
      { userName: string; userPsw: string; verCode: string }
    >({
      query: (body) => ({
        url: 'dispatch/authclient/user/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => {
        console.log('dudu')
        const token = response?.data?.value ?? ''
        // const tokenType = response?.data?.tokenType ?? ''

        if (token) {
          return {
            message: response?.resMsg ?? '登录成功',
            token: token,
          }
        }

        return {
          message: response?.resMsg ?? '登录失败',
          token: '',
        }
      },
      transformErrorResponse: () => {
        return ''
      },
    }),
  }),
  overrideExisting: false,
})

export const { useAuthorizeMutation } = userApi
