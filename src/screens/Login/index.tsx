import React from 'react'
import { View, Text, Button, NativeModules } from 'react-native'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootStackScreenProps } from '@/navigators/types'
import { useLazyFetchOneQuery } from '@/services'

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
})

export function Login(props: RootStackScreenProps<'Login'>) {
  const [fetchOne, { data, isLoading }] = useLazyFetchOneQuery()

  console.log(data, isLoading)

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

      <Button
        title="dudu"
        onPress={() => {
          NativeModules.ToastExample.show('dudu', NativeModules.ToastExample.SHORT)
          NativeModules.ToastExample.showLocation()
        }}
      />
    </View>
  )
}
