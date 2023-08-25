import React from 'react'
import { Box, VStack } from 'native-base'
import { InfoCard, InfoHeader, TCard } from '@/components/home'

export function TogetherFeedback() {
  return (
    <InfoCard
      Header={
        <InfoHeader
          data={{
            text: '信息来源：情指中心',
            title: '智能预警指令名称',
            date: '2022-12-14 10:20:31',
          }}
        />
      }
      Content={
        <VStack>
          <TCard title="协助信息">
            <Box>dudu</Box>
          </TCard>

          <TCard title="事件信息">
            <Box>dudu</Box>
          </TCard>

          <TCard title="领导批阅">
            <Box>dudu</Box>
          </TCard>
        </VStack>
      }
    />
  )
}
