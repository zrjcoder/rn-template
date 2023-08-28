import React from 'react'
import { Box, IBoxProps, Spinner } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableNativeFeedback } from 'react-native'
import { StyleProp, ViewStyle, useWindowDimensions } from 'react-native'

import { colors } from '@/util'

export type TBoxProps = {
  status?: number
  isLoading?: boolean
  onPress?: Function
  rightTag?: {
    label: string
    color: string
  }
  style?: StyleProp<ViewStyle>
} & IBoxProps

export function TBox({
  isLoading,
  children,
  onPress,
  status = 3,
  rightTag,
  style = {},
  ...props
}: TBoxProps) {
  const width = useWindowDimensions().width

  return (
    <LinearGradient
      colors={colors(status)}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={style}>
      <TouchableNativeFeedback
        onPress={() => {
          onPress && onPress()
        }}>
        <Box
          overflow={'hidden'}
          {...props}
          bg={isLoading ? 'rgba(0, 0, 0, 0.1)' : 'transparent'}
          justifyContent={'center'}>
          {children}

          {rightTag && (
            <Box
              bg={rightTag.color}
              w={'90px'}
              py={1}
              style={{
                transform: [{ rotate: '45deg' }],
                elevation: 12,
                shadowColor: `${rightTag.color}`,
              }}
              _text={{
                textAlign: 'center',
                fontSize: 'xs',
                color: '#FFFFFF',
              }}
              position={'absolute'}
              right={-25}
              top={2}>
              {rightTag?.label}
            </Box>
          )}

          {isLoading && (
            <Spinner position={'absolute'} size={'sm'} left={width / 2 - 20} />
          )}
        </Box>
      </TouchableNativeFeedback>
    </LinearGradient>
  )
}
