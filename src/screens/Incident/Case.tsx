/* eslint-disable react/no-unstable-nested-components */
import React, { useRef } from 'react'
import { LogBox } from 'react-native'
import { ScrollView, Box } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { FormMedia, FormSubmit, type FormMediaHandle, Toast } from '@/components'
import {
  FormCases,
  TCard,
  FormVoice,
  FormCasesHandle,
  FormVoiceHandle,
} from './components'
import { type RootStackScreenProps, IncidentTabsScreenProps } from '@/navigators/types'
import { useSaveTaskMutation } from '@/services'
import { safeFetch } from '@/util'
import { UserState } from '@/store/user'
import { useUploadFileMutation } from '@/services/modules/common'

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

export function Case() {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()
  const route = useRoute<IncidentTabsScreenProps<'Case'>['route']>()
  const data = route?.params?.data

  let userInfo = useSelector((state: { user: UserState }) => state.user.userInfo)

  const [save, { isLoading }] = useSaveTaskMutation()

  const [upload] = useUploadFileMutation()

  const formMediaRef = useRef<FormMediaHandle>(null)
  const formCasesRef = useRef<FormCasesHandle>(null)
  const formVoiceRef = useRef<FormVoiceHandle>(null)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <FormSubmit isLoading={isLoading} onPress={handleSubmit} />,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <FormCases ref={formCasesRef} />

      <TCard title={'处置结果'}>
        <FormVoice ref={formVoiceRef} />
      </TCard>

      <Box size={12} />
    </ScrollView>
  )

  async function handleSubmit() {
    const formData = new FormData()
    const medias = formMediaRef.current?.getMedias() ?? []
    if (medias?.length > 0) {
      const media = medias[0]
      formData.append('file', {
        uri: media?.uri,
        type: media?.type,
        name: media?.fileName,
      })

      fetch(`http://172.19.46.100:18805/fileService/apis/uploadFile`, {
        method: 'post',
        body: formData,
      })
    }

    if (formVoiceRef.current && formCasesRef.current) {
      const { audios, text: feedBackMsg } = formVoiceRef.current?.getValues()
      const { carList, peopleList } = formCasesRef.current?.getValues()

      if (!feedBackMsg) {
        Toast.error('处置结果不能为空！')
        return
      }

      if (!formCasesRef.current?.isEmpty()) {
        return
      }

      const saveParams = {
        feedBackName: userInfo?.nickName,
        feedBackUserId: userInfo?.userId,
        jjdbh: data?.jjdbh,
        type: 'case',
        feedBackMsg: feedBackMsg,
        // fileUrl: [], // 图片地址
        // "feedBackMsgFile": [], // 语音文件地址
        carList,
        peopleList,
      }

      const { isSuccess } = await safeFetch(save, saveParams)
      if (isSuccess) {
        Toast.success('反馈成功！')
        navigation.navigate('MainTabs', {
          screen: 'Incident',
          params: {
            tab: 2,
          },
        })
      }
    }
  }
}
