package com.simpleanimation;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.facebook.react.ReactApplication;
import com.futurice.rctaudiotoolkit.AudioPackage;
import com.johnsonsu.rnsoundplayer.RNSoundPlayerPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.sandro.openalpr.CameraReactPackage;
import com.wenkesj.voice.VoicePackage;
import com.horcrux.svg.SvgPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.audioStreaming.ReactNativeAudioStreamingPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.futurice.rctaudiotoolkit.AudioPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AudioPackage(),
            new RNSoundPlayerPackage(),
            new TrackPlayer(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new CameraReactPackage(),
            new VoicePackage(),
            new SvgPackage(),
            new RNFirebasePackage(),
            new ReactNativeAudioStreamingPackage(),
            new MapsPackage(),
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
