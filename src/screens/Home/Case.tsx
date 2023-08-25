import React, { useRef } from 'react'
import { ScrollView, Box } from 'native-base'

import { FormMedia, type FormMediaHandle } from '@/components'
import { FormCase, TCard, FormVoice, FormCaseHandle, FormVoiceHandle } from './components'

export function Case() {
  const formMediaRef = useRef<FormMediaHandle>(null)
  const formCaseRef = useRef<FormCaseHandle>(null)
  const formVoiceRef = useRef<FormVoiceHandle>(null)

  return (
    <ScrollView bg={'#F7F8FA'}>
      <TCard title={'现场图片'}>
        <FormMedia
          maxLength={2}
          ref={formMediaRef}
          footer={'注：必须上传现场照片，最少1张，最多可上传6张'}
        />
      </TCard>

      <FormCase ref={formCaseRef} />

      <TCard title={'处置结果'}>
        <FormVoice ref={formVoiceRef} />
      </TCard>

      <Box size={12} />
    </ScrollView>
  )
}
