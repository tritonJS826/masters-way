import {cleanEnv} from "envalid";
import {envSchema} from "src/utils/env/envSchema";

/**
 * Validated typed env
 */
export const env = cleanEnv(process.env, envSchema);