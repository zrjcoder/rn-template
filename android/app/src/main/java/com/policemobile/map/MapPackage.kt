package com.policemobile.map

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class AMapPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            MapViewManager(),
        )
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        val modules = mutableListOf<NativeModule>()

        modules.add(MapModule(reactContext))

        return modules
    }
}