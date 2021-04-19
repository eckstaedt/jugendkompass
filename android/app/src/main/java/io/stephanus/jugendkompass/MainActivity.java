package io.stephanus.jugendkompass;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.equimaps.capacitorblobwriter.BlobWriter;
import com.jeep.plugin.capacitor.CapacitorVideoPlayer;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(BlobWriter.class);
      add(CapacitorVideoPlayer.class);
    }});
  }
}
