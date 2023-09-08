import React from 'react'
import { Box, HStack, IBoxProps, Image, VStack } from 'native-base'
import { useSelector } from 'react-redux'
import { UserState } from '@/store/user'
import { Tag } from '@/components'

export function HomeInfo(props: IBoxProps) {
  const userInfo = useSelector((state: { user: UserState }) => state.user.userInfo)

  return (
    <VStack bg={'#266EFF'} pl={4} {...props}>
      <Box w={'full'} h={10} />

      <HStack h={'60px'}>
        <Image
          mr={2}
          source={require('@/assets/images/login-head.png')}
          size={'60px'}
          resizeMode="contain"
          alt="icon"
        />

        <VStack h={'60px'} justifyContent={'center'}>
          <Box
            mb={2}
            _text={{
              bold: true,
              fontSize: 'md',
              color: '#FFFFFF',
            }}>
            {`${userInfo.nickName} ${userInfo.userName}`}
          </Box>

          <HStack>
            <Tag bg={'#FFFFFF20'} text={userInfo.orgName} />
          </HStack>
        </VStack>
      </HStack>

      <Box w={'full'} h={8} />
    </VStack>
  )
}
