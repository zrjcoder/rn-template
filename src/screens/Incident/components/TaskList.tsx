import React, { useRef, forwardRef } from 'react'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { FlatList, type FlatListHandle, FlatListParamsProps } from '@/components'
import { useUpdateTaskMutation, type PoliceTypeProps } from '@/services'
import { TaskItem, TButton } from '.'
import { convertIncidentDataToShow, safeFetch } from '@/util'

export type TaskListParamsProps = {
  condition?: {
    receiveStatus?: number
    selType?: string
  }
} & FlatListParamsProps

type TaskListProps = {
  result: any
  getData: (params?: TaskListParamsProps) => void
  onItemPress: (type: 'receive' | 'unGo' | 'go' | 'unFeedback', item: any) => void
}

export type TaskListHandle = {
  isLoading: boolean
  updateTaskStatus: (updateType: PoliceTypeProps, item?: any) => Promise<any>
}

export const TaskList = forwardRef(
  ({ result, getData, onItemPress }: TaskListProps, ref) => {
    const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()
    const { data, isFetching } = result

    const listRef = useRef<FlatListHandle>(null)

    const [update, { isLoading }] = useUpdateTaskMutation()

    React.useImperativeHandle(ref, () => ({
      updateTaskStatus: async (updateType: PoliceTypeProps, item: any = null) => {
        return await updateTask(updateType, item)
      },
    }))

    return (
      <Box flex={1} bg="#F5F7F9">
        <FlatList
          ref={listRef}
          isFetching={isFetching}
          keyExtractor={(item, index) => (item?.gid + index).toString()}
          data={data?.data?.list ?? []}
          onRefresh={() => {
            getData({})
          }}
          renderItem={({ item }) => {
            const statusData = getCurrentTaskStatusData(item?.status)

            return (
              <TaskItem
                item={convertIncidentDataToShow(item?.jjdbGab)}
                leftPress={() => {}}
                centerButton={
                  <TButton
                    w={104}
                    theme={
                      ['go', 'unFeedback'].includes(statusData?.type)
                        ? 'success'
                        : 'alarm'
                    }
                    isLoading={isLoading}
                    isLoadingText={statusData?.buttonLoadingText}
                    onPress={() => {
                      onItemPress(statusData?.type, item)
                    }}>
                    {statusData?.buttonText}
                  </TButton>
                }
                rightPress={() => {
                  navigation.navigate('Map')
                }}
              />
            )
          }}
        />
      </Box>
    )

    async function updateTask(updateType: PoliceTypeProps, item: any = null) {
      const result = await safeFetch(update, {
        id: item?.dispatchList[0]?.gid,
        code: item?.dispatchList[0]?.jjdbh,
        updateType,
      })

      getData()

      return {
        isSuccess: result?.isSuccess,
        data: item,
      }
    }
  }
)

function getCurrentTaskStatusData(status: number): {
  buttonLoadingText: string
  buttonText: string
  type: 'receive' | 'unGo' | 'go' | 'unFeedback'
} {
  const tabData: any = {
    // 未接案件
    0: {
      buttonText: '立即接警',
      buttonLoadingText: '接警中...',
      type: 'receive',
    },
    // 接警但未出警
    1: {
      type: 'unGo',
      buttonText: '立即出警',
      buttonLoadingText: '出警中...',
    },
    // 出警但未到现场
    2: {
      type: 'go',
      buttonText: '进行中',
      buttonLoadingText: '出警中...',
    },
    // 到现场但未反馈
    3: {
      type: 'unFeedback',
      buttonText: '反馈中',
      buttonLoadingText: '反馈中...',
    },
  }

  return tabData[status]
}
