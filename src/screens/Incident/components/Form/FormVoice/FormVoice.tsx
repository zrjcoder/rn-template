import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { IBoxProps } from 'native-base'

import { FormTextArea, type FormTextAreaHandle } from '@/components'
import {
  TabView,
  AudioPlayer,
  VoiceInput,
  type VoiceInputHandle,
  AudioProps,
} from '@/components/home'
import { permission } from '@/util'

export type FormVoiceHandle = {
  getValues: () => {
    audios: AudioProps[]
    text: string | undefined
  }
  setAudios: (newAudios: AudioProps[]) => void
  getHeight: () => number
}

export type FormVoiceProps = {} & IBoxProps

export const FormVoice = forwardRef<FormVoiceHandle, FormVoiceProps>(
  ({ ...props }, ref) => {
    const [audios, setAudios] = React.useState<AudioProps[]>([])

    const voiceInputRef = useRef<VoiceInputHandle>(null)
    const textInputRef = useRef<FormTextAreaHandle>(null)

    useImperativeHandle(ref, () => ({
      getValues: () => {
        return {
          audios,
          text: textInputRef.current?.getValues(),
        }
      },
      setAudios: (newAudios: AudioProps[]) => {
        setAudios([...newAudios])
      },
      getHeight: () => {
        if (audios.length <= 3) {
          return 200
        } else {
          return 200 + (audios.length - 3) * 20
        }
      },
    }))

    return (
      <>
        <TabView
          shadow={999}
          onLoad={({ setTabs }) => {
            const tabs = [
              {
                height: 120,
              },
              {
                height: (() => {
                  if (audios.length <= 2) {
                    return 150
                  } else if (audios.length <= 6) {
                    return 150 + (audios.length - 2) * 40
                  } else {
                    return 150 + (audios.length - 2) * 50
                  }
                })(),
                tabBarButton: {
                  text: '开始录音',
                  onPress: () => {
                    voiceInputRef.current?.showDialog()
                    permission([
                      'android.permission.RECORD_AUDIO',
                      'android.permission.WRITE_EXTERNAL_STORAGE',
                    ])
                  },
                  source: require('@/assets/icons/voice.png'),
                },
              },
            ]
            setTabs(tabs)
          }}
          routeScene={[
            { key: 'page1', title: '文字输入' },
            { key: 'page2', title: '语音输入' },
          ]}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'page1':
                return <FormTextArea ref={textInputRef} placeholder="请输入处置结果" />
              case 'page2':
                return (
                  <>
                    <AudioPlayer audios={audios} />
                    <VoiceInput
                      ref={voiceInputRef}
                      onSuccess={async (audio) => {
                        setAudios([...audios, audio])
                      }}
                    />
                  </>
                )

              default:
                return null
            }
          }}
          {...props}
        />
      </>
    )
  }
)
