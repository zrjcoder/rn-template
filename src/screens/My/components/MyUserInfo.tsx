import { TouchableNativeFeedback } from 'react-native'
import { HStack, Link, VStack, Image, Text } from 'native-base'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { Card, Icons } from '@/components'
import { type RootStackScreenProps } from '@/navigators/types'
import { UserState } from '@/store/user'

export function MyUserInfo() {
  const navigation = useNavigation<RootStackScreenProps<'Profile'>>()
  let userInfo = useSelector((state: { user: UserState }) => state.user.userInfo)

  return (
    <Card px={0} py={0}>
      <TouchableNativeFeedback onPress={handleClick}>
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
                  {userInfo.nickName}
                </Text>
                <Text fontSize={'xs'} color={'#999999'}>
                  {userInfo.tel}
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
              <Text color={'#999999'}>{userInfo.orgName}</Text>
              <Text color={'#999999'}>{userInfo.userName}</Text>
            </HStack>
          </VStack>
        </HStack>
      </TouchableNativeFeedback>
    </Card>
  )

  function handleClick() {
    navigation.navigate('Profile', userInfo)
  }
}
