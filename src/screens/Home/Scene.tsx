import React from 'react'
import { Box, HStack, VStack, Text, Image, Center } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { Map, Button } from '@/components'
import { InfoCard, InfoHeader, InfoContent } from './components'

const data = {
  id: 1,
  report: '张三',
  recType: '扬言伤人',
  desc: '在集宁区哈尔西街与工农南路辅路交叉路，有人扬言要伤害他人。目前无人员受伤，请求出警',
  tel: '15623236209',
  date: '2022-12-14 10:20:23',
  address: '集宁区公安局',
  recAddress: '乌兰察布市集宁区察哈尔西街与工农南路辅路交叉路口往西南约280米',
  reportAddress: '乌兰察布市集宁区察哈尔西街与工农南路辅路交叉路口往西南约280米',
}

export function Scene() {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  return (
    <Box flex={1}>
      <Map />

      <Box position={'absolute'} top={0} width={'100%'}>
        <Center>
          <InfoCard
            isExpand
            isHeaderBar
            data={data}
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
