import React from 'react'
import { Box } from 'native-base'
import Lottie from 'lottie-react-native'

export function Error() {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Lottie
        style={{
          marginBottom: 150,
          height: 300,
          width: 300,
        }}
        autoPlay
        source={require('@/assets/lottie/error.json')}
        loop
        // ref={animationRef}
      />
    </Box>
  )
}
