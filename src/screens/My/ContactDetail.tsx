import React from 'react'
import { Box, HStack, IBoxProps, Image, VStack } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { TouchableNativeFeedback } from 'react-native'

import { MyTabsScreenProps } from '@/navigators/types'
import { Card, Icons, InfoBox } from '@/components'
import { TCard } from '../Incident/components'
import { makePhoneCall, makePhoneSMS } from '@/util'

export function ContactDetail() {
  const route = useRoute<MyTabsScreenProps<'ContactDetail'>['route']>()
  const data = route?.params?.data

  console.log(data)

  return (
    <VStack flex={1} bg={'#F7F8FA'}>
      <Card px={4} py={4} mt={10}>
        <Image
          position={'absolute'}
          top={'-25px'}
          left={4}
          source={require('@/assets/icons/head.png')}
          size={'50px'}
          resizeMode="contain"
          alt="icon"
        />
        <VStack mt={4}>
          <Box
            _text={{
              fontSize: 'md',
              bold: true,
            }}
            mb={4}>
            {data?.nickName}
          </Box>

          <HStack>
            <Item
              title="拨打电话"
              onPress={() => {
                makePhoneCall(data?.tel)
              }}
              icon={Icons.phone}
              mr={2}
            />
            <Item
              title="发送短信"
              onPress={() => {
                makePhoneSMS(data?.tel)
              }}
              icon={Icons.messageLight}
            />
          </HStack>
        </VStack>
      </Card>

      <TCard title="基本信息" pb={0}>
        <InfoBox
          isDivider={true}
          data={{
            tel: data?.tel ?? '暂无',
            userName: data?.userName ?? '暂无',
            orgName: data?.orgName ?? '暂无',
            projectInfo: data?.projectInfo ?? '暂无',
          }}
          info={{
            tel: '手机号码',
            userName: '警员编号',
            orgName: '所在单位',
            projectInfo: '职        位',
          }}
        />
      </TCard>
    </VStack>
  )
}

function Item({
  title,
  onPress,
  icon,
  ...props
}: {
  title: string
  onPress: () => void
  icon: JSX.Element
} & IBoxProps) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <HStack
        px={3}
        py={'10px'}
        flex={1}
        borderRadius={3}
        bg={'#F2F6FF'}
        justifyContent={'space-between'}
        alignItems={'center'}
        {...props}>
        <Box>{title}</Box>
        {icon}
      </HStack>
    </TouchableNativeFeedback>
  )
}
