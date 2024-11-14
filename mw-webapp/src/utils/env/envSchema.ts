import {str} from "envalid";

export const envSchema = {
  API_BASE_PATH: str(),
  API_CHAT_BASE_PATH: str(),
  API_SURVEY_BASE_PATH: str(),
  API_NOTIFICATION_BASE_PATH: str(),
  GOOGLE_MEASUREMENT_ID: str(),
  ENV_TYPE: str(),
  AMPLITUDE_KEY: str(),
  API_MW_CHAT_WEBSOCKET_PATH: str(),
  API_MW_NOTIFICATION_WEBSOCKET_PATH: str(),
};
