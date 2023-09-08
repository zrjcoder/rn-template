import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { InfoCard, InfoHeader } from '../Incident/components'
import { useLazyUpdateMessageQuery } from '@/services'
import { MessageTypes, type MessageTypeProps } from '@/store/user/value'
import { Toast } from '@/components'
import { RootStackScreenProps } from '@/navigators/types'

export type MessageItemProps = {
  item: {
    msgType: MessageTypeProps['code']
    msgContent: string
    msgTitle: string
    createTime: string
    readStatus: number
    gid: string
    remark: string
  }
  onPress: () => void
}

export function MessageItem({ item, onPress }: MessageItemProps) {
  const navigation = useNavigation<RootStackScreenProps<'Detail'>>()

  const [updateMessage, { isFetching }] = useLazyUpdateMessageQuery()

  const tag = MessageTypes.filter((i) => i.code === item?.msgType)[0]?.value ?? ''

  return (
    <InfoCard
      isHeaderDivider={false}
      Header={
        <InfoHeader
          isLoading={isFetching}
          onPress={updateMessageStatus}
          rightTag={{
            label: item?.readStatus === 0 ? '未读' : '已读',
            color: item?.readStatus === 0 ? '#FF2200' : '#266EFF',
          }}
          tag={tag as string}
          data={{
            text: item?.msgContent,
            title: item?.msgTitle,
            date: item?.createTime,
            ...item,
          }}
        />
      }
    />
  )

  function updateMessageStatus() {
    onPress()

    navigation.navigate('Detail', {
      data: item,
    })

    // 未读
    if (item?.readStatus === 0) {
      try {
        updateMessage({
          gid: item?.gid,
          readStatus: 1,
          remark: item?.remark,
        })
      } catch (error) {
        Toast.error('更新状态失败')
      }
    }
  }
}
