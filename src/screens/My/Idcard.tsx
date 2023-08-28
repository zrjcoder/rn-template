import React from 'react'
import { Center, Image, Text, VStack } from 'native-base'
import { TCard } from '../Incident/components'
import { FormInput } from '@/components'
import Lottie from 'lottie-react-native'

export function Idcard() {
  return (
    <Center>
      <TCard title="手动识别">
        <FormInput title="姓        名" placeholder="请输入姓名" />
        <FormInput title="身份证号" placeholder="请输入身份证号" />
      </TCard>

      <TCard title="扫描识别">
        <Image
          position={'absolute'}
          w={'100%'}
          h={'200px'}
          mt={4}
          source={require('@/assets/images/my-idcard.png')}
          resizeMode="contain"
          alt="身份证人像面"
        />

        <Center w={'100%'} h={'200px'} mt={4}>
          <Lottie
            style={{
              position: 'absolute',
              width: '100%',
            }}
            autoPlay
            source={require('@/assets/lottie/scan.json')}
            loop
          />
          <VStack alignItems={'center'}>
            <Center>
              <Image
                mt={2}
                size={20}
                source={require('@/assets/images/my-scan.png')}
                resizeMode="contain"
                alt="身份证人像面"
              />
            </Center>

            <Text bold fontSize={'md'} color={'#0C69F9'}>
              点击扫描身份证人像面
            </Text>
          </VStack>
        </Center>
      </TCard>
    </Center>
  )
}
