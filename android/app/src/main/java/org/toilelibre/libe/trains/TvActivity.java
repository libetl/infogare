package org.toilelibre.libe.trains;

import android.view.KeyEvent;

import com.facebook.react.ReactActivity;

import org.toilelibre.libe.trains.keyevent.KeyEventModule;

public class TvActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Infogare";
  }

  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
    KeyEventModule.getInstance().onKeyDownEvent(keyCode);
    super.onKeyDown(keyCode, event);
    return false;
  }

  @Override
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    KeyEventModule.getInstance().onKeyUpEvent(keyCode);
    super.onKeyUp(keyCode, event);
    return false;
  }

}