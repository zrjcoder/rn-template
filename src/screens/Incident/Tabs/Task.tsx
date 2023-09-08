import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Box } from 'native-base'

import { TaskList, type TaskListParamsProps, type TaskListHandle } from '../components'
import { Toast } from '@/components'
import { useLazyFetchTaskListQuery } from '@/services'
import { Alarm, Immediate, type ImmediateResHandle } from '../components/Dialog'
import { type RootStackScreenProps } from '@/navigators/types'
import { executeAfterDelay, makePhoneCall } from '@/util'

export const Task = ({ params }: { params: TaskListParamsProps }) => {
  const navigation = useNavigation<RootStackScreenProps<'Scene'>>()

  const alarmDialogRef = useRef<any>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)
  const taskListRef = useRef<TaskListHandle>(null)

  const [fetchTaskList, result] = useLazyFetchTaskListQuery()

  const [isLoading, setIsLoading] = useState(false)

  const getData = useCallback(
    (params: any = {}) => {
      fetchTaskList({
        condition: { receiveStatus: 0, selType: 'todo', type: 'case' },
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
      <Alarm
        isLoading={isLoading}
        title="已接收新警情"
        ref={alarmDialogRef}
        onLeftPress={async (data) => {
          setIsLoading(true)

          const { isSuccess } = await taskListRef.current?.updateTaskStatus('go')
          alarmDialogRef.current?.closeDialog()

          setIsLoading(false)

          if (isSuccess) {
            immediateDialogRef.current?.countDownStart()
            executeAfterDelay(() => {
              navigation.navigate('Scene', {
                data,
              })
            })
          }
        }}
        onRightPress={(data) => {
          makePhoneCall(data?.dataInfo?.bjdh)
        }}
      />
      <Immediate ref={immediateDialogRef} />
      <TaskList
        ref={taskListRef}
        getData={getData}
        result={result}
        onItemPress={async (_, item: any) => {
          alarmDialogRef?.current?.showDialog(item)

          const { isSuccess } = await taskListRef.current?.updateTaskStatus(
            'receive',
            item
          )
          if (isSuccess) {
            Toast.success('出警成功')
          }
          return
        }}
      />
    </Box>
  )
}
