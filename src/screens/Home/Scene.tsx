import React from 'react'
import { Box, HStack, VStack, Text, Image, Center } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'

import { RootStackScreenProps, IncidentTabsScreenProps } from '@/navigators/types'
import { Map, Button } from '@/components'
import { InfoCard, InfoHeader, InfoContent } from './components'

export function Scene() {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()
  const route = useRoute<IncidentTabsScreenProps<'Scene'>['route']>()
  const data = route?.params?.data ?? {}

  return (
    <Box flex={1}>
      <Map />

      <Box position={'absolute'} top={0} width={'100%'}>
        <Center>
          <InfoCard
            isExpand
            isHeaderBar
            Header={
              <InfoHeader
                data={{
                  ...data,
                  text: data?.address,
                  title: data?.recType,
                  date: data?.date,
                  tags: [{ label: '处警规则' }, { label: '周边资源' }],
                }}
              />
            }
            Content={
              <InfoContent
                data={data}
                info={{
                  tel: '联系电话',
                  recAddress: '接警地址',
                  reportAddress: '报警人定位',
                }}
                desc={{
                  name: '报警内容',
                  value: data?.desc,
                }}
              />
            }
          />
        </Center>
      </Box>

      <BottomButtons
        leftPress={() => {}}
        centerPress={() => {
          navigation.navigate('IncidentTabs', {
            screen: 'Case',
          })
        }}
        rightPress={() => {}}
      />
    </Box>
  )
}

function BottomButtons({ leftPress, centerPress, rightPress }: any) {
  return (
    <Box
      bg={'#FFFFFF'}
      w={'100%'}
      h={'60px'}
      position={'absolute'}
      justifyContent={'center'}
      bottom={0}>
      <HStack justifyContent={'space-around'} mx={8}>
        <Button onPress={leftPress}>
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
        </Button>

        <Box size={10} width={'80px'}>
          <Button onPress={centerPress} isScale alignItems={'center'}>
            <Box
              shadow={'8'}
              style={{
                shadowColor: '#256EFF',
              }}
              position={'absolute'}
              borderRadius={'full'}
              bg={'#266EFF'}
              size={'80px'}
              zIndex={100}
              bottom={'-30px'}
              left={'-40px'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={'lg'} color="#FFFFFF">
                到达
              </Text>
              <Text fontSize={'lg'} color="#FFFFFF">
                现场
              </Text>
            </Box>
          </Button>
        </Box>
        <Button onPress={rightPress}>
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
        </Button>
      </HStack>
    </Box>
  )
}
