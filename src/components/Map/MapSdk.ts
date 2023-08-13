import { NativeModules } from 'react-native'

const { MapSdk } = NativeModules

interface MapSdkInterface {
  getPosition(
    callback: ({
      address,
      latitude,
      longitude,
    }: {
      address: string
      latitude: number
      longitude: number
    }) => void
  ): void
}

const MapSdkTyped = MapSdk as MapSdkInterface
export { MapSdkTyped as MapSdk }
