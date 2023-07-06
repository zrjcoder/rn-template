import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Box, Image, IBoxProps } from 'native-base'

import { Button as ButtonBox, Dialog, type DialogHandle } from '@/components'
import { type MediaProps } from '../Form/hooks'

export type PreviewHandle = {
  previewMedia: (media: MediaProps) => void
}

export type PreviewProps = {
  media: MediaProps
  onDelete: (index: number) => void
  onPreview: () => void
} & IBoxProps

export const Preview = forwardRef<PreviewHandle, PreviewProps>(
  ({ media, onDelete, onPreview, ...props }, ref) => {
    const [previewMedia, setPreviewMedia] = useState<MediaProps>(media)
    const dialogRef = useRef<DialogHandle>(null)

    useImperativeHandle(ref, () => ({
      previewMedia: (currentMedia) => {
        setPreviewMedia(currentMedia)
        dialogRef.current?.showDialog()
      },
    }))

    return (
      <>
        <ButtonBox isScale onPress={onPreview}>
          <Box
            size={[24, 20]}
            borderRadius={'xs'}
            justifyContent={'center'}
            alignItems={'center'}
            mb={2}
            {...props}>
            <Image
              size={'100%'}
              borderRadius={'xs'}
              resizeMode="cover"
              source={{
                uri: media.uri,
              }}
              alt="image"
            />
            <Box position={'absolute'} top={0} right={0}>
              <ButtonBox onPress={onDelete as any}>
                <Image
                  borderTopRightRadius={2}
                  size={'20px'}
                  resizeMode="cover"
                  source={require('@/assets/icons/camera-close.png')}
                  alt="image"
                />
              </ButtonBox>
            </Box>
          </Box>
        </ButtonBox>

        <Dialog isHeader={false} isFooter={false} title="预览" ref={dialogRef}>
          <Image
            h={previewMedia?.width ? previewMedia?.width / 10 : '100%'}
            w={previewMedia?.height ? previewMedia?.height / 10 : '100%'}
            borderRadius={'xs'}
            resizeMode="stretch"
            source={{
              uri: previewMedia.uri,
            }}
            alt="image"
          />
        </Dialog>
      </>
    )
  }
)
