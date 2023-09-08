import React from 'react'
import { Box, HStack, Center, Image, IBoxProps } from 'native-base'
import { Card, InfoBox } from '@/components'

export type OrderBoxProps = {
  title?: string
  person?: { gender: string; name: string }
  children?: JSX.Element
  data: Record<string, any>
  info: Record<string, string>
} & IBoxProps

export function OrderBox({
  data,
  info,
  title,
  children,
  person,
  ...props
}: OrderBoxProps) {
  return (
    <Card style={{}} bg={'#E6EEFF'} py={4} {...props}>
      {title && <Title title={title} />}
      {person && <Person person={person} />}

      <InfoBox leftWidth={'30%'} rightWidth="70%" data={data} info={info} />

      {children}
    </Card>
  )
}

function Title({ title }: { title: string }) {
  return (
    <Center flexDirection={'row'} flex={1}>
      <Image
        flex={1}
        source={require('@/assets/images/order-card-left.png')}
        resizeMode="contain"
        alt="icon"
      />
      <Box
        _text={{
          color: '#276FFF',
          fontWeight: 'bold',
        }}
        mx={2}>
        {title}
      </Box>
      <Image
        flex={1}
        source={require('@/assets/images/order-card-right.png')}
        resizeMode="contain"
        alt="icon"
      />
    </Center>
  )
}

function Person({ person }: { person: { name: string; gender: string } }) {
  const { name, gender } = person
  return (
    <HStack justifyContent={'space-between'}>
      <Box
        _text={{
          fontWeight: 'bold',
          fontSize: 'md',
          color: '#333333',
        }}>
        {name}
      </Box>
      <Box
        _text={{
          fontWeight: 'bold',
          color: gender === '男' ? '#276FFF' : '#FF6C6C',
        }}>
        {gender === '男' ? '♂ 男' : '♀ 女'}
      </Box>
    </HStack>
  )
}
