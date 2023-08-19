import React from 'react'
import { Center, Image } from 'native-base'
import { Card, InfoBox } from '@/components'

export function Profile() {
  return (
    <Center>
      <Card pb={2}>
        <InfoBox
          isDivider={true}
          textStyle={{
            textAlign: 'right',
            paddingRight: 2,
            paddingY: 2,
          }}
          rightStyle={{
            alignItems: 'flex-end',
          }}
          data={data}
          info={info}
        />
      </Card>
    </Center>
  )
}

const info = {
  avatar: '头像',
  name: '姓名',
  phone: '手机号码',
  number: '警员编号',
  unit: '所在单位',
  position: '职位',
}

const data = {
  avatar: (
    <Image
      source={require('@/assets/images/login-head.png')}
      size={8}
      resizeMode="contain"
      alt="icon"
    />
  ),
  name: '陈晓晓',
  phone: '13269221111',
  number: '08234212',
  unit: '虎山区派出所',
  position: '民警',
}
