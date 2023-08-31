import React from 'react'
import { Box } from 'native-base'
import Webview from 'react-native-webview'

export function Map() {
  const webviewRef = React.useRef<any>(null)

  return (
    <Webview
      ref={webviewRef}
      style={{
        flex: 1,
      }}
      source={{
        uri: 'http://192.168.1.113:8980/mobile.html',
      }}
      onMessage={handleMessage}
    />
  )

  function handleMessage(event: any) {
    const msg = JSON.parse(event.nativeEvent.data)
    console.log('event: ', event)
    if (msg.code === 'mapLoaded') {
      webviewRef.current.postMessage(
        JSON.stringify({
          code: 'warningHandle',
          data: {
            start: {
              coordX: 113.13160299596072,
              coordY: 40.984673014978405,
            },
            end: {
              coordX: 113.23160299596072,
              coordY: 40.984673014978405,
            },
            isLocation: true,
          },
        })
      )
    }
  }
}
