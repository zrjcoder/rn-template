import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { Box, Image, HStack, Text, Toast } from 'native-base'

import { Button as ButtonBox, Preview, type PreviewHandle } from '@/components'
import { permission } from '@/util'
import { useMedia, type MediaProps } from './hooks'

export type FormMediaProps = {
  maxLength?: number
  footer?: React.ReactNode
}

export type FormMediaHandle = {
  getMedias: () => MediaProps[]
}

export const FormMedia = forwardRef<FormMediaHandle, FormMediaProps>(
  ({ footer, maxLength = 10 }, ref) => {
    const { medias, handlePickerImage, handleDeleteMedia } = useMedia()
    const previewRef = useRef<PreviewHandle>(null)

    useImperativeHandle(ref, () => ({
      getMedias: () => {
        if (!medias) return []
        return medias
      },
    }))

    return (
      <Box>
        <HStack space={2} mb={2} flexWrap={'wrap'}>
          <Picker
            onPress={async () => {
              await permission(['android.permission.CAMERA'])

              if (medias?.length === maxLength) {
                Toast.show({
                  description: `最多上传${maxLength}张图片`,
                })
                return
              }

              handlePickerImage()
            }}
          />

          {medias &&
            medias.map((media, index) => (
              <Preview
                ref={previewRef}
                key={index}
                media={media}
                onPreview={() => {
                  previewRef.current?.previewMedia(media)
                }}
                onDelete={() => {
                  handleDeleteMedia(index)
                }}
              />
            ))}
        </HStack>

        {footer && (
          <Box>
            <Text color={'#999999'} fontSize={'sm'}>
              {footer}
            </Text>
          </Box>
        )}
      </Box>
    )
  }
)

function Picker({ onPress }: { onPress: () => void }) {
  return (
    <ButtonBox isScale onPress={onPress}>
      <Box
        size={[24, 20]}
        bg={'#F7F8FA'}
        borderRadius={'xs'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Image
          size={'22px'}
          resizeMode="cover"
          source={require('@/assets/icons/camera.png')}
          alt="image"
        />
      </Box>
    </ButtonBox>
  )
}
