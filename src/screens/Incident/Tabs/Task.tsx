import React, { useRef, useEffect, useCallback } from 'react'

import { Box } from 'native-base'
import { TaskList, type TaskListParamsProps, type TaskListHandle } from '../components'
import { type DialogHandle } from '@/components'
import { useLazyFetchTaskListQuery } from '@/services'
import { Alarm, Immediate, type ImmediateResHandle } from '../components/Dialog'

import { useNavigation } from '@react-navigation/native'

import { type MyTabsParamList, type RootStackScreenProps } from '@/navigators/types'
import { executeAfterDelay } from '@/util'

export const Task = ({ params }: { params: TaskListParamsProps }) => {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  const alarmDialogRef = useRef<DialogHandle>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)

  const taskListRef = useRef<TaskListHandle>(null)

  const [fetchTaskList, result] = useLazyFetchTaskListQuery()

  const getData = useCallback(
    (params: any = {}) => {
      fetchTaskList({
        condition: { receiveStatus: 0, selType: 'todo' },
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
        getData={getData}
        result={result}
        onItemPress={() => {
          taskListRef.current?.updateTaskStatus('receive')
          executeAfterDelay(() => {
            navigation.navigate('IncidentTabs', {
              screen: 'Scene',
              params: {
                data: {},
              },
            })
          })
        }}
      />
    </Box>
  )
}
