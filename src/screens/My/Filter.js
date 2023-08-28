import React from 'react'
import { Box } from 'native-base'
import { UIManager, DeviceEventEmitter, findNodeHandle } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/native'

import { MessageFilter } from '@/components'
import { setMessageTypes, clearMessageTypes, setMessageFilter } from '@/store/user'

export function Filter() {
  const route = useRoute()
  const callback = route?.params?.callback
  console.log(route.params)

  const ref = React.useRef(null)

  const messageTypes = useSelector((state) => state.user.messageTypes)
  const isMessageFilter = useSelector((state) => state.user.isMessageFilter)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current)
    UIManager.dispatchViewManagerCommand(
      viewId,
      UIManager.MessageFilter.Commands.onUpdate.toString(),
      [viewId]
    )
    UIManager.dispatchViewManagerCommand(
      viewId,
      UIManager.MessageFilter.Commands.onSwitch.toString(),
      [viewId]
    )

    DeviceEventEmitter.addListener('onSwitch', (data) => {
      dispatch(setMessageFilter(data))
      if (!data) {
        dispatch(clearMessageTypes())
      }
    })

    DeviceEventEmitter.addListener('onUpdate', (data) => {
      dispatch(setMessageTypes(data))
    })

    return () => {
      callback()
    }
  }, [callback, dispatch])

  return (
    <Box flex={1}>
      <MessageFilter
        ref={ref}
        style={{
          flex: 1,
        }}
        data={messageTypes}
        isChecked={isMessageFilter}
      />
    </Box>
  )
}
