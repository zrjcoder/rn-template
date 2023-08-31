import React, { useEffect } from 'react'
import { useUpdateTaskMutation } from '@/services'
import { safeFetch } from '@/util'

export function useDisposalTask(data: { gid: string; status: number; jjdbh: string }) {
  const type = getTypeFromStatus(data?.status)

  const [updateType, setUpdateType] = React.useState<TaskType>(type)
  const [isLoading, setIsLoading] = React.useState(false)
  const [update] = useUpdateTaskMutation()

  useEffect(() => {
    const type = getTypeFromStatus(data?.status)
    setUpdateType(type)
  }, [data?.status])

  return {
    isLoading,
    updateType,
    updateTask,
  }

  async function updateTask() {
    setIsLoading(true)

    const { isSuccess } = await safeFetch(update, {
      id: data?.gid,
      code: data?.jjdbh,
      updateType: updateType?.type,
    })

    setIsLoading(false)

    if (isSuccess) {
      const nextType = getTypeFromStatus(data?.status + 1)
      setUpdateType(nextType)
    }

    return {
      isSuccess,
      data,
    }
  }
}

export function getTypeFromStatus(status: number): TaskType {
  return [0, 1, 2].includes(status)
    ? taskTypes[status]
    : { type: 'feedback', label: '未反馈' }
}

export type TaskTypesProps = {
  [key: number]: TaskType
}

export type TaskType = {
  type: 'receive' | 'go' | 'reach' | 'feedback'
  label: string
}

const taskTypes: TaskTypesProps = {
  0: {
    type: 'receive',
    label: '接警中',
  },
  1: {
    type: 'go',
    label: '出警中',
  },
  2: {
    type: 'reach',
    label: '已到场',
  },
}

// "updateType": "reach"// receive 接警 ，go 出警，unGo 取消出警，reach 到场
// receiveStatus接警，goStatus出警，reachStatus到场，feedBackStatus反馈
// 状态 0 未接警 1接警 2出警 3到场 4 反馈
