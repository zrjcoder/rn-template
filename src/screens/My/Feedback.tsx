import React from 'react'
import { Center } from 'native-base'
import { TButton, TCard } from '../Incident/components'
import { FormTextArea } from '@/components'

export function Feedback() {
  const [feedback, setFeedback] = React.useState('')

  return (
    <Center>
      <TCard pb={5} title="意见反馈">
        <FormTextArea
          value={feedback}
          placeholder="请输入意见反馈"
          onChangeText={setFeedback}
        />
      </TCard>

      <TButton w={'40%'} mt={12}>
        提交
      </TButton>
    </Center>
  )
}
