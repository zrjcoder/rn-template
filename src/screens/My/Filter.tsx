import React from 'react'
import { Box } from 'native-base'
import {
  NativeEventEmitter,
  NativeModules,
  UIManager,
  DeviceEventEmitter,
  findNodeHandle,
} from 'react-native'

import { MessageFilter } from '@/components'

const filterListData = [
  {
    code: 'Unread',
    value: '未读',
    type: 'item',
    isShow: true,
  },
  {
    code: 'Read',
    value: '已读',
    type: 'item',
    isShow: true,
  },
  {
    code: 'Alarm',
    value: '警情',
    type: 'item',
    isShow: true,
  },
  {
    code: 'SynthesizedCommand',
    value: '合成命令',
    type: 'item',
    isShow: true,
  },
  {
    code: 'MeetingNotice',
    value: '会议通知',
    type: 'item',
    isShow: true,
  },
  {
    code: 'KeyPersonnel',
    value: '重点人员',
    type: 'item',
    isShow: true,
  },
  {
    code: 'Fugitive',
    value: '在逃人员',
    type: 'item',
    isShow: true,
  },
  {
    code: 'IntelligentWarning',
    value: '智能预警',
    type: 'item',
    isShow: true,
  },
  {
    code: 'SynthesizedFeedback',
    value: '合成反馈',
    type: 'item',
    isShow: true,
  },
  {
    code: 'SynthesizedInstruction',
    value: '合成指令',
    type: 'item',
    isShow: true,
  },
  {
    code: 'LeadershipApproval',
    value: '领导批阅',
    type: 'item',
    isShow: true,
  },
  {
    code: 'Hide',
    value: '隐藏',
    type: 'title',
    isShow: true,
  },
]

let event = null

export function Filter() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    // const onDrop = nativeEventEmitter.addListener('onDrop', (data) => {
    //   console.log('data: ', data)
    // })
    const viewId = findNodeHandle(ref.current)
    UIManager.dispatchViewManagerCommand(
      viewId,
      UIManager.MessageFilter.Commands.onDrop.toString(),
      [viewId]
    )

    DeviceEventEmitter.addListener('onDrop', (e) => {
      console.log('event: ', e)
    })
    DeviceEventEmitter.addListener('dudu', (e) => {
      console.log('event: ', e)
    })
  }, [])

  return (
    <Box flex={1}>
      <MessageFilter
        ref={ref}
        style={{
          flex: 1,
        }}
        data={filterListData}
        onDrop={(data) => {
          MessageFilter.invoke('onDrop', 'dudu')
        }}
      />
    </Box>
  )
}
