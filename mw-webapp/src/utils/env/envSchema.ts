import {str} from "envalid";

export const envSchema = {
  FIREBASE_API_KEY: str(),
  FIREBASE_AUTH_DOMAIN: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_STORAGE_BUCKET: str(),
  FIREBASE_MESSAGING_SENDER_ID: str(),
  FIREBASE_APP_ID: str(),
  FIREBASE_MEASUREMENT_ID: str(), // Need if you want to use google analytics
  IS_LOGGER_ENABLED: str(),
  API_BASE_PATH: str(),
  GOOGLE_MEASUREMENT_ID: str(),
  ENV_TYPE: str(),
};
