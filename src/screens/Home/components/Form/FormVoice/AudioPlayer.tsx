import React from 'react'
import { Box, VStack, Text, Center } from 'native-base'

import { AudioItem } from './AudioItem'

export type AudioProps = {
  uri: string
  time: string
}

export const AudioPlayer = ({ audios }: { audios: AudioProps[] }) => {
  return (
    <Box mt={3}>
      <VStack bg={'#F7F8FA'} h={'100%'}>
        <Center>
          {audios.length === 0 && <Text color={'#999999'}>点击右上角按钮来开始录音</Text>}

          <VStack w={'93%'}>
            {audios.map((audio, index) => (
              <Box key={index} pt={4}>
                <AudioItem audio={audio} />
              </Box>
            ))}
          </VStack>
        </Center>
      </VStack>
    </Box>
  )
}
