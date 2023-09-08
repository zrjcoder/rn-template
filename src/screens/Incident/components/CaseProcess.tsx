import React from 'react'
import { Box, VStack, HStack, Text, Heading, Image } from 'native-base'

export function CaseProcess({
  flowList,
  feedbackList,
}: {
  flowList: any[]
  feedbackList: any[]
}) {
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
                {renderProcess(item)}
              </VStack>
            </HStack>
          </Box>
        )
      })}
    </Box>
  )

  function renderProcess(item: any) {
    const { id, label } = item

    // 接警、受理、派警
    if ([0, 1, 2].includes(id)) {
      return (
        <Box>
          <Text mb={1}>{`${label}时间：${flowList[id]?.time ?? ''}`}</Text>
          <Text>{`${label}单位：${flowList[id]?.dw ?? ''}`}</Text>
        </Box>
      )
    }
    // 出警、到场、取消
    else if ([3, 4, 5].includes(id)) {
      const polices = flowList[id]?.child ?? []
      return (
        <Box>
          <Text mb={1}>{`${label}时间：${flowList[id]?.time ?? ''}`}</Text>
          <HStack>
            <Box>{`${label}民警：`}</Box>
            <Box>
              {polices.map((police: any, index: number) => {
                return (
                  <Text key={police?.mc + index}>{`${police?.mc ?? ''} ${
                    police?.time ?? ''
                  }`}</Text>
                )
              })}
            </Box>
          </HStack>
        </Box>
      )
    }
    // 反馈
    else {
      const feedback = feedbackList[0]
      return (
        <Box>
          <Text mb={1}>{`${label}时间：${feedback?.time ?? ''}`}</Text>
          <Text>{`${label}内容：${feedback?.dw ?? ''}`}</Text>
        </Box>
      )
    }
  }
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
    label: '出警',
  },
  {
    id: 5,
    label: '到场',
  },
  {
    id: 6,
    label: '反馈',
  },
]
