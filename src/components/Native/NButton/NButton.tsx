// @ts-nocheck

import React, { useEffect, useRef } from 'react'
import { Box } from 'native-base'
import {
  requireNativeComponent,
  PixelRatio,
  UIManager,
  findNodeHandle,
} from 'react-native'

import { RButtonManager } from './NButtonManager'

const createFragment = (viewId: number) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    UIManager.getViewManagerConfig('RButton').Commands.create.toString(),
    [viewId]
  )

export function NButton() {
  if (RButtonManager) {
    return <Box />
  }

  const ref = useRef(null)

  return (
    // <Box style={{f}}>
    <RButtonManager ref={ref} />
    // </Box>
  )
}
