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
};

export default config;
