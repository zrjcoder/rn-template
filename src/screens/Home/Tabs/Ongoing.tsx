import React, { useRef, useEffect, useCallback } from 'react'

import { Box } from 'native-base'
import { TaskList, TaskListHandle, type TaskListParamsProps } from '../components'
import { type DialogHandle } from '@/components'
import { useLazyFetchTaskListQuery } from '@/services'
import { Alarm, Immediate, type ImmediateResHandle } from '../components/Dialog'

export const Ongoing = ({ params }: { params: TaskListParamsProps }) => {
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
        onItemPress={() => {
          taskListRef.current?.updateTaskStatus('receive')
        }}
      />
    </Box>
  )
}
