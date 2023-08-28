import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Box, Text, HStack } from 'native-base'
import Lottie from 'lottie-react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

import { Button } from '@/components'
import { type AudioProps } from './AudioPlayer'
import { convertTimeToSeconds } from '@/util'

const audioRecorderPlayer = new AudioRecorderPlayer()

export const AudioItem = ({ audio }: { audio: AudioProps }) => {
  const animationRef = useRef<Lottie>(null)

  const time = convertTimeToSeconds(audio?.time)

  return (
    <Box>
      <Box style={styles.triangle} />
      <Button
        onPress={() => {
          audioRecorderPlayer.pausePlayer()
          audioRecorderPlayer.startPlayer(audio.uri)
          animationRef.current?.play()

          audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
              animationRef.current?.reset()
              audioRecorderPlayer.removePlayBackListener()
            }
          })
        }}
        ml={1}
        _pressed={{
          bg: '#81E96880',
        }}
        bg={'#81E968'}
        maxW={'100%'}
        w={`${25 + (time / 20) * 100}%`}
        justifyContent={'center'}
        alignItems={'flex-start'}
        h={8}>
        <HStack>
          <Lottie
            style={{
              marginRight: 6,
              height: 40,
            }}
            source={require('@/assets/lottie/recording.json')}
            loop
            ref={animationRef}
          />
          <Box justifyContent={'center'}>
            <Text position={'absolute'} left={-10}>
              {time}''
            </Text>
          </Box>
        </HStack>
      </Button>
    </Box>
  )
}

const styles = StyleSheet.create({
  triangle: {
    position: 'absolute',
    left: -5,
    top: 13,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#81E968',
    transform: [{ rotate: '-90deg' }],
  },
})
