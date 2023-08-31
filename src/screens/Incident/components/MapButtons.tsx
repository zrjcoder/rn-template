import React from 'react'
import { HStack, Box, Center, Button, VStack, Text, Image } from 'native-base'
import { Button as BaseButton } from '@/components'

export function MapButtons({
  leftPress,
  centerPress,
  rightPress,
  isLoading,
}: {
  leftPress?: () => void
  centerPress?: () => void
  rightPress?: () => void
  isLoading?: boolean
}) {
  return (
    <Box
      bg={'#FFFFFF'}
      w={'100%'}
      h={'60px'}
      position={'absolute'}
      justifyContent={'center'}
      bottom={0}>
      <HStack justifyContent={'space-around'} mx={8}>
        <BaseButton onPress={leftPress}>
          <VStack size={10}>
            <Center>
              <Image
                size={'22px'}
                resizeMode="cover"
                source={require('@/assets/icons/phone.png')}
                alt="image"
              />
              <Text fontSize={'xs'}>联系报警人</Text>
            </Center>
          </VStack>
        </BaseButton>

        <Box size={10} width={'80px'}>
          <Button
            _pressed={{
              bg: `#256EFF99`,
            }}
            isLoading={isLoading}
            onPress={centerPress}
            alignItems={'center'}
            shadow={'8'}
            style={{
              shadowColor: '#256EFF',
            }}
            position={'absolute'}
            borderRadius={'full'}
            bg={'#266EFF'}
            bottom={0}
            size={'80px'}
            zIndex={100}>
            <Text fontSize={'lg'} color="#FFFFFF">
              到达
            </Text>
            <Text fontSize={'lg'} color="#FFFFFF">
              现场
            </Text>
          </Button>
        </Box>

        <BaseButton onPress={rightPress}>
          <VStack size={10}>
            <Center>
              <Image
                size={'24px'}
                resizeMode="cover"
                source={require('@/assets/icons/clock.png')}
                alt="image"
              />
              <Text fontSize={'xs'}>未到场处置</Text>
            </Center>
          </VStack>
        </BaseButton>
      </HStack>
    </Box>
  )
}
