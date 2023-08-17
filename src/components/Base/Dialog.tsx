import React from 'react'
import { Box, Center, Modal, Image, IModalProps } from 'native-base'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box'

export type DialogProps = {
  title?: string
  enableTouchClose?: boolean
  isHeader?: boolean
  isFooter?: boolean
  children?: React.ReactNode
  styles?: InterfaceBoxProps<IModalProps>
} & IModalProps

export type DialogHandle = {
  showDialog: (callback?: () => void) => void
  closeDialog: (callback?: () => void) => void
}

export const Dialog = React.forwardRef<DialogHandle, DialogProps>(
  (
    {
      title,
      enableTouchClose = true,
      isHeader = true,
      isFooter = true,
      styles,
      children,
      ...props
    },
    ref
  ) => {
    const [showDialog, setShowDialog] = React.useState(false)

    React.useImperativeHandle(ref, () => ({
      showDialog: (callback = () => {}) => {
        setShowDialog(true)
        callback()
      },
      closeDialog: (callback = () => {}) => {
        setShowDialog(false)
        callback()
      },
    }))

    return (
      <Center>
        <Modal
          isOpen={showDialog}
          onClose={() => {
            if (enableTouchClose) {
              setShowDialog(false)
            }
          }}
          {...props}
          avoidKeyboard>
          <Modal.Content width={'90%'} {...styles}>
            {isHeader && <Header title={title} />}
            {children}
            {isFooter && <Footer />}
          </Modal.Content>
        </Modal>
      </Center>
    )
  }
)

function Header({ title }: { title?: string }) {
  return (
    <Box h={'48px'}>
      <Image
        size="100%"
        resizeMode="cover"
        source={require('@/assets/images/modal-top.png')}
        alt="image"
      />
      <Center
        w="100%"
        h="100%"
        _text={{
          color: '#FFFFFF',
          fontWeight: '700',
          fontSize: 'md',
        }}
        position="absolute"
        bottom="0">
        {title}
      </Center>
    </Box>
  )
}

function Footer() {
  return (
    <Center w="100%" h="60px" position="absolute" bottom="0">
      <Image
        size={'100%'}
        resizeMode="cover"
        source={require('@/assets/images/modal-bottom.png')}
        alt="image"
      />
    </Center>
  )
}
