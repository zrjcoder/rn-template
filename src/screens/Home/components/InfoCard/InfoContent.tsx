import React from 'react'
import { Box, Text } from 'native-base'

import { InfoReport } from '@/components/home'
import { InfoBox } from '@/components'

type InfoContentProps = {
  data: any
  info: any
  desc: DescProps
}

type DescProps = {
  name: string
  value: string
}

export function InfoContent({ data, info, desc }: InfoContentProps) {
  return (
    <Box>
      <Desc desc={desc} />

      <InfoReport value={data?.name ?? ''} mt={2} />
      <InfoBox data={data} info={info} />
    </Box>
  )
}

function Desc({ desc }: { desc: DescProps }) {
  if (!desc) {
    return <Box />
  }

  return (
    <Box>
      <Box mb={4} mt={2}>
        <Text fontWeight={'medium'} color={'#266EFF'}>
          {desc?.name}
        </Text>
        <Text>{desc?.value}</Text>
      </Box>
      <Box borderStyle={'dashed'} borderTopWidth={1} borderColor={'#C8C9CC'} />
    </Box>
  )
}
