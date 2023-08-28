import React from 'react'

import { TCard } from '@/components/home'
import { IBoxProps } from 'native-base'

export function OrderCard({
  children,
  title,
  ...props
}: { title: string; children: React.ReactNode } & IBoxProps) {
  return (
    <TCard title={title} style={{}} px={0} py={0} mt={0} mb={1} {...props}>
      {children}
    </TCard>
  )
}
