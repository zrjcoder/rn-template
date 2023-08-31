import { TouchableNativeFeedback } from 'react-native'
import { Box, HStack, Link, VStack, Image, Text } from 'native-base'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Card, Icons } from '@/components'
import { TCard } from '../Incident/components'
import { Tools, Settings, type SettingProps, type ToolProps } from './components'
import { type RootStackScreenProps } from '@/navigators/types'

export function My() {
  const navigation = useNavigation<RootStackScreenProps<'Profile'>>()

  return (
    <Box flex={1}>
      <VStack>
        <PersonInfo
          onPress={() => {
            navigation.navigate('Profile')
          }}
        />

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

function PersonInfo({ onPress }: { onPress: () => void }) {
  return (
    <Card px={0} py={0}>
      <TouchableNativeFeedback onPress={onPress}>
        <HStack p={4}>
          <Image
            source={require('@/assets/images/login-head.png')}
            size={'12'}
            alt="icon"
            ml={-2}
          />

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
      </TouchableNativeFeedback>
    </Card>
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
