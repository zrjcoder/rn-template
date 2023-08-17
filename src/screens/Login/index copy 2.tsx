import React from 'react'
import { Box } from 'native-base'

import { RButtonManager } from '@/components/Native/NButton/NButtonManager'

export function Login() {
  return (
    <Box flex={1}>
      <RButtonManager
        style={{
          flex: 1,
        }}
      />
    </Box>
  )
}
