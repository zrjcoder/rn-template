import React, { useRef } from 'react'
import { Center, VStack } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { TButton, TCard } from '@/components/home'
import { FormMedia, type FormMediaHandle, FormTextArea, Toast } from '@/components'
import { OrderTabsScreenProps } from '@/navigators/types'
import { UserState } from '@/store/user'
import { safeFetch } from '@/util'
import { useSaveTaskMutation } from '@/services'

export function PersonnelFeedback() {
  const formMediaRef = useRef<FormMediaHandle>(null)

  const route = useRoute<OrderTabsScreenProps<'PersonnelReceive'>['route']>()
  const data = route?.params?.data

  let userInfo = useSelector((state: { user: UserState }) => state.user.userInfo)

  const [feedBackMsg, setFeedBackMsg] = React.useState('')

  const [save, { isLoading }] = useSaveTaskMutation()

  return (
    <VStack bg={'#F7F8FA'} flex={1}>
      <TCard title={'现场图片'}>
        <FormMedia
          maxLength={2}
          ref={formMediaRef}
          footer={'注：必须上传现场照片，最少1张，最多可上传6张'}
        />
      </TCard>

      <TCard title={'反馈内容'}>
        <FormTextArea
          mt={2}
          placeholder="请输入反馈内容"
          onChangeText={(text) => setFeedBackMsg(text)}
        />{' '}
      </TCard>

      <Center mt={10}>
        <TButton px={10} onPress={handleSave} isLoading={isLoading}>
          提交
        </TButton>
      </Center>
    </VStack>
  )

  async function handleSave() {
    if (!feedBackMsg) {
      Toast.error('请填写反馈内容')
      return
    }
    const result = await safeFetch(save, {
      feedBackName: userInfo?.nickName,
      feedBackUserId: userInfo?.userId,
      jjdbh: data?.jjdbh,
      type: data?.type,
      feedBackMsg,
      // fileUrl: [], // 图片地址
    })
    if (result?.isSuccess) {
      Toast.success('反馈成功')
    }
  }
}
