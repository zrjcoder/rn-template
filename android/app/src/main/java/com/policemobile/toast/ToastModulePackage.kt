package com.policemobile.toast

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.*

class CustomToastPackage: ReactPackage {
    override fun createViewManagers(p0: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>> {
        return Collections.emptyList()
    }

    override fun createNativeModules(p0: ReactApplicationContext): MutableList<NativeModule> {
        val modules = mutableListOf<NativeModule>()

        modules.add(ToastModule(p0))

        return modules
    }
}