import type { CapacitorConfig } from '@capacitor/cli';

// This app is server-dependent (Gemini, Postgres, ~20 API routes) and can't
// be a static export — `webDir` still has to point at a real (if minimal)
// directory for `cap sync` to run, but `server.url` is what the native
// shell actually loads: the live deployed site, not local files.
const config: CapacitorConfig = {
  appId: 'com.mastertalk.app',
  appName: 'MasterSpeak',
  webDir: 'out',
  server: {
    url: 'https://speech-coach-beta.vercel.app',
    cleartext: false,
  },
  plugins: {
    // Dark style = light (white) status bar text/icons, for this app's
    // dark navy NavBar — the OS default is Light style (dark icons),
    // invisible against that background. overlaysWebView stays at its
    // default (true) deliberately: app/layout.tsx's viewportFit: "cover"
    // + NavBar.tsx's pt-[env(safe-area-inset-top)] already handle the
    // status-bar/notch area entirely in CSS; overlaysWebView: false would
    // make the OS reserve that space too, doubling the gap. (backgroundColor
    // is intentionally omitted — it's a documented no-op whenever
    // overlaysWebView is true.)
    StatusBar: {
      style: 'DARK',
      overlaysWebView: true,
    },
    // Branded navy launch screen (see Base.lproj/LaunchScreen.storyboard)
    // instead of the Capacitor template's default white-background logo
    // mark that shipped until now. autoHide lets the web view take over
    // the instant it's ready rather than holding a fixed delay.
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#10233F',
      showSpinner: false,
    },
  },
};

export default config;
