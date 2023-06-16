import React from 'react'
import { AMapSdk, MapView } from 'react-native-amap3d'
import { PermissionsAndroid } from 'react-native'
import { init, Geolocation } from 'react-native-amap-geolocation'

export function Map() {
  AMapSdk.init('560b0fd3d7a823553d20f732c357152d')

  React.useEffect(() => {
    location()

    async function location() {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])

      await init({
        ios: '',
        android: '560b0fd3d7a823553d20f732c357152d',
      })

      Geolocation.getCurrentPosition(
        ({ coords }) => {
          console.log(coords)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }, [])

  return (
    <MapView
      // mapType={MapType.Satellite}
      initialCameraPosition={{
        target: {
          latitude: 39.91095,
          longitude: 116.37296,
        },
        zoom: 8,
      }}
    />
  )
}
