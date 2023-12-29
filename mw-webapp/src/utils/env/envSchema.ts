import {str} from "envalid";

export const envSchema = {
  FIREBASE_API_KEY: str(),
  FIREBASE_AUTH_DOMAIN: str(),
  FIREBASE_DATABASE_URL: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_STORAGE_BUCKET: str(),
  FIREBASE_MESSAGING_SENDER_ID: str(),
  FIREBASE_APP_ID: str(),
  LOG_FEATURE_FLAG: str(),
};
