import React, { useState } from 'react'
import { AMapSdk, MapView, MapType, Marker } from 'react-native-amap3d'
import { init, Geolocation } from 'react-native-amap-geolocation'

import { permission } from '@/util'

export function Map() {
  const [location, setLocation] = useState({
    latitude: 30.5070073136859,
    longitude: 114.2019264661436,
  })

  AMapSdk.init('4a4e97706301401efa5453cdfa432a1e')

  React.useEffect(() => {
    getLocation()

    async function getLocation() {
      await permission([
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_COARSE_LOCATION',
      ])

      await init({
        ios: '4a4e97706301401efa5453cdfa432a1e',
        android: '4a4e97706301401efa5453cdfa432a1e',
      })

      Geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })
        },
        () => {}
      )
    }
  }, [])

  return (
    <MapView
      mapType={MapType.Standard}
      zoomControlsEnabled={false}
      buildingsEnabled={true}
      initialCameraPosition={{
        target: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        zoom: 17,
      }}>
      <Marker position={{ latitude: location.latitude, longitude: location.longitude }} />
      {/* <Polyline
        width={5}
        color="rgba(255, 0, 0, 0.5)"
        points={[
          {
            latitude: 30.5928,
            longitude: 114.3055,
          },
          {
            latitude: 30.5948,
            longitude: 114.3255,
          },
        ]}
      /> */}
    </MapView>
  )
}
