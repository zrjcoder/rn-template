import React from 'react'
import { Box, HStack, Text, VStack } from 'native-base'
// 27 20
export function Process({ status }: { status: number }) {
  console.log(process)
  process = process.map((item, index) => ({
    ...item,
    isActivity: status >= index,
  }))
  console.log(process)

  return (
    <VStack>
      <HStack mt={4} mb={10}>
        {process.map((item, index) => {
          const isLast = index === process.length - 1
          return (
            <HStack key={index} alignItems={'center'} flex={isLast ? 0 : 1}>
              <VStack>
                <Node number={index + 1} text={item.text} isActivity={item.isActivity} />
              </VStack>
              {!isLast && (
                <Line isActivity={status === index ? false : item.isActivity} />
              )}
            </HStack>
          )
        })}
      </HStack>

      <Box borderStyle={'dashed'} borderTopWidth={1} borderColor={'#C8C9CC'} />
    </VStack>
  )
}

function Node({
  isActivity = false,
  number,
  text,
}: {
  isActivity?: boolean
  number: number
  text: string
}) {
  return (
    <Box
      bg={isActivity ? '#D4E2FF' : '#F4F4F5'}
      borderRadius="full"
      size={7}
      justifyContent="center"
      alignItems="center">
      <Box
        bg={isActivity ? '#266EFF' : '#C8C9CC'}
        borderRadius="full"
        size={5}
        justifyContent="center"
        alignItems="center">
        <Text color="#FFFFFF" fontSize={'xs'}>
          {number}
        </Text>
      </Box>

      <Box
        w={10}
        bottom={-20}
        position={'absolute'}
        _text={{
          textAlign: 'center',
          fontSize: 'xs',
        }}>
        {text}
      </Box>
    </Box>
  )
}

function Line({ isActivity }: { isActivity?: boolean }) {
  return <Box bg={isActivity ? '#266EFF' : '#C8C9CC'} h={'2px'} mx={1 / 2} flex={1} />
}

let process = [
  {
    text: '已受理',
    isActivity: false,
  },
  {
    text: '已派警',
    isActivity: false,
  },
  {
    text: '已签收',
    isActivity: false,
  },
  {
    text: '已到场',
    isActivity: false,
  },
  {
    text: '已反馈',
    isActivity: false,
  },
]
