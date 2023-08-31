import React from 'react'
import { Box, VStack, HStack, IBoxProps } from 'native-base'

import { Tag, type DialogHandle } from '@/components'
import { CardReport } from './Dialog'
import { convertIncidentDataToShow } from '@/util'

export function InfoReport({
  title = '报  警  人：',
  data,
  ...props
}: { title?: String; data?: any } & IBoxProps) {
  const refDialog = React.useRef<DialogHandle>(null)
  const item = convertIncidentDataToShow(data)

  return (
    <Box {...props}>
      <CardReport ref={refDialog} data={item} />

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
            <Box>{item?.name}</Box>

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
