import React from 'react'
import { Box, Text } from 'native-base'

import { TabBar, TabBarProps } from 'react-native-tab-view'

export function TabBarHeader({ width, ...props }: { width: number } & TabBarProps<any>) {
  return (
    <Box shadow={0} borderTopRadius={5}>
      <TabBar
        {...props}
        style={{
          backgroundColor: '#ffffff',
          shadowColor: '#ffffff',
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
          left: (width / 4 - 40) / 2,
        }}
        tabStyle={{
          width: width / 4,
          padding: 0,
          marginVertical: 2,
        }}
      />
    </Box>
  )
}
