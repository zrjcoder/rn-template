package com.policemobile.ocr;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.baidu.ocr.sdk.OCR;
import com.baidu.ocr.sdk.OnResultListener;
import com.baidu.ocr.sdk.exception.OCRError;
import com.baidu.ocr.sdk.model.AccessToken;
import com.baidu.ocr.sdk.model.IDCardParams;
import com.baidu.ocr.sdk.model.IDCardResult;
import com.baidu.ocr.ui.camera.CameraActivity;
import com.baidu.ocr.ui.camera.CameraNativeHelper;
import com.baidu.ocr.ui.camera.CameraView;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;

import com.policemobile.MainActivity;
import com.policemobile.utils.Constant;
import com.policemobile.utils.FileUtil;

public class OCRModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    public static String TAG = "OCRModule";

    private final ReactApplicationContext mReactContext;

    private static final int REQUEST_CODE_CAMERA = 102;

    private Promise mCallback;

    public OCRModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "OCR";
    }


    /**
     * 用明文ak，sk初始化
     */
    @ReactMethod
    public void initAccessTokenWithAkSk() {
        OCR.getInstance(mReactContext).initAccessTokenWithAkSk(new OnResultListener<AccessToken>() {
            @Override
            public void onResult(AccessToken result) {
                initBaidOCRNativeSDK();
            }

            @Override
            public void onError(OCRError error) {
                error.printStackTrace();
//                Toast.makeText(mReactContext, "身份证识别SDK初始化失败", Toast.LENGTH_SHORT).show();
            }
        }, getReactApplicationContext(), Constant.Ak, Constant.Ck);
    }

    private void initBaidOCRNativeSDK() {
        //  初始化本地质量控制模型,释放代码在onDestory中
        //  调用身份证扫描必须加上 intent.putExtra(CameraActivity.KEY_NATIVE_MANUAL, true); 关闭自动初始化和释放本地模型
        CameraNativeHelper.init(mReactContext, OCR.getInstance(mReactContext).getLicense(),
                new CameraNativeHelper.CameraNativeInitCallback() {
                    @Override
                    public void onError(int errorCode, Throwable e) {
                        String msg;
                        switch (errorCode) {
                            case CameraView.NATIVE_SOLOAD_FAIL:
                                msg = "加载so失败，请确保apk中存在ui部分的so";
                                break;
                            case CameraView.NATIVE_AUTH_FAIL:
                                msg = "授权本地质量控制token获取失败";
                                break;
                            case CameraView.NATIVE_INIT_FAIL:
                                msg = "本地质量控制";
                                break;
                            default:
                                msg = String.valueOf(errorCode);
                        }
                      //  Toast.makeText(mReactContext, msg, Toast.LENGTH_SHORT).show();
                    }
                });
    }

    @ReactMethod
    public void releaseBaidOCRNativeSDK() {
        // 释放本地质量控制模型
        CameraNativeHelper.release();
    }

    @ReactMethod
    public void scanIdCardFront(Promise promise) {
        mCallback = promise;
        MainActivity mainActivity = (MainActivity) getCurrentActivity();
        Intent intent = new Intent(mainActivity, CameraActivity.class);
        intent.putExtra(CameraActivity.KEY_OUTPUT_FILE_PATH,
                FileUtil.getSaveFile(getReactApplicationContext()).getAbsolutePath());
        intent.putExtra(CameraActivity.KEY_NATIVE_ENABLE,
                true);
        // KEY_NATIVE_MANUAL设置了之后CameraActivity中不再自动初始化和释放模型
        // 请手动使用CameraNativeHelper初始化和释放模型
        // 推荐这样做，可以避免一些activity切换导致的不必要的异常
        intent.putExtra(CameraActivity.KEY_NATIVE_MANUAL,
                true);
        intent.putExtra(CameraActivity.KEY_CONTENT_TYPE, CameraActivity.CONTENT_TYPE_ID_CARD_FRONT);
        mainActivity.startActivityForResult(intent, REQUEST_CODE_CAMERA);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_CODE_CAMERA && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                String contentType = data.getStringExtra(CameraActivity.KEY_CONTENT_TYPE);
                String filePath = FileUtil.getSaveFile(getReactApplicationContext()).getAbsolutePath();
                if (!TextUtils.isEmpty(contentType)) {
                    if (CameraActivity.CONTENT_TYPE_ID_CARD_FRONT.equals(contentType)) {
                        recIDCard(IDCardParams.ID_CARD_SIDE_FRONT, filePath);
                    } else if (CameraActivity.CONTENT_TYPE_ID_CARD_BACK.equals(contentType)) {
                        recIDCard(IDCardParams.ID_CARD_SIDE_BACK, filePath);
                    }
                }
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    private void recIDCard(String idCardSide, String filePath) {
        WritableMap resultMap = Arguments.createMap();

        IDCardParams param = new IDCardParams();
        param.setImageFile(new File(filePath));
        // 设置身份证正反面
        param.setIdCardSide(idCardSide);
        // 设置方向检测
        param.setDetectDirection(true);
        // 设置图像参数压缩质量0-100, 越大图像质量越好但是请求时间越长。 不设置则默认值为20
        param.setImageQuality(20);

        OCR.getInstance(mReactContext).recognizeIDCard(param, new OnResultListener<IDCardResult>() {
            @Override
            public void onResult(IDCardResult result) {
                if (result != null) {
                    resultMap.putString("idCardNumber", result.getIdNumber().toString());
                    resultMap.putString("name", result.getName().toString());
                    resultMap.putString("address", result.getAddress().toString());
                    resultMap.putString("birthday", result.getBirthday().toString());
                    resultMap.putString("gender", result.getGender().toString());
                    mCallback.resolve(resultMap);
                }
            }

            @Override
            public void onError(OCRError error) {
                mCallback.reject("NO_RESULT", "NO_RESULT");
            }
        });
    }
}
