import React, { ReactNode, forwardRef, useImperativeHandle } from 'react'
import { Box, Center, Image, useDisclose, Collapse, IBoxProps } from 'native-base'

import { Card, Button } from '@/components'
import { color } from '@/util'

export type InfoCardProps = {
  Header?: JSX.Element
  Content?: JSX.Element
  Footer?: JSX.Element
  children?: JSX.Element
  isHeaderDivider?: boolean
  isHeaderBar?: boolean
  isExpand?: boolean
  onPress?: () => void
} & IBoxProps

export type InfoCardHandle = {
  onToggle: () => void
  isOpen: boolean
}

export const InfoCard = forwardRef<InfoCardHandle, InfoCardProps>(
  (
    {
      Header,
      Content,
      Footer,
      isHeaderBar = false,
      isExpand = false,
      isHeaderDivider = true,
      children,
      onPress,
      ...props
    },
    ref
  ) => {
    const { isOpen, onToggle } = useDisclose(false)

    useImperativeHandle(ref, () => ({
      onToggle,
      isOpen,
    }))

    return (
      <Wrapped isExpand={isExpand} onPress={onPress} {...props}>
        {Header && (
          <>
            {Header}
            {isHeaderDivider && <Divider />}
          </>
        )}

        {isExpand ? (
          <Collapse duration={350} isOpen={isOpen}>
            {Content}
            {Footer}
            {children}
          </Collapse>
        ) : (
          <>
            {Content}
            {Footer}
            {children}
          </>
        )}

        {isHeaderBar && <HiddenBar isOpen={isOpen} onPress={onToggle} />}
      </Wrapped>
    )
  }
)

function Wrapped({
  isExpand,
  children,
  onPress,
  ...props
}: {
  children: ReactNode
  onPress?: () => void
  isExpand: boolean
}) {
  if (isExpand) {
    return (
      <Card px="0" {...props}>
        <Button onPress={onPress} isPressedStyle={!!onPress}>
          <Box>{children}</Box>
        </Button>
      </Card>
    )
  } else {
    return (
      <Card px="0" {...props}>
        {children}
      </Card>
    )
  }
}

function HiddenBar({ isOpen, onPress }: { onPress: () => void; isOpen: boolean }) {
  return (
    <Button pb={2} pt={1} onPress={onPress} bg={color(3)}>
      <Center>
        <Image
          size={'22px'}
          style={{
            transform: isOpen ? [] : [{ rotate: '180deg' }],
          }}
          resizeMode="cover"
          source={require('@/assets/icons/hidden.png')}
          alt="image"
        />
      </Center>
    </Button>
  )
}

function Divider() {
  return <Box borderStyle={'dashed'} mx={3} borderTopWidth={1} borderColor={'#C8C9CC'} />
}
