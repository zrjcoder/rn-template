/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { FlatList, type FlatListHandle, type DialogHandle, Toast } from '@/components'
import {
  useUpdateTaskMutation,
  useLazyFetchTaskListQuery,
  type PoliceTypeProps,
} from '@/services'
import { IncidentItem, CenterButton } from '../components'
import { convertIncidentDataToShow, executeAfterDelay } from '@/util'
import { Alarm, Immediate, type ImmediateResHandle } from '../components/Dialog'

type IncidentListProps = {
  tab: number
  condition: {
    receiveStatus: number
    selType: string
  }
}

export const IncidentList = ({ tab, condition }: IncidentListProps) => {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  const listRef = useRef<FlatListHandle>(null)
  const alarmDialogRef = useRef<DialogHandle>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)

  const [fetchTaskList, { data, isFetching }] = useLazyFetchTaskListQuery()
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box flex={1} bg="#F5F7F9">
      <Alarm
        ref={alarmDialogRef}
        onLeftPress={() => {
          alarmDialogRef.current?.closeDialog()
          immediateDialogRef.current?.countDownStart()
        }}
        onRightPress={() => {}}
      />
      <Immediate ref={immediateDialogRef} />

      <FlatList
        ref={listRef}
        isFetching={isFetching}
        data={data?.data?.list ?? []}
        onRefresh={() => {
          getData()
        }}
        renderItem={({ item }) => (
          <IncidentItem
            item={convertIncidentDataToShow(item)}
            leftPress={() => {}}
            centerButton={
              <CenterButton
                isLoading={isLoading}
                isLoadingText="出警中..."
                onPress={() => handlePress(item)}>
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

  function getData() {
    let params = {
      condition: {},
    }
    params.condition = condition

    fetchTaskList(params)
  }

  async function handlePress(item: any) {
    try {
      const result = await updateTask({
        id: item?.dispatchList[0]?.gid,
        code: item?.dispatchList[0]?.jjdbh,
        updateType: 'receive',
      })
      console.log(item)

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

type tabDataProps = {
  type: PoliceTypeProps
  buttonText: string
  buttonLoadingText: string
}

function getDataFromTabAndPoliceType(tabIndex: number, type: PoliceTypeProps) {
  const tabData: any = {
    // 未接案件
    0: {
      receive: {
        buttonText: '立即接警',
        buttonLoadingText: '接警中...',
        type: 'receive',
      },
    },
    // 正在进行案件
    1: {
      unGo: {
        type: 'unGo',
        buttonText: '立即出警',
        buttonLoadingText: '出警中...',
      },
      go: {
        type: 'go',
        buttonText: '进行中',
        buttonLoadingText: '出警中...',
      },
    },
  }

  // const data = tabData[tabIndex][type] ?? {}
}
