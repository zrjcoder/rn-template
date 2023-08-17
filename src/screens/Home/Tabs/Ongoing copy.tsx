/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import {
  Box,
  Toast,
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { FlatList, type FlatListHandle } from '@/components'
import { useUpdateTaskMutation, useLazyFetchTaskListQuery } from '@/services'
import { IncidentItem, CenterButton } from '../components'
import { convertIncidentDataToShow, executeAfterDelay } from '@/util'
import { Immediate, type ImmediateResHandle } from '../components/Dialog'

export const Ongoing = ({ tab }: { tab: number }) => {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  const listRef = useRef<FlatListHandle>(null)
  const immediateDialogRef = useRef<ImmediateResHandle>(null)

  const [fetchTaskList, { data, isFetching }] = useLazyFetchTaskListQuery()
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box flex={1} bg="#F5F7F9">
      <Immediate ref={immediateDialogRef} />

      <FlatList
        ref={listRef}
        isFetching={isFetching}
        data={data?.data?.list ?? []}
        onRefresh={() => {
          getData()
        }}
        renderItem={({ item }) => (
          <IncidentItem
            item={convertIncidentDataToShow(item)}
            leftPress={() => {}}
            // centerPress={async () => {
            //   try {
            //     await updateTask('receive')

            //     immediateDialogRef.current?.countDownStart()

            //     executeAfterDelay(() => {
            //       navigation.navigate('IncidentTabs', {
            //         screen: 'Scene',
            //         params: {
            //           data: convertIncidentDataToShow(item),
            //         },
            //       })
            //     })
            //   } catch (error) {}
            // }}
            centerButton={
              <CenterButton
                isLoading={isLoading}
                isLoadingText="出警中..."
                onPress={async () => {
                  Toast.show({
                    title: 'dudu',
                    placement: 'top',
                    render: () => {
                      return (
                        <Alert status={'info'}>
                          <VStack space={2} flexShrink={1} w="100%">
                            <HStack
                              flexShrink={1}
                              space={2}
                              justifyContent="space-between">
                              <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt="1" />
                                <Text fontSize="md" color="coolGray.800">
                                  "123124"
                                </Text>
                              </HStack>
                              <IconButton
                                variant="unstyled"
                                _focus={{
                                  borderWidth: 0,
                                }}
                                icon={<CloseIcon size="3" />}
                                _icon={{
                                  color: 'coolGray.600',
                                }}
                              />
                            </HStack>
                          </VStack>
                        </Alert>
                      )
                    },
                  })

                  try {
                    await updateTask('go')
                    await getData()
                  } catch {}
                }}>
                立即出警
              </CenterButton>
            }
            rightPress={() => {
              navigation.navigate('Map')
            }}
          />
        )}
      />
    </Box>
  )

  function getData() {
    let params = {
      condition: {},
    }

    params.condition = { receiveStatus: 1, selType: 'doing' }

    fetchTaskList(params)
  }
}
