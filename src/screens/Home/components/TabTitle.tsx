import React from 'react'
import { Box, HStack, IBoxProps, VStack } from 'native-base'
import { TouchableNativeFeedback } from 'react-native'

export type TabTitleProps = {
  tabs: {
    title: string
    key: number
  }[]
  onPress: (index: number) => void
  tabIndex: number
} & IBoxProps

export type TabTitleHandle = { tabIndex: number }

export const TabTitle = ({
  tabs = [],
  tabIndex = 0,
  onPress = () => {},
  ...props
}: TabTitleProps) => {
  return (
    <HStack {...props}>
      {tabs.map((item) => (
        <Title
          mr={5}
          key={item.key}
          title={item.title}
          isSelected={tabIndex === item.key}
          onPress={() => {
            onPress(item.key)
          }}
        />
      ))}
    </HStack>
  )
}

function Title({
  title,
  isSelected,
  onPress,
  ...props
}: {
  title: string
  isSelected: boolean
  onPress: () => void
} & IBoxProps) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <VStack alignItems={'center'} {...props}>
        <Box
          _text={{
            fontSize: 'md',
            bold: true,
            color: '#000000',
          }}
          pb={1}>
          {title}
        </Box>

        {isSelected && <Box bg={'#266EFF'} h={1} w={6} borderRadius={'2'} />}
      </VStack>
    </TouchableNativeFeedback>
  )
}
