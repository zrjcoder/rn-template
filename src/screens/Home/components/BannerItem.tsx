import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'native-base'

import { RootStackScreenProps } from '@/navigators/types'
import { InfoCard, InfoHeader, TaskLevel } from '@/components/home'

export function BannerItem({ item }: { item: any }) {
  const navigation = useNavigation<RootStackScreenProps<'Detail'>>()
  return (
    <InfoCard
      isHeaderDivider={false}
      Header={
        <InfoHeader
          status={TaskLevel[item?.jjdbGab?.jqdjdm]?.code}
          onPress={async () => {
            navigation.navigate('Detail', {
              data: item,
            })
          }}
          rightTag={{
            label: TaskLevel[item?.jjdbGab?.jqdjdm]?.label,
            color: '#266EFF',
          }}
          data={{
            title: item?.jjdbGab?.bjnr,
            content: <Text numberOfLines={2}>{item?.jjdbGab?.bjnr}</Text>,
            text: `派发时间：${item?.createTime}`,
            date: (
              <Text fontSize={'xs'} color={'#266EFF'}>
                立即查看
              </Text>
            ),
            ...item,
          }}
        />
      }
    />
  )
}
