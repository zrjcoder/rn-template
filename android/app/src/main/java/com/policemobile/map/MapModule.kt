package com.policemobile.map

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import com.amap.api.location.AMapLocationClient
import com.amap.api.location.AMapLocationClientOption
import com.amap.api.location.AMapLocationClientOption.AMapLocationMode
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.policemobile.utils.PermissionsUtil

internal class MapModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        private lateinit var reactContext: ReactApplicationContext

        @SuppressLint("StaticFieldLeak")
        lateinit var mlocationClient: AMapLocationClient
    }

    private var pickerPromise: Promise? = null

    private val activityEventListener =
        object : BaseActivityEventListener() {
            override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
                if (requestCode == 5) {
                    pickerPromise?.let { promise ->
                        when (resultCode) {
                            Activity.RESULT_OK -> {
                                val uri = data?.data

                                uri?.let { promise.resolve(uri.toString()) }
                            }
                            Activity.RESULT_CANCELED -> {
                                promise.reject("选取图片失败")
                            }
                        }

                        pickerPromise = null
                    }
                }
            }
        }

    init {
        reactContext = context
        mlocationClient = AMapLocationClient(reactContext)

        reactContext.addActivityEventListener(activityEventListener)
    }

    @Override
    override fun getName(): String {
        return "MapSdk"
    }

    @ReactMethod
    fun getPosition(rCallback: Callback) {
        val requiredPermissions = listOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        )

        PermissionsUtil.permissionsCheck(currentActivity, requiredPermissions) {
            val mLocationOption = AMapLocationClientOption()
            mLocationOption.setLocationMode(AMapLocationMode.Hight_Accuracy)
            mLocationOption.setOnceLocation(true)
            mlocationClient.setLocationOption(mLocationOption)
            mlocationClient.setLocationListener() {
                val locationMap = Arguments.createMap()
                locationMap.putString("address", it.address)
                locationMap.putDouble("latitude", it.latitude)
                locationMap.putDouble("longitude", it.longitude)
                rCallback.invoke(locationMap)
            }
            mlocationClient.startLocation()

            null
        }
    }

    @ReactMethod
    fun pickImage(promise: Promise) {
        val activity = currentActivity ?: return

        pickerPromise = promise

        try {
            val galleryIntent = Intent(Intent.ACTION_PICK).apply { type = "image/*" }

            val chooserIntent = Intent.createChooser(galleryIntent, "pick an image")

            activity.startActivityForResult(chooserIntent, 5)
        } catch (t: Throwable) {
            pickerPromise?.reject("error", t)
            pickerPromise = null
        }

    }
}

