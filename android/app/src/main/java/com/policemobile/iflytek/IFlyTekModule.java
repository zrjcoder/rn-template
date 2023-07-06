package com.policemobile.iflytek;

import android.Manifest;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.policemobile.utils.JsonParser;
import com.policemobile.utils.PermissionsUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.iflytek.cloud.ErrorCode;
import com.iflytek.cloud.InitListener;
import com.iflytek.cloud.RecognizerListener;
import com.iflytek.cloud.RecognizerResult;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechError;
import com.iflytek.cloud.SpeechRecognizer;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.concurrent.Callable;

public class IFlyTekModule extends ReactContextBaseJavaModule {
    public static String TAG = "IFlyTekModule";

    private final ReactApplicationContext mReactContext;

    // 语音听写对象
    private SpeechRecognizer mIat;

    // 用HashMap存储听写结果
    private HashMap<String, String> mIatResults = new LinkedHashMap<String, String>();

    public IFlyTekModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "IFlyTek";
    }


    //定义发送事件的函数
    public void sendEventToUi(@Nullable WritableMap params) {
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("iflyteklistener", params);
    }

    @ReactMethod
    public void startRecognizer(Promise promise) {

        List<String> requiredPermissions = Arrays.asList(Manifest.permission.RECORD_AUDIO);

        PermissionsUtil.permissionsCheck(getCurrentActivity(), promise, requiredPermissions, new Callable<Void>() {
            @Override
            public Void call() throws Exception {
                mIat = SpeechRecognizer.createRecognizer(getCurrentActivity(), mInitListener);

                setParam();

                int ret = mIat.startListening(new RecognizerListener() {
                    @Override
                    public void onVolumeChanged(int i, byte[] bytes) {

                    }

                    @Override
                    public void onBeginOfSpeech() {
                        Log.d(TAG, "开始说话");
                        WritableMap params = Arguments.createMap();
                        params.putString("state", "begin");
                        sendEventToUi(params);
                    }

                    @Override
                    public void onEndOfSpeech() {
                        Log.d(TAG, "结束说话");
                        WritableMap params = Arguments.createMap();
                        params.putString("state", "end");
                        sendEventToUi(params);
                    }

                    @Override
                    public void onResult(RecognizerResult recognizerResult, boolean b) {
                        printResult(recognizerResult);
                        if (b) {
                            StringBuffer resultBuffer = new StringBuffer();
                            for (String key : mIatResults.keySet()) {
                                resultBuffer.append(mIatResults.get(key));
                            }
                            Log.d(TAG, "result str==" + resultBuffer.toString());

                            WritableMap params = Arguments.createMap();
                            params.putString("state", "success");
                            params.putString("result", resultBuffer.toString());
                            sendEventToUi(params);
                        }
                    }

                    @Override
                    public void onError(SpeechError speechError) {
                        Log.d(TAG, speechError.getPlainDescription(true));
                        WritableMap params = Arguments.createMap();
                        params.putString("state", "error");
                        params.putString("errorMsg", speechError.getPlainDescription(true));
                        sendEventToUi(params);
                    }

                    @Override
                    public void onEvent(int i, int i1, int i2, Bundle bundle) {

                    }
                });
                if (ret != ErrorCode.SUCCESS) {
                    Log.d(TAG, "错误码：" + ret);
                } else {
                    Log.d(TAG, "请开始说话");
                }
                return null;
            }
        });

    }

    @ReactMethod
    public void stopRecognizer() {
        if (mIat != null) {
            mIat.stopListening();
        }
    }

    /**
     * 初始化监听器。
     */
    private InitListener mInitListener = new InitListener() {

        @Override
        public void onInit(int code) {
            Log.d(TAG, "SpeechRecognizer init() code = " + code);
            if (code != ErrorCode.SUCCESS) {
                Toast.makeText(mReactContext,"初始化失败，错误码：" + code, Toast.LENGTH_SHORT).show();
            }
        }
    };

    public void setParam() {
        // 清空参数
        mIat.setParameter(SpeechConstant.PARAMS, null);

        // 设置听写引擎
        mIat.setParameter(SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_CLOUD);
        // 设置返回结果格式
        mIat.setParameter(SpeechConstant.RESULT_TYPE, "json");

        mIat.setParameter(SpeechConstant.LANGUAGE, "zh_cn");
            // 设置语言区域
        mIat.setParameter(SpeechConstant.ACCENT, "mandarin");
        //此处用于设置dialog中不显示错误码信息
        //mIat.setParameter("view_tips_plain","false");

        // 设置语音前端点:静音超时时间，即用户多长时间不说话则当做超时处理
        mIat.setParameter(SpeechConstant.VAD_BOS,  "4000");

        // 设置语音后端点:后端点静音检测时间，即用户停止说话多长时间内即认为不再输入， 自动停止录音
        mIat.setParameter(SpeechConstant.VAD_EOS, "1000");

        // 设置标点符号,设置为"0"返回结果无标点,设置为"1"返回结果有标点
        mIat.setParameter(SpeechConstant.ASR_PTT, "1");

        // 设置音频保存路径，保存音频格式支持pcm、wav，设置路径为sd卡请注意WRITE_EXTERNAL_STORAGE权限
        mIat.setParameter(SpeechConstant.AUDIO_FORMAT,"wav");
        mIat.setParameter(SpeechConstant.ASR_AUDIO_PATH, Environment.getExternalStorageDirectory()+"/msc/iat.wav");
    }

    private void printResult(RecognizerResult results) {
        String text = JsonParser.parseIatResult(results.getResultString());

        String sn = null;
        // 读取json结果中的sn字段
        try {
            JSONObject resultJson = new JSONObject(results.getResultString());
            sn = resultJson.optString("sn");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        mIatResults.put(sn, text);


    }
}
