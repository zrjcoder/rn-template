import React from 'react'
import { StatusBar } from 'react-native'
import { Box, HStack } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

import { header_colors } from '@/util/color'

export function Header(params: NativeStackHeaderProps) {
  const options = params?.options

  return (
    <LinearGradient
      colors={header_colors} // 渐变色数组
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        paddingTop: StatusBar.currentHeight,
      }}>
      <HStack
        h={'40px'}
        borderBottomColor={'red.100'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Box alignItems={'flex-start'} flex={1}>
          {options?.headerLeft && (
            <Box ml={4}>
              {options?.headerLeft({
                canGoBack: true,
              })}
            </Box>
          )}
        </Box>

        <Box
          flex={1}
          _text={{
            color: '#fff',
            fontSize: '17px',
            textAlign: 'center',
          }}>
          {options?.headerTitle ?? '标题'}
        </Box>

        <Box alignItems={'flex-end'} flex={1}>
          {options?.headerRight && (
            <Box mr={4}>
              {options?.headerRight({
                canGoBack: true,
              })}
            </Box>
          )}
        </Box>
      </HStack>
    </LinearGradient>
  )
}

// rightButton 例子
// React.useLayoutEffect(() => {
//   data?.feedBackStatus === 0 &&
//     navigation.setOptions({
//       headerRight: () => (
//         <SubmitButton title={updateType?.label} onPress={handleDisposal} />
//       ),
//     })
// }, [navigation, data?.feedBackStatus, handleDisposal])
