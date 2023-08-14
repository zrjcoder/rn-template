package com.policemobile.calendar

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "Calendar"
    }

    @ReactMethod
    fun createCalendarEvent(name: String, location: String, callback: Callback) {
    }
}