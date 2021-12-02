package io.stephanus.jugendkompass;

import android.os.Bundle;

import android.content.res.Configuration;
import android.webkit.WebSettings;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  void setDarkMode() {
    int nightModeFlags = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
    WebSettings webSettings = this.bridge.getWebView().getSettings();

    String darkMode = " AndroidDarkMode";
    if (nightModeFlags == Configuration.UI_MODE_NIGHT_YES) {
      String userAgent = webSettings.getUserAgentString();
      if (!userAgent.contains(darkMode)) {
        userAgent = userAgent + darkMode;
        webSettings.setUserAgentString(userAgent);
      }
    } else {
      String userAgent = webSettings.getUserAgentString();
      if (userAgent.contains(darkMode)) {
        userAgent = userAgent.replace(darkMode, "");
        webSettings.setUserAgentString(userAgent);
      }
    }
  }

  @Override
  public void onStart() {
    super.onStart();
    setDarkMode();
  }

  @Override
  public void onResume() {
    super.onResume();
    setDarkMode();
  }
}
