import React from 'react'
import { Box, VStack, HStack, IBoxProps } from 'native-base'

import { Tag, type DialogHandle } from '@/components'
import { CardReport } from './Dialog'

export function InfoReport({
  title = '报  警  人：',
  value,
  ...props
}: { title?: String; value?: String } & IBoxProps) {
  const refDialog = React.useRef<DialogHandle>(null)

  return (
    <Box {...props}>
      <CardReport ref={refDialog} />

      <VStack>
        <HStack justifyContent={'flex-start'}>
          <Box
            width={'27%'}
            flexDirection="row"
            justifyContent="space-between"
            _text={{
              fontSize: 'sm',
              color: '#999999',
            }}>
            {title}
          </Box>

          <HStack
            justifyContent={'space-between'}
            width={'75%'}
            maxWidth={'75%'}
            _text={{
              fontSize: 'sm',
              color: '#333333',
            }}>
            <Box>{value}</Box>

            <Tag
              mr={2}
              text="报案人信息"
              onPress={() => refDialog.current?.showDialog()}
            />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}
