import React from 'react'
import { View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Text } from 'native-base'

import { RootStackScreenProps } from '@/navigators/types'
import { useNavigation } from '@react-navigation/native'
import { useAuthorizeMutation } from '@/services'
import { UserState, setToken } from '@/store/user'
import { RButtonManager } from '@/components/Native/NButton/NButtonManager'

export function Login() {
  const navigation = useNavigation<RootStackScreenProps<'Login'>>()

  const [authorize, { isLoading, isError }] = useAuthorizeMutation()
  const user = useSelector((state: { user: UserState }) => state.user)
  const dispatch = useDispatch()

  if (isLoading) {
    return <Text>loading...</Text>
  }

  if (isError) {
    return <Text>error...</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Login" onPress={handleSubmit} />

      <Button
        title="dudu"
        onPress={() => {
          console.warn(user)
        }}
      />

      {/* <View style={{ backgroundColor: 'red', width: 100, height: 100 }}> */}
      <RButtonManager
        style={{
          height: 500,
          width: 200,
        }}
      />

      <Button
        title="dudu"
        onPress={() => {
          console.warn(user)
        }}
      />
    </View>
  )

  async function handleSubmit() {
    try {
      const result = await authorize({
        userName: 'admin',
        userPsw: '123456',
        verCode: '',
      })
      console.log(result)

      const { token, message } = (result as { data: any }).data
      console.log(token)
      if (token) {
        dispatch(setToken(token))

        navigation.navigate('MainTabs', {
          screen: 'Home',
          params: { name: 'Jane', id: 1 },
        })
      }

      return { token, message }
    } catch (err) {
      console.error('Login error:', err)
    }
  }
}
