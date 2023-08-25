import { Platform } from 'react-native'
import WebSocket from 'ws'

interface WebSocketManagerOptions {
  url: string
  onOpen?: () => void
  onClose?: (event: WebSocket.CloseEvent) => void
  onMessage?: (event: WebSocket.MessageEvent) => void
  onError?: (event: WebSocket.ErrorEvent) => void
}

class WebSocketManager {
  private ws: WebSocket | null = null

  constructor(options: WebSocketManagerOptions) {
    const { url, onOpen, onClose, onMessage, onError } = options

    this.ws = new WebSocket(url, {})
    this.ws.onopen = onOpen
    this.ws.onclose = onClose
    this.ws.onmessage = onMessage
    this.ws.onerror = onError
  }

  send(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    }
  }

  close() {
    if (this.ws) {
      this.ws.close()
    }
  }
}

export default WebSocketManager
