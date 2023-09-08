import { Box, HStack, VStack } from 'native-base'
import React from 'react'

import { TCard } from '../Incident/components'
import {
  Tools,
  Settings,
  MyUserInfo,
  type SettingProps,
  type ToolProps,
} from './components'

export function My() {
  return (
    <Box flex={1}>
      <VStack>
        <MyUserInfo />

        <TCard mt={4} title={'我的工具'}>
          <HStack justifyContent={'space-between'} mb={2}>
            <Tools tools={tools as ToolProps[]} />
          </HStack>
        </TCard>

        <TCard mt={4} title={'应用设置'} py={0} pt={4}>
          <Settings settings={settings as SettingProps[]} />
        </TCard>
      </VStack>
    </Box>
  )
}

const tools = [
  {
    title: '警务通讯录',
    route: 'Contact',
    source: require('@/assets/images/my-contact.png'),
  },
  {
    title: '身份证识别',
    route: 'Idcard',
    source: require('@/assets/images/my-id.png'),
  },
  {
    title: '车辆查询',
    route: 'Car',
    source: require('@/assets/images/my-car.png'),
  },
]

const settings = [
  {
    title: '消息过滤器',
    route: 'Filter',
    source: require('@/assets/icons/filter.png'),
  },
  {
    title: '修改密码',
    route: 'Password',
    source: require('@/assets/icons/key.png'),
  },
  {
    title: '检查更新',
    route: 'Update',
    source: require('@/assets/icons/refresh.png'),
  },
  {
    title: '意见反馈',
    route: 'Feedback',
    source: require('@/assets/icons/feedback.png'),
  },
  {
    title: '退出登录',
    route: 'Logout',
    source: require('@/assets/icons/out.png'),
  },
]
