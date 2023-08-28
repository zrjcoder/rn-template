import React from 'react'
import { Box } from 'native-base'
import Webview from 'react-native-webview'

export function Map() {
  return (
    <Webview
      style={{
        flex: 1,
      }}
      source={{
        uri: 'http://192.168.1.114:8980/mobile.html',
      }}
    />
  )
}
