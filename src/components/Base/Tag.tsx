import React from 'react'
import { Box, IPressableProps } from 'native-base'

import { Button } from '@/components'

type TagProps = {
  text: string
  onPress?: () => void
}

export function Tag({ text, onPress, ...props }: TagProps & IPressableProps) {
  return (
    <Button
      bg="#266EFF"
      borderRadius="sm"
      px={1}
      onPress={onPress}
      _pressed={onPress ? { bg: 'blue.200' } : {}}
      {...props}>
      <Box _text={{ color: 'white', fontSize: 'xs' }}>{text}</Box>
    </Button>
  )
}
