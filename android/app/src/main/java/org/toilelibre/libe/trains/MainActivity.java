package org.toilelibre.libe.trains;

import android.support.v4.content.ContextCompat;

import android.support.v7.app.AppCompatDelegate;

import android.os.Build;
import android.os.Bundle;

import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;

import org.toilelibre.libe.trains.R;

public class MainActivity extends ReactActivity {
    static {
        AppCompatDelegate.setCompatVectorFromResourcesEnabled(true);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onResume() {
        super.onResume();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = this.getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(ContextCompat.getColor(this, R.color.statusBar));
        }
    }

    @Override
    protected String getMainComponentName() {
        return "Infogare";
    }
}