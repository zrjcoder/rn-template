import React from 'react'
import { Box } from 'native-base'

import { InfoCardHandle, type InfoCardProps } from '@/components/home'

export type OrderCardProps = {} & InfoCardProps

export function OrderCard({}: OrderCardProps) {
  return <InfoCardHandle Header={} />
}
