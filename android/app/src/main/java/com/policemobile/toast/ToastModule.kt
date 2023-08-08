package com.policemobile.toast

import android.widget.Toast
//import com.amap.api.navi.model.AMapNaviLocation
//import com.amap.api.navi.model.NaviLatLng
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        private lateinit var reactContext: ReactApplicationContext

        private const val DURATION_SHORT_KEY = "SHORT"
        private const val DURATION_LONG_KEY = "LONG"
    }

    init {
        reactContext = context
    }

    @Override
    override fun getName(): String {
        return "ToastExample"
    }

    override fun getConstants(): MutableMap<String, Int> {
        val constants: MutableMap<String, Int> = HashMap()
        constants[DURATION_LONG_KEY] = Toast.LENGTH_LONG
        constants[DURATION_SHORT_KEY] = Toast.LENGTH_SHORT

        return constants
    }

    @ReactMethod
    fun show(message: String, duration: Int) {
        Toast.makeText(reactContext, message, duration).show()
    }

    @ReactMethod
    fun showLocation() {
//        val map = AMapNaviLocation()
//        println(map)
    }
}


