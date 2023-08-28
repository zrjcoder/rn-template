import React from 'react'
import { Box, VStack, HStack, Text, Heading, Image } from 'native-base'

export function CaseProcess() {
  return (
    <Box>
      {process.map((item, index) => {
        return (
          <Box ml={1}>
            <HStack>
              <Image
                size={4}
                position={'absolute'}
                left={-8}
                top={'1px'}
                resizeMode="cover"
                source={require('@/assets/icons/process.png')}
                alt="image"
              />
              <Heading ml={4} size={'sm'}>
                {item.label}
              </Heading>
            </HStack>

            <HStack w={'100%'}>
              {index !== process.length - 1 ? (
                <Box h={'100%'} w={4} borderLeftWidth={1} borderColor={'#E3EEFF'} />
              ) : (
                <Box h={'100%'} w={4} />
              )}
              <VStack
                bg={'#E9F0FF'}
                w={'95%'}
                borderRadius={4}
                px={3}
                py={2}
                mt={2}
                mb={6}>
                <Text mb={1}>接警时间：2023.5.1 17.25</Text>
                <Text>接警单位：市110接警中心</Text>
              </VStack>
            </HStack>
          </Box>
        )
      })}
    </Box>
  )
}

const process = [
  {
    id: 0,
    label: '接警',
  },
  {
    id: 1,
    label: '受理',
  },
  {
    id: 2,
    label: '派警',
  },
  {
    id: 3,
    label: '签收',
  },
  {
    id: 4,
    label: '到场',
  },
  {
    id: 5,
    label: '反馈',
  },
]
