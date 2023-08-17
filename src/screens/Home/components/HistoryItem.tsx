import React from 'react'
import { Box } from 'native-base'

import { Button } from '@/components'
import { InfoCard, InfoHeader } from '@/components/home'

export function HistoryItem({ item, onPress }: { item: any; onPress: () => void }) {
  return (
    <Button isPressedStyle={false} isScale={true} scale={0.95} onPress={onPress}>
      <InfoCard
        Header={
          <InfoHeader
            data={{
              text: item?.address,
              title: item?.recType,
              date: item?.date,
              tags: [{ label: '处警规则' }, { label: '周边资源' }],
            }}
          />
        }
        isHeaderDivider={false}
      />
    </Button>
  )
}
