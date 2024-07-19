import {str} from "envalid";

export const envSchema = {
  API_BASE_PATH: str(),
  API_CHAT_BASE_PATH: str(),
  GOOGLE_MEASUREMENT_ID: str(),
  ENV_TYPE: str(),
};
