import React from 'react'
import { Box, Center, Image } from 'native-base'
import { Card, InfoBox } from '@/components'
import { useRoute } from '@react-navigation/native'
import { MyTabsScreenProps } from '@/navigators/types'

export function Profile() {
  const route = useRoute<MyTabsScreenProps<'Profile'>['route']>()

  const userInfo = route.params

  return (
    <Center>
      <Card pb={2}>
        <InfoBox
          isDivider={true}
          otherRightWidth={'75%'}
          textStyle={{
            paddingRight: 2,
            paddingY: 2,
          }}
          rightStyle={{
            alignItems: 'flex-end',
          }}
          data={{
            ...userInfo,
            avatar: (
              <Image
                source={require('@/assets/images/login-head.png')}
                size={8}
                resizeMode="contain"
                alt="icon"
              />
            ),
          }}
          info={info}
        />
      </Card>
    </Center>
  )
}

const info = {
  avatar: '头像',
  nickName: '姓名',
  tel: '手机号码',
  userName: '警员编号',
  orgName: '所在单位',
  position: '职位',
}
