import React, { useRef } from 'react'
import { Box, ScrollView, VStack } from 'native-base'
import { useRoute, useNavigation } from '@react-navigation/native'

import {
  TCard,
  InfoReport,
  CaseProcess,
  Alarm,
  Immediate,
  type ImmediateResHandle,
  FixedButton,
} from '@/components/home'
import { InfoBox, type DialogHandle, Toast } from '@/components'
import { convertIncidentDataToShow, executeAfterDelay, makePhoneCall } from '@/util'
import { RootStackScreenProps, IncidentTabsScreenProps } from '@/navigators/types'
import { useFetchMessageDetailQuery } from '@/services'
import { useDisposalTask } from '../Incident/hooks'

export function MessageDetail() {
  const navigation = useNavigation<RootStackScreenProps<'Detail'>>()

  const route = useRoute<IncidentTabsScreenProps<'Detail'>['route']>()
  const paramsData = route?.params?.data

  const { data: taskDetail } = useFetchMessageDetailQuery({
    associationId: paramsData?.associationId,
    type: 'self',
  })

  const data = taskDetail?.data

  const item = convertIncidentDataToShow(data?.dataInfo || data?.jjdbGab)

  const alarmDialogRef = useRef<DialogHandle>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)

  const { updateType, updateTask, isLoading } = useDisposalTask(data)

  return (
    <VStack flex={1}>
      {data?.feedBackStatus === 0 && (
        <FixedButton isLoading={isLoading} onPress={handleDisposal} />
      )}

      <ScrollView showsVerticalScrollIndicator={false} mb={4}>
        <Alarm
          isLoading={isLoading}
          title="已接收新警情"
          ref={alarmDialogRef}
          onLeftPress={async () => {
            const { isSuccess } = await updateTask()
            alarmDialogRef.current?.closeDialog()

            if (isSuccess) {
              immediateDialogRef.current?.countDownStart()
              executeAfterDelay(() => {
                navigation.navigate('Scene', {
                  data: taskDetail?.data,
                })
              })
            }
          }}
          onRightPress={() => {
            makePhoneCall(data?.jjdbGab?.bjdh)
          }}
        />
        <Immediate ref={immediateDialogRef} />

        <TCard title="案件信息" mb={3}>
          <InfoReport mt={2} data={data?.dataInfo} />
          <InfoBox data={item} info={info} />
        </TCard>

        <TCard title="出警流程">
          <Box mt={3} />
          <CaseProcess
            flowList={data?.flowList ?? []}
            feedbackList={data?.feedbackList ?? []}
          />
        </TCard>
      </ScrollView>
    </VStack>
  )

  async function handleDisposal() {
    switch (updateType.type) {
      case 'receive':
        const receive = await updateTask()

        if (receive?.isSuccess) {
          Toast.success('接警成功')
          alarmDialogRef.current?.showDialog()
        }
        break

      case 'go':
        const go = await updateTask()

        if (go?.isSuccess) {
          Toast.success('出警成功')
          immediateDialogRef.current?.countDownStart()
          executeAfterDelay(() => {
            nav(data)
          })
        }
        break

      case 'reach':
        nav(data)
        break

      case 'feedback':
        nav(data, 'Case')
        break

      default:
        break
    }
  }

  function nav(data: any = {}, route: 'Scene' | 'Case' = 'Scene') {
    navigation.navigate(route as any, {
      data,
    })
  }
}

const info = {
  type: '警情类型',
  level: '警情等级',
  label: '标        签',
  jurisdiction: '所属辖区',
  subdivision: '所属分局',
  tel: '报警电话',
  date: '报警时间',
  address: '案发地址',
  desc: '报警描述',
  feedback: '反馈内容',
}
