/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

VITE_APP_FIREBASE_API_KEY = "AIzaSyDSwyqMv3nf_knUcjTpZ4tahlcglsPviDQ";
VITE_APP_FIREBASE_AUTH_DOMAIN = "onboarding-6610f.firebaseapp.com";
VITE_APP_FIREBASE_DATABASE_URL = "https://onboarding.firebaseio.com";
VITE_APP_FIREBASE_PROJECT_ID = "onboarding-6610f";
VITE_APP_FIREBASE_STORAGE_BUCKET = "onboarding-6610f.appspot.com";
VITE_APP_FIREBASE_MESSAGING_SENDER_ID = "775454494556";
VITE_APP_FIREBASE_APP_ID = "1:775454494556:web:e007c9e79bd84f43577b99";
