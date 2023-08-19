import React, { useRef, useState, forwardRef } from 'react'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { FlatList, type FlatListHandle, Toast } from '@/components'
import { useUpdateTaskMutation, type PoliceTypeProps } from '@/services'
import { TaskItem, CenterButton } from '.'
import { convertIncidentDataToShow } from '@/util'

export type TaskListParamsProps = {
  keyword?: string
  pageSize?: number
  pageNum?: number
}

type TaskListProps = {
  result: any
  getData: (params?: TaskListParamsProps) => void
  onItemPress: () => void
}

export type TaskListHandle = {
  currentItem: any
  updateTaskStatus: (updateType: PoliceTypeProps) => void
}

export const TaskList = forwardRef(
  ({ result, getData, onItemPress }: TaskListProps, ref) => {
    const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()
    const { data, isFetching } = result

    const listRef = useRef<FlatListHandle>(null)

    const [update, { isLoading }] = useUpdateTaskMutation()
    const [currentItem, setCurrentItem] = useState<any>(null)

    React.useImperativeHandle(ref, () => ({
      currentItem,
      updateTaskStatus: (updateType: PoliceTypeProps) => {
        updateTask(updateType)
      },
    }))

    return (
      <Box flex={1} bg="#F5F7F9">
        <FlatList
          ref={listRef}
          isFetching={isFetching}
          data={data?.data?.list ?? []}
          onRefresh={() => {
            getData({})
          }}
          renderItem={({ item }) => (
            <TaskItem
              item={convertIncidentDataToShow(item)}
              leftPress={() => {}}
              centerButton={
                <CenterButton
                  // isLoading={item?.gid == currentItem?.gid && isLoading}
                  isLoading={isLoading}
                  isLoadingText="出警中..."
                  onPress={() => {
                    console.log(item, data, currentItem)
                    setCurrentItem(item)
                    onItemPress()
                  }}>
                  立即出警
                </CenterButton>
              }
              rightPress={() => {
                navigation.navigate('Map')
              }}
            />
          )}
        />
      </Box>
    )

    async function updateTask(updateType: PoliceTypeProps) {
      try {
        const result = await update({
          id: currentItem?.dispatchList[0]?.gid,
          code: currentItem?.dispatchList[0]?.jjdbh,
          updateType,
        })

        await getData()

        if ('data' in result) {
          const data = result.data
          Toast.info(data?.resMsg)
        }
      } catch {
        Toast.error('出错了！')
      }
    }
  }
)

// type tabDataProps = {
//   type: PoliceTypeProps
//   buttonText: string
//   buttonLoadingText: string
// }

// function getDataFromTabAndPoliceType(tabIndex: number, type: PoliceTypeProps) {
//   const tabData: any = {
//     // 未接案件
//     0: {
//       receive: {
//         buttonText: '立即接警',
//         buttonLoadingText: '接警中...',
//         type: 'receive',
//       },
//     },
//     // 正在进行案件
//     1: {
//       unGo: {
//         type: 'unGo',
//         buttonText: '立即出警',
//         buttonLoadingText: '出警中...',
//       },
//       go: {
//         type: 'go',
//         buttonText: '进行中',
//         buttonLoadingText: '出警中...',
//       },
//     },
//   }

//   // const data = tabData[tabIndex][type] ?? {}
// }
