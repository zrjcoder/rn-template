package com.policemobile.map

import com.amap.api.maps2d.model.CameraPosition
import com.amap.api.maps2d.model.LatLng
import com.amap.api.maps2d.model.LatLngBounds
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

fun getEventTypeConstants(vararg list: String): Map<String, Any> {
    return list.associateWith {
        mapOf("phasedRegistrationNames" to mapOf("bubbled" to it))
    }
}

fun CameraPosition.toJson(): WritableMap {
    return Arguments.createMap().apply {
        putMap("target", target.toJson())
        putDouble("zoom", zoom.toDouble())
        putDouble("tilt", tilt.toDouble())
        putDouble("bearing", bearing.toDouble())
    }
}

fun LatLng.toJson(): ReadableMap? {
    return Arguments.createMap().apply {
        putDouble("latitude", latitude)
        putDouble("longitude", longitude)
    }
}

fun LatLngBounds.toJson(): WritableMap {
    return Arguments.createMap().apply {
        putMap("southwest", southwest.toJson())
        putMap("northeast", northeast.toJson())
    }
}
