import { Box, HStack, Link, VStack, Image, Text } from 'native-base'
import React from 'react'

import { Card, Icons } from '@/components'
import { TCard } from '../Home/components'
import { Tools, Settings } from './components'

export function My() {
  return (
    <Box flex={1}>
      <VStack>
        <Card paddingY={4}>
          <HStack>
            <Box>
              <Image
                source={require('@/assets/images/login-head.png')}
                size={'12'}
                resizeMode="contain"
                alt="icon"
              />
            </Box>

            <VStack ml={2} justifyContent={'space-between'} flex={1}>
              <HStack justifyContent={'space-between'} alignContent={'center'}>
                <HStack alignItems={'center'}>
                  <Text bold mr={2}>
                    陈晓晓
                  </Text>
                  <Text fontSize={'xs'} color={'#999999'}>
                    1203812038210038
                  </Text>
                </HStack>
                <HStack alignItems={'center'}>
                  {Icons.edit}
                  <Link
                    _text={{
                      color: '#266EFF',
                      bold: true,
                    }}>
                    编辑
                  </Link>
                </HStack>
              </HStack>

              <HStack justifyContent={'space-between'}>
                <Text color={'#999999'}>集宁区公安局-民警</Text>
                <Text color={'#999999'}>01919203</Text>
              </HStack>
            </VStack>
          </HStack>
        </Card>

        <TCard mt={4} title={'我的工具'}>
          <HStack justifyContent={'space-between'} mb={2}>
            <Tools tools={tools} />
          </HStack>
        </TCard>

        <TCard mt={4} title={'应用设置'} py={0} pt={4}>
          <Settings settings={settings} />
        </TCard>
      </VStack>
    </Box>
  )
}

const tools = [
  {
    title: '消息过滤器',
    id: 1,
    source: require('@/assets/images/my-contact.png'),
  },
  {
    title: '身份证识别',
    id: 2,
    source: require('@/assets/images/my-id.png'),
  },
  {
    title: '车辆查询',
    id: 3,
    source: require('@/assets/images/my-car.png'),
  },
]

const settings = [
  {
    title: '消息过滤器',
    id: 1,
    source: require('@/assets/icons/filter.png'),
  },
  {
    title: '修改密码',
    id: 2,
    source: require('@/assets/icons/key.png'),
  },
  {
    title: '检查更新',
    id: 3,
    source: require('@/assets/icons/refresh.png'),
  },
  {
    title: '意见反馈',
    id: 4,
    source: require('@/assets/icons/feedback.png'),
  },
  {
    title: '退出登录',
    id: 5,
    source: require('@/assets/icons/out.png'),
  },
]
