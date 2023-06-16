import React from 'react'
import { View, Text, Button } from 'react-native'
import { RootStackScreenProps } from '@/navigators/types'

export function Login(props: RootStackScreenProps<'Login'>) {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Login"
        onPress={() => {
          props.navigation.navigate('MainTabs', {
            screen: 'Home',
            params: { name: 'Jane', id: 1 },
          })
        }}
      />
    </View>
  )
}
