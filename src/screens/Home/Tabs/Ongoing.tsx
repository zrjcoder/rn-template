import React, { useRef, useEffect, useCallback } from 'react'

import { Box } from 'native-base'
import { TaskList, TaskListHandle, type TaskListParamsProps } from '../components'
import { type DialogHandle } from '@/components'
import { useLazyFetchTaskListQuery } from '@/services'
import { Alarm, Immediate, type ImmediateResHandle } from '../components/Dialog'

import { useNavigation } from '@react-navigation/native'

import { type MyTabsParamList, type RootStackScreenProps } from '@/navigators/types'
import { executeAfterDelay } from '@/util'

export const Ongoing = ({ params }: { params: TaskListParamsProps }) => {
  const navigation = useNavigation<RootStackScreenProps<'MyTabs'>>()

  const alarmDialogRef = useRef<DialogHandle>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)
  const taskListRef = useRef<TaskListHandle>(null)

  const [fetchTaskList, result] = useLazyFetchTaskListQuery()

  const getData = useCallback(
    (params: TaskListParamsProps = {}) => {
      fetchTaskList({
        condition: { receiveStatus: 1, selType: 'doing' },
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
      <Alarm ref={alarmDialogRef} onLeftPress={() => {}} onRightPress={() => {}} />
      <Immediate ref={immediateDialogRef} />
      <TaskList
        ref={taskListRef}
        getData={getData}
        result={result}
        onItemPress={(item: any) => {
          const status = item?.status as Number
          taskListRef.current?.updateTaskStatus('go')
          executeAfterDelay(() => {
            navigation.navigate('IncidentTabs', {
              screen: 'Scene',
            })
          })
        }}
      />
    </Box>
  )
}
