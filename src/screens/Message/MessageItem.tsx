import React from 'react'
import { InfoCard, InfoHeader } from '../Incident/components'
import { useLazyUpdateMessageQuery } from '@/services'
import { MessageTypes, type MessageTypeProps } from '@/store/user/value'
import { Toast } from '@/components'

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
  onPress: (item: MessageItemProps['item']) => void
}

export function MessageItem({ item, onPress }: MessageItemProps) {
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

  async function updateMessageStatus() {
    if (item?.readStatus === 1) {
      onPress(item)
      return
    }

    try {
      const result = await updateMessage({
        gid: item?.gid,
        readStatus: 1,
        remark: item?.remark,
      })

      const { resCode } = result?.data ?? {}
      if (resCode === '00000') {
        onPress(item)
      } else {
        Toast.error('更新状态失败')
      }
    } catch (error) {
      Toast.error('更新状态失败')
    }
  }
}
