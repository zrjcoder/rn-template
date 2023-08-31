import React, { forwardRef } from 'react'
import { Box, Text, HStack, Image, VStack, IBoxProps } from 'native-base'

import { Dialog, type DialogProps, type DialogHandle } from '@/components'

export const CardReport = forwardRef<DialogHandle, { data: any } & DialogProps>(
  ({ data, ...props }, ref) => {
    return (
      <Dialog title="报案人信息" {...props} ref={ref}>
        <Box mx={4} mt={4}>
          <ReportInfo data={data} />

          <RecInfo
            data={{
              案发地址: data?.reportAddress,
              报警人定位: data?.reportAddress,
            }}
          />

          <Box mt={2} mb={10}>
            {/* <Tags
              data={[
                { label: '前科人员', color: '#FF2200' },
                { label: '心胀病', color: '#FF2200' },
                { label: '高血压', color: '#FF2200' },
                { label: '抑郁症', color: '#FF2200' },
              ]}
            /> */}
          </Box>
        </Box>
      </Dialog>
    )
  }
)

export function ReportInfo({ data, ...props }: { data: any } & IBoxProps) {
  return (
    <HStack width={'100%'} {...props}>
      <Box flex={3}>
        <Image
          h={'120px'}
          resizeMode="cover"
          source={require('@/assets/images/modal-top.png')}
          alt="image"
        />
      </Box>
      <VStack flex={7} ml={2}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Box
            _text={{
              fontSize: '16px',
              fontWeight: '600',
            }}>
            {data?.name}
          </Box>
          <Box
            _text={{
              fontSize: 'xs',
              fontWeight: '600',
              color: '#FF2200',
            }}>
            ♀女
          </Box>
        </HStack>
        <Info
          data={{
            年龄: data?.age ?? '暂无',
            联系电话: data?.tel ?? '暂无',
            身份证号: data?.idCard ?? '暂无',
            '24小时报案': '暂无',
          }}
        />
      </VStack>
    </HStack>
  )
}

function Info({ data }: any) {
  const keys = Object.keys(data)

  return (
    <VStack>
      {keys.map((key) => {
        return (
          <HStack key={key} mt={1.5} justifyContent={'flex-start'}>
            <Text color="#999999" fontSize={'xs'}>
              {key}：
            </Text>
            <Text color="#333333" fontSize={'xs'}>
              {data[key]}
            </Text>
          </HStack>
        )
      })}
    </VStack>
  )
}

function RecInfo({ data }: any) {
  const keys = Object.keys(data)

  return (
    <VStack mt={2}>
      {keys.map((key) => {
        return (
          <VStack key={key} mt={1} mb={2} justifyContent={'flex-start'}>
            <Text color="#999999" fontSize={'sm'}>
              {key}：
            </Text>
            <Text color="#333333" fontSize={'sm'}>
              {data[key]}
            </Text>
          </VStack>
        )
      })}
    </VStack>
  )
}

// function Tags({ data }: any) {
//   return (
//     <HStack>
//       {data.map((item: any) => {
//         return (
//           <Box key={item.label}>
//             <Tag text={item.label} mr={2} />
//           </Box>
//         )
//       })}
//     </HStack>
//   )
// }
