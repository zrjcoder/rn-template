import React from 'react'
import { Text } from 'native-base'
import { TabBar } from 'react-native-tab-view'
import { useWindowDimensions } from 'react-native'

export function DefaultTabBar(props: any) {
  const layout = useWindowDimensions()

  return (
    <TabBar
      {...props}
      style={{
        backgroundColor: '#ffffff',
      }}
      renderLabel={({ route, focused }) => (
        <Text
          fontWeight={focused ? 'medium' : 'normal'}
          color={focused ? '#266EFF' : '#666666'}>
          {route.title}
        </Text>
      )}
      contentContainerStyle={{
        marginTop: -5,
        marginBottom: -4,
      }}
      indicatorStyle={{
        backgroundColor: '#266EFF',
        width: 40,
        height: 3,
        borderRadius: 5,
        left: (layout.width / 3 - 40) / 2,
      }}
    />
  )
}
