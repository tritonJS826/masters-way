import {str} from "envalid";

export const envSchema = {
  API_BASE_PATH: str(),
  GOOGLE_MEASUREMENT_ID: str(),
  ENV_TYPE: str(),
  API_MW_CHAT_WEBSOCKET_PATH: str(),
  API_MW_TEST_WEBSOCKET_PATH: str(),
  API_NOTIFICATION_BASE_PATH: str(),
  API_MW_TEST_WEBSOCKET_REST_PATH: str(),
  API_LOGO_DEV_TOKEN: str(),
};
