import React, { useRef, useEffect, useCallback } from 'react'

import { Box } from 'native-base'
import { TaskList, type TaskListParamsProps } from '../components'
import { type DialogHandle } from '@/components'
import { useLazyFetchTaskListQuery } from '@/services'
import { Alarm, Immediate, type ImmediateResHandle } from '../components/Dialog'

export const Incident = ({ params }: { params: TaskListParamsProps }) => {
  const alarmDialogRef = useRef<DialogHandle>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)

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
          console.log('dudu')
        }}
      />
    </Box>
  )
}
