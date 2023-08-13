package com.policemobile.map

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager

internal class MapViewManager : ViewGroupManager<MapView>() {
//    private val commands = mapOf(
//        "moveCamera" to { view: com.policemobile.map.MapView, args: ReadableArray? -> view.map.moveCamera(args as CameraUpdate) },
////        "call" to { view: com.policemobile.map.MapView, args: ReadableArray? -> view.map. },
//    )
    override fun getName(): String {
        return "HMapView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): MapView {
        return MapView(reactContext)
    }

    override fun onDropViewInstance(view: MapView) {
        super.onDropViewInstance(view)
        view.onDestroy()
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
        return getEventTypeConstants(
            "onLoad",
        )
    }

//
//    override fun getCommandsMap(): MutableMap<String, Int>? {
//        return commands.keys.mapIndexed { index, key ->
//            key to index
//        }.toMap().toMutableMap()
//    }
//
//    override fun receiveCommand(root: com.policemobile.map.MapView, commandId: String?, args: ReadableArray?) {
//        commands[commandId]?.invoke(root, args)
//    }
//
//    override fun addView(mapView: com.policemobile.map.MapView?, child: View?, index: Int) {
//        mapView?.addView(child)
//        super.addView(mapView, child, index)
//    }
//
//    override fun removeViewAt(parent: com.policemobile.map.MapView?, index: Int) {
//        parent?.removeViewAt(index)
//        super.removeViewAt(parent, index)
//    }
//
//    @ReactProp(name = "initPosition")
//    fun setInitPosition(view: com.policemobile.map.MapView, initPosition: ReadableArray) {
////        view.map.moveCamera(CameraUpdateFactory.newLatLngZoom(LatLng(initPosition.getDouble(0), initPosition.getDouble(1)), 15f))
//    }
}

