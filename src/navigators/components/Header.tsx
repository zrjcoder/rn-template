import React from 'react'
import { Box, HStack } from 'native-base'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

export function Header(params: NativeStackHeaderProps) {
  const options = params?.options

  return (
    options?.headerShown && (
      <HStack
        bg={'#266EFF'}
        h={'40px'}
        // pb={'10px'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Box alignItems={'flex-start'} flex={1}>
          {options?.headerLeft && (
            <Box ml={4}>
              {options?.headerLeft({
                canGoBack: true,
              })}
            </Box>
          )}
        </Box>

        <Box
          flex={1}
          _text={{
            color: '#fff',
            fontSize: '17px',
            textAlign: 'center',
          }}>
          {options?.headerTitle ?? '标题'}
        </Box>

        <Box alignItems={'flex-end'} flex={1}>
          {options?.headerRight && (
            <Box mr={4}>
              {options?.headerRight({
                canGoBack: true,
              })}
            </Box>
          )}
        </Box>
      </HStack>
    )
  )
}

// rightButton 例子
// React.useLayoutEffect(() => {
//   data?.feedBackStatus === 0 &&
//     navigation.setOptions({
//       headerRight: () => (
//         <SubmitButton title={updateType?.label} onPress={handleDisposal} />
//       ),
//     })
// }, [navigation, data?.feedBackStatus, handleDisposal])
