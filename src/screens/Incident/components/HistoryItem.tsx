import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { InfoCard, InfoHeader, TaskLevel } from '@/components/home'
import { useDisposalTask } from '../hooks'
import { safeFetch } from '@/util'
import { useLazyFetchTaskDetailQuery } from '@/services'
import { RootStackScreenProps } from '@/navigators/types'

export function HistoryItem({ item }: { item: any }) {
  const { updateType } = useDisposalTask(item)
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
            const jjdbh = item?.dispatchList[0]?.jjdbh ?? ''

            const { isSuccess, data } = await safeFetch(fetchTaskDetail, {
              jjdbh,
              type: 'self',
            })

            if (isSuccess) {
              navigation.navigate('Detail', {
                data,
              })
            }
          }}
          rightTag={{
            label: item?.feedBackStatus === 0 ? updateType?.label : '已处置',
            color: item?.feedBackStatus === 0 ? '#FF2200' : '#1BCC09',
          }}
          tag={TaskLevel[item?.jjdbGab?.jqdjdm]?.label}
          data={{
            title: item?.jjdbGab?.bjnr,
            text: item?.jjdbGab?.fjdw,
            date: item?.jjdbGab?.bjsj,
            ...item,
          }}
        />
      }
    />
  )
}
