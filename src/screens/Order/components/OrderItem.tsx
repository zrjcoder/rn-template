import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { InfoCard, InfoHeader, TaskLevel } from '@/components/home'
import { safeFetch } from '@/util'
import { useLazyFetchTaskDetailQuery } from '@/services'
import { RootStackScreenProps } from '@/navigators/types'

export function OrderItem({ item }: { item: any }) {
  const [fetchTaskDetail, { isFetching }] = useLazyFetchTaskDetailQuery()

  const navigation = useNavigation<RootStackScreenProps<'Detail'>>()

  return (
    <InfoCard
      isHeaderDivider={false}
      Header={
        <InfoHeader
          isLoading={isFetching}
          status={TaskLevel[item?.jjdbGab?.jqdjdm]?.code}
          onPress={async () => {
            switch (item?.type) {
              // 重点人员
              case 'warn':
                navigation.navigate('PersonnelReceive', {
                  data: item,
                })
                break
              // 在逃人员
              case 'escapee':
                navigation.navigate('PersonnelReceive', {
                  data: item,
                })
                break
            }
            return
          }}
          // rightTag={{
          //   // label: item?.feedBackStatus === 0 ? updateType?.label : '已处置',
          //   // color: item?.feedBackStatus === 0 ? '#FF2200' : '#1BCC09',
          // }}
          tag={
            item?.type === 'warn'
              ? '重点人预警'
              : item?.type === 'escapee'
              ? '在逃人员预警'
              : '合成组织'
          }
          data={{
            title: item?.jjdbGab?.bjnr ?? '暂无',
            text: '信息来源: 技侦部门',
            date: item?.createTime,
            ...item,
          }}
        />
      }
    />
  )
}
