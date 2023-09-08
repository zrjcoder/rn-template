import React from 'react'
import { Center } from 'native-base'
import { TButton, TCard } from '../Incident/components'
import { FormTextArea, Toast } from '@/components'
import { useFeedbackMutation } from '@/services'
import { safeFetch } from '@/util'
import { useSelector } from 'react-redux'
import { UserState } from '@/store/user'

export function Feedback() {
  const [content, setContent] = React.useState('')

  const [feedback, { isLoading }] = useFeedbackMutation()

  const userInfo = useSelector((state: { user: UserState }) => state.user.userInfo)

  return (
    <Center>
      <TCard pb={5} title="意见反馈">
        <FormTextArea
          mt={3}
          value={content}
          placeholder="请输入意见反馈"
          onChangeText={setContent}
        />
      </TCard>

      <TButton
        isLoading={isLoading}
        isLoadingText="反馈中..."
        w={'40%'}
        mt={12}
        onPress={handleFeedback}>
        提交
      </TButton>
    </Center>
  )

  async function handleFeedback() {
    if (!content) {
      Toast.error('请填写反馈内容')
      return
    }

    const { isSuccess } = await safeFetch(feedback, {
      user_gid: userInfo.userId,
      content,
      title: '',
      create_time: new Date(),
    })

    if (isSuccess) {
      Toast.success('反馈成功！')
    }
  }
}
