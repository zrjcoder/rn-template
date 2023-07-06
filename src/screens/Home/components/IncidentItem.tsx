import React from 'react'
import { FooterButtons, InfoCard, InfoHeader, InfoContent } from './index'

export function IncidentItem({
  item,
  rightPress,
  centerPress,
  leftPress,
}: {
  item: any
  rightPress: () => void
  centerPress: () => void
  leftPress: () => void
}) {
  return (
    <InfoCard
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
          data={item}
          info={{
            tel: '联系电话',
            recAddress: '接警地址',
            reportAddress: '报警人定位',
          }}
          desc={{
            name: '报警内容',
            value: item?.desc,
          }}
        />
      }
      Footer={
        <FooterButtons
          mt={6}
          mb={5}
          rightPress={rightPress}
          centerPress={centerPress}
          leftPress={leftPress}
        />
      }
    />
  )
}
