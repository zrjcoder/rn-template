package com.policemobile.map

import android.annotation.SuppressLint
import androidx.compose.runtime.Composable
import com.amap.api.maps2d.AMap
import com.amap.api.maps2d.MapView
import com.amap.api.maps2d.model.CameraPosition
import com.amap.api.maps2d.model.MyLocationStyle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.ReactEventEmitter

@SuppressLint("ViewConstructor")
class MapView(context: ThemedReactContext) : MapView(context) {
    private val eventEmitter =
        context.getJSModule(com.facebook.react.uimanager.events.RCTEventEmitter::class.java)

    private lateinit var locationStyle: MyLocationStyle
    private var initPosition: ReadableMap? = null

    init {
        super.onCreate(null)

        locationStyle = MyLocationStyle()
        locationStyle.myLocationType(MyLocationStyle.LOCATION_TYPE_SHOW)
        map.setMyLocationStyle(locationStyle)

        map.setOnMapLoadedListener {
            emit(id, "onLoad")
        }

        map.setOnCameraChangeListener(object: AMap.OnCameraChangeListener {
            override fun onCameraChange(position: CameraPosition?) {
//                emit(id, "onCameraMove", Arguments.createMap().apply {
//                    putMap("cameraPosition", position?.toJson())
//                    putMap("latLngBounds", map.projection.visibleRegion.latLngBounds.toJson())
//                })
            }

            override fun onCameraChangeFinish(position: CameraPosition?) {
//                emit(id, "onCameraIdle", Arguments.createMap().apply {
//                    putMap("cameraPosition", position?.toJson())
//                    putMap("latLngBounds", map.projection.visibleRegion.latLngBounds.toJson())
//                })
            }
        })
    }

    fun emit(id: Int?, event: String, data: WritableMap = Arguments.createMap()) {
        id?.let { eventEmitter.receiveEvent(it, event, data) }
    }
}
