import { api } from '../../api'

export const commonApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 文件上传
    uploadFile: build.mutation<any, any>({
      query: (body) => ({
        url: '/fileService/apis/uploadFile',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useUploadFileMutation } = commonApi
