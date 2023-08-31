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
  }),
  overrideExisting: false,
})

export const { useAuthorizeMutation } = userApi
