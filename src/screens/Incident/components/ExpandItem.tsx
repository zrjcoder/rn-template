import React, { useState, useRef } from 'react'
import { HStack, Text, Image } from 'native-base'

import { InfoCard, InfoHeader, type InfoCardHandle } from '@/components/home'

export function ExpandItem({
  item,
  children,
  ...props
}: {
  item: any
  children: JSX.Element
}) {
  const infoCardRef = useRef<InfoCardHandle>(null)
  const [hint, setHint] = useState('展开')

  return (
    <InfoCard
      onPress={() => {
        infoCardRef.current?.onToggle()
        setHint(infoCardRef.current?.isOpen ? '展开' : '收起')
      }}
      ref={infoCardRef}
      Header={
        <InfoHeader
          tag={'人员类型'}
          data={{
            text: item?.text ?? '姓名：赵红梅',
            title: item?.title ?? '集宁区火车站',
            date: item?.date ?? '预警时间：2022-12-14 10：20：31',
          }}
          rightButton={
            <HStack alignItems={'center'}>
              <Text color={'#266EFF'}>{hint}</Text>

              <Image
                size={'15px'}
                resizeMode="cover"
                style={{
                  transform: hint === '收起' ? [{ rotate: '180deg' }] : [],
                }}
                source={require('@/assets/icons/hidden-blue.png')}
                alt="image"
              />
            </HStack>
          }
        />
      }
      Content={children}
      isHeaderDivider={hint === '收起'}
      isExpand={true}
      {...props}
    />
  )
}
