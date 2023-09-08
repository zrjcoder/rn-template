/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { Box, HStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableNativeFeedback } from 'react-native'

import { Map, Toast, Icons } from '@/components'
import {
  InfoCard,
  InfoHeader,
  InfoContent,
  Cancel,
  type CancelDialogHandle,
} from './components'
import { useUpdateTaskMutation, type PoliceTypeProps } from '@/services'
import { MapButtons } from './components/MapButtons'
import { RootStackScreenProps, IncidentTabsScreenProps } from '@/navigators/types'
import { makePhoneCall } from '@/util'

export function Scene() {
  const navigation = useNavigation<RootStackScreenProps<'Scene'>>()
  const route = useRoute<IncidentTabsScreenProps<'Scene'>['route']>()

  const dialogRef = React.useRef<CancelDialogHandle>(null)

  const data = route?.params?.data ?? {}
  const refresh = route?.params?.refresh

  const id = data?.dispatchList[0]?.gid ?? ''
  const code = data?.dispatchList[0]?.jjdbh ?? ''
  const item = data?.jjdbGab ?? {}

  const [update, { isLoading }] = useUpdateTaskMutation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CancelButton
          onPress={() => {
            dialogRef.current?.showDialog()
          }}
        />
      ),
    })
  }, [navigation])

  return (
    <Box flex={1}>
      <Cancel ref={dialogRef} onLeftPress={cancelTask} isLoading={isLoading} />
      <Map />

      <Box position={'absolute'} top={0} width={'100%'}>
        <InfoCard
          isExpand
          isHeaderBar
          Header={
            <InfoHeader
              data={{
                ...data,
                title: item?.jqlxdm,
                text: item?.fjdw,
                date: item?.bjsj,
                tags: [{ label: '处警规则' }, { label: '周边资源' }],
              }}
            />
          }
          Content={
            <InfoContent
              data={{
                ...item,
                name: item?.bjrmc,
              }}
              info={{
                bjdh: '联系电话',
                gxdwdm: '接警地址',
                jqdz: '报警人定位',
              }}
              desc={{
                name: '报 警 描 述:',
                value: item?.bjnr,
              }}
            />
          }
        />
      </Box>

      <MapButtons
        isLoading={isLoading}
        leftPress={() => {
          makePhoneCall(item?.bjdh)
        }}
        centerPress={async () => {
          const isSuccess = await updateTask('reach')

          if (isSuccess) {
            Toast.success('操作成功！')
            navigation.navigate('Case', { data })
          }
        }}
        rightPress={() => {}}
      />
    </Box>
  )

  async function cancelTask() {
    const isSuccess = await updateTask('unGo')
    if (isSuccess) {
      dialogRef.current?.closeDialog()
      navigation.goBack()
      refresh?.()
    }
  }

  async function updateTask(updateType: PoliceTypeProps) {
    try {
      const result: any = await update({
        id,
        code,
        updateType,
      })

      if (result?.data?.resCode === '00000') {
        return true
      } else {
        Toast.warning(result?.data?.resMsg ?? '出问题了...')
      }
    } catch {
      Toast.error('出错了！')
    }
  }
}

function CancelButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <HStack alignItems={'center'}>
        {Icons.close}
        <Box
          ml={1}
          _text={{
            color: '#FFFFFF',
          }}>
          取消任务
        </Box>
      </HStack>
    </TouchableNativeFeedback>
  )
}
