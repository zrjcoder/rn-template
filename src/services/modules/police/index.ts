import { api } from '../../api'

export type PoliceTypeProps =
  | 'receive' // 接警
  | 'go' // 出警
  | 'reach' // 到场
  | 'unGo' // 取消出警

export const policeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 警情列表数据
    fetchTaskList: build.query<any, any>({
      query: (body) => ({
        url: '/visualization/jjdbGabAssociation/byPage',
        body: body,
        method: 'POST',
      }),
    }),

    fetchTaskDetail: build.query<any, any>({
      query: (body) => ({
        url: '/visualization/jjdbGabAssociation/getInfoByGId',
        params: body,
      }),
    }),

    // 出警、接警、取消任务
    updateTask: build.mutation<
      any,
      {
        id: string
        code: string
        updateType: PoliceTypeProps
      }
    >({
      query: ({ id, code, updateType }) => ({
        url: '/visualization/jjdbGabDispatch/updateWithType',
        body: {
          gid: id,
          jjdbh: code,
          updateType,
        },
        method: 'PUT',
      }),
    }),

    saveTask: build.mutation<any, any>({
      query: (body) => ({
        url: '/visualization/jjdbGabFeedBack/save',
        body: body,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLazyFetchTaskListQuery,
  useLazyFetchTaskDetailQuery,
  useUpdateTaskMutation,
  useSaveTaskMutation,
} = policeApi
