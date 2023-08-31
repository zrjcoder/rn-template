import React from 'react'
import { FooterButtons, InfoCard, InfoHeader, InfoContent } from './index'

export function TaskItem({
  item,
  rightPress,
  centerButton,
  leftPress,
}: {
  item: any
  rightPress: () => void
  centerButton: React.ReactNode
  leftPress: () => void
}) {
  return (
    <InfoCard
      style={{}}
      shadow={4}
      Header={
        <InfoHeader
          data={{
            text: item?.address,
            title: item?.recType,
            date: item?.date,
            tags: [{ label: '处警规则' }, { label: '周边资源' }],
            ...item,
          }}
        />
      }
      Content={
        <InfoContent
          status={3}
          data={item}
          info={{
            tel: '联系电话',
            recAddress: '接警地址',
            reportAddress: '报警人定位',
          }}
          desc={{
            name: '报 警 描 述：',
            value: item?.desc,
          }}
        />
      }
      Footer={
        <FooterButtons
          status={3}
          pt={6}
          pb={5}
          px={3}
          rightPress={rightPress}
          centerButton={centerButton}
          leftPress={leftPress}
        />
      }
    />
  )
}

export type TaskLevelProps = {
  label: string
  status: number
}

export const TaskLevel: any = {
  '01': {
    label: '一级',
    code: 0,
  },
  '02': {
    label: '二级',
    code: 1,
  },
  '03': {
    label: '三级',
    code: 2,
  },
  '04': {
    label: '四级',
    code: 3,
  },
}
