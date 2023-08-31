/* eslint-disable react/no-unstable-nested-components */
import React, { useRef } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { ScrollView, Box, HStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'

import { FormMedia, FormSubmit, type FormMediaHandle } from '@/components'
import { FormCase, TCard, FormVoice, FormCaseHandle, FormVoiceHandle } from './components'
import { type RootStackScreenProps, IncidentTabsScreenProps } from '@/navigators/types'

export function Case() {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()
  const route = useRoute<IncidentTabsScreenProps<'Case'>['route']>()
  const { id, code } = route?.params

  const formMediaRef = useRef<FormMediaHandle>(null)
  const formCaseRef = useRef<FormCaseHandle>(null)
  const formVoiceRef = useRef<FormVoiceHandle>(null)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <FormSubmit onPress={() => {}} />,
    })
  }, [navigation])

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
