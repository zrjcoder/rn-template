import React, { useRef, useEffect, useCallback } from 'react'
import { Box } from 'native-base'

import { TaskList, TaskListHandle, type TaskListParamsProps } from '../components'
import { type DialogHandle } from '@/components'
import { useLazyFetchTaskListQuery } from '@/services'
import { Immediate, type ImmediateResHandle } from '../components/Dialog'
import { useNavigation } from '@react-navigation/native'
import { type RootStackScreenProps } from '@/navigators/types'
import { executeAfterDelay } from '@/util'

export const Ongoing = ({ params }: { params: TaskListParamsProps }) => {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  const alarmDialogRef = useRef<DialogHandle>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)
  const taskListRef = useRef<TaskListHandle>(null)

  const [fetchTaskList, result] = useLazyFetchTaskListQuery()

  const getData = useCallback(
    (params: TaskListParamsProps = {}) => {
      fetchTaskList({
        condition: { receiveStatus: 1, selType: 'doing', type: 'case' },
        ...params,
      })
    },
    [fetchTaskList]
  )

  useEffect(() => {
    getData(params)
  }, [getData, params])

  return (
    <Box flex={1}>
      <Immediate ref={immediateDialogRef} />
      <TaskList
        ref={taskListRef}
        getData={getData}
        result={result}
        onItemPress={async (type, item) => {
          // 出警但未到现场
          if (type === 'go') {
            nav(item)
          }
          // 已接警但未出警
          else if (type === 'unGo') {
            const { isSuccess } = await taskListRef.current?.updateTaskStatus('go', item)
            alarmDialogRef.current?.closeDialog()
            if (isSuccess) {
              executeAfterDelay(() => {
                nav(item)
              })
            }
          } else if (type === 'unFeedback') {
            nav(item, 'Case')
          }
        }}
      />
    </Box>
  )

  function nav(item: any, route = 'Scene') {
    navigation.navigate(route as any, {
      data: item,
      refresh: () => {
        getData(params)
      },
    })
  }
}
