import React, { useRef, useImperativeHandle } from 'react'
import { Vibration } from 'react-native'
import { Center, Heading, VStack } from 'native-base'
import Lottie from 'lottie-react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import RNFetchBlob from 'rn-fetch-blob'

import { Dialog, Button, type DialogHandle } from '@/components'
import { generateRandomFileName } from '@/util'

export type VoiceInputProps = {
  onSuccess: (audio: { uri: string; time: string }) => void
}
export type VoiceInputHandle = {
  showDialog: () => void
}

let audioRecorderPlayer = new AudioRecorderPlayer()

export const VoiceInput = React.forwardRef<VoiceInputHandle, VoiceInputProps>(
  ({ onSuccess }, ref) => {
    const [text, setText] = React.useState('按住 说话')
    const [audio, setAudio] = React.useState({ uri: '', time: '' })

    const dialogRef = useRef<DialogHandle>(null)
    const animationRef = useRef<Lottie>(null)

    useImperativeHandle(ref, () => ({
      showDialog: () => {
        dialogRef.current?.showDialog()
      },
    }))

    return (
      <Dialog
        isHeader={false}
        isFooter={false}
        ref={dialogRef}
        justifyContent={'flex-end'}
        styles={{
          width: '100%',
        }}>
        <Center>
          <VStack alignItems={'center'}>
            <Heading size={'md'} mt={3} position={'absolute'} top={0}>
              {text}
            </Heading>

            <Button
              isPressedStyle={false}
              onPressIn={async () => {
                setText('松开 结束')

                // 创建音频文件夹
                const audioDir = `${RNFetchBlob.fs.dirs.CacheDir}/audio`
                const uri = `${audioDir}/${generateRandomFileName()}.mp3`
                const isDirExists = await RNFetchBlob.fs.isDir(audioDir)
                if (!isDirExists) {
                  await RNFetchBlob.fs.mkdir(audioDir)
                }

                // 开始录音
                Vibration.vibrate(100)
                animationRef.current?.play()
                audioRecorderPlayer.startRecorder(uri)

                audioRecorderPlayer.addRecordBackListener((e) => {
                  const time = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
                  setAudio({ uri, time })
                })
              }}
              onPressOut={async () => {
                setText('按住 说话')
                Vibration.vibrate(100)

                animationRef.current?.reset()
                dialogRef.current?.closeDialog()

                await audioRecorderPlayer.stopRecorder()
                audioRecorderPlayer.removeRecordBackListener()
                audioRecorderPlayer = new AudioRecorderPlayer()

                onSuccess(audio)
              }}>
              <Lottie
                style={{
                  marginVertical: 12,
                  height: 200,
                  marginTop: 10,
                }}
                source={require('@/assets/lottie/voice.json')}
                loop
                ref={animationRef}
              />
            </Button>
          </VStack>
        </Center>
      </Dialog>
    )
  }
)
