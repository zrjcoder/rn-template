import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { HStack, Box, Spinner } from 'native-base'

export function FormSubmit({
  title = '提交',
  isLoading,
  onPress,
}: {
  title?: string
  isLoading?: boolean
  onPress?: () => void
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <HStack alignItems={'center'}>
        {isLoading && <Spinner color={'emerald.500'} />}
        <Box
          ml={1}
          _text={{
            color: '#FFFFFF',
            fontSize: 'sm',
          }}>
          {isLoading ? `${{ title }}中...` : title}
        </Box>
      </HStack>
    </TouchableNativeFeedback>
  )
}
