import React from 'react'
import { Box, Button, HStack, Text, VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { HomeInfo, TaskBanner, QuickAccess } from './components'
import { useFetchTaskListQuery } from '@/services'
import { Tag } from '@/components'
import { UserState } from '@/store/user'

let ws = null

export function Home() {
  const { data: taskData } = useFetchTaskListQuery({
    condition: { type: 'case' },
    pageSize: 3,
  })
  const { data: orderData } = useFetchTaskListQuery({
    condition: { type: 'warn' },
    pageSize: 3,
  })

  const token = useSelector((state: { user: UserState }) => state.user.token)

  React.useEffect(() => {
    ws = new WebSocket(`http://172.19.46.100:18805/auth/service/websocket/${token}`)

    ws.addEventListener('close', (event) => {
      console.log('close: ', event)
    })

    ws.addEventListener('open', () => {})

    ws.addEventListener('error', (event) => {
      console.log('error: ', event)
    })
    ws.addEventListener('message', (event) => {
      console.log('message: ', event)
    })
  }, [token])

  return (
    <VStack flex={1}>
      <HomeInfo />

      <Box borderTopRadius={4} bg={'#F7F8FA'} flex={1} marginTop={-2}>
        <TaskBanner
          taskList={taskData?.data?.list ?? []}
          orderList={orderData?.data?.list ?? []}
        />

        <Box my={2} />

        <QuickAccess />

        <Button
          onPress={() => {
            console.log(ws.readyState)
          }}>
          dudu
        </Button>
      </Box>
    </VStack>
  )
}
