package com.policemobile.map

import android.content.Context
import android.view.View
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.policemobile.R

class MapViewManager : SimpleViewManager<View>() {
    override fun getName(): String {
        return "MapView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): View {
        return createComposeView(reactContext)
    }

    private fun createComposeView(context: Context): View {
        return ComposeView(context).apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                MessageCard(message = "Hello Native Compose")
            }
        }
    }

    @ReactProp(name = "color")
    fun setColor(view: View, color: String) {
        view.setBackgroundColor(android.graphics.Color.parseColor(color))
        view.setOnClickListener {

        }
    }

    @OptIn(ExperimentalMaterial3Api::class)
    @Preview
    @Composable
    private fun MessageCard(title: String = "default title", message: String = "default message") {
        Card(
            modifier = Modifier.size(height = 100.dp, width = 100.dp)
        ) {
            Image(
                painter = painterResource(R.mipmap.ic_launcher_round),
                contentDescription = null,
            )

            Column {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleSmall,
                    modifier = Modifier.padding(all = 6.dp),
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = message,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(all = 6.dp),
                )
            }
        }
    }
}