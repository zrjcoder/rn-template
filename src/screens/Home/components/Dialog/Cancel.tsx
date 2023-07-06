import React, { forwardRef } from 'react'
import { Center, Box, HStack, Image } from 'native-base'

import { Dialog, type DialogProps, type DialogHandle } from '@/components'

import { TButton } from '../Base/TButton'

export const Cancel = forwardRef<DialogHandle, DialogProps>(({ ...props }, ref) => {
  return <Dialog title="已取消出警任务" {...props} ref={ref}></Dialog>
})
