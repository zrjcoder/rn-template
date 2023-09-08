import React from 'react'
import { ScrollView, VStack, Center } from 'native-base'
import { InfoCard, InfoHeader, TButton, TCard } from '@/components/home'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import {
  InfoBox,
  Toast,
  FormMedia,
  type FormMediaHandle,
  FormTextArea,
} from '@/components'
import { OrderCard, OrderBox } from '../components'
import { OrderTabsScreenProps, RootStackScreenProps } from '@/navigators/types'
import { formatTime, orderTagFromType, safeFetch } from '@/util'
import { useDisposalTask } from '@/screens/Incident/hooks'
import { useSaveTaskMutation } from '@/services'
import { UserState } from '@/store/user'

export function PersonnelReceive() {
  const navigation = useNavigation<RootStackScreenProps<'PersonnelFeedback'>>()

  const route = useRoute<OrderTabsScreenProps<'PersonnelReceive'>['route']>()
  const data = route?.params?.data
  const dataInfo = data?.dataInfo

  const [feedBackMsg, setFeedBackMsg] = React.useState('')

  let userInfo = useSelector((state: { user: UserState }) => state.user.userInfo)

  const { updateType, updateTask, isLoading } = useDisposalTask(data)
  const [save, { isLoading: isSaveLoading }] = useSaveTaskMutation()

  const formMediaRef = React.useRef<FormMediaHandle>(null)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {updateType.type === 'feedback' && (
        <VStack>
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
            />
          </TCard>
        </VStack>
      )}

      <InfoCard
        Header={
          <InfoHeader
            tag={orderTagFromType(data?.type)?.tag}
            rightTag={orderTagFromType(data?.type)?.rightTag}
            data={{
              text: data?.dudu ?? '信息来源：情指中心',
              title: data?.dudu ?? orderTagFromType(data?.type)?.title,
              date: data?.createTime ?? '暂无',
            }}
          />
        }
        Content={
          <VStack>
            <OrderCard title="指令信息" mt={4}>
              <InfoBox
                infoStyle={{
                  mb: 3,
                }}
                isDivider={true}
                data={{
                  address: '暂无',
                  content: '暂无',
                  date: '暂无',
                }}
                info={{
                  address: '指令地点',
                  content: '指令内容',
                  date: '处置时限',
                }}
              />
            </OrderCard>

            <OrderCard title="预警信息">
              <InfoBox
                infoStyle={{
                  mb: 3,
                }}
                isDivider={true}
                data={{
                  date: formatTime(dataInfo?.fxsj),
                  level: dataInfo?.control_level ?? '暂无',
                  type: dataInfo?.check_type ?? '暂无',
                  address: dataInfo?.address ?? '暂无',
                }}
                info={{
                  date: '预警时间',
                  level: '等        级',
                  type: '类        型',
                  address: '地        点',
                }}
              />
            </OrderCard>

            <OrderCard title="基本信息" mb={4}>
              <OrderBox
                mx={0}
                person={{
                  name: dataInfo?.name,
                  gender: dataInfo?.sex,
                }}
                data={{
                  card: dataInfo?.id_card ?? '暂无',
                  date: formatTime(dataInfo?.fxsj),
                  birth: dataInfo?.birth ?? '暂无',
                  native: dataInfo?.native ?? '暂无',
                }}
                info={{
                  card: '身份证号',
                  date: '预警时间',
                  birth: '出生日期',
                  native: '籍贯',
                }}
              />
            </OrderCard>
          </VStack>
        }
      />

      <Center my={12} flexDirection={'row'}>
        <TButton
          px={6}
          theme="alarm"
          isLoadingText="加载中...."
          isLoading={isLoading || isSaveLoading}
          onPress={handleUpdate}>
          {updateType?.type === 'reach'
            ? '到达现场'
            : updateType?.type === 'feedback'
            ? '提交'
            : '立即接收'}
        </TButton>
      </Center>
    </ScrollView>
  )

  async function handleUpdate() {
    let result: any = null

    switch (updateType.type) {
      case 'receive':
        await updateTask()
        await updateTask()
        if (result?.isSuccess) {
          Toast.success('立即接收成功！')
        }
        break

      case 'reach':
        result = await updateTask()
        if (result?.isSuccess) {
          Toast.success('到达现场成功！')
          navigation.navigate('PersonnelFeedback', {
            data,
          })
        }
        break

      case 'feedback':
        if (!feedBackMsg) {
          Toast.error('请填写反馈内容')
          return
        }
        result = await safeFetch(save, {
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
        break
    }
  }
}
