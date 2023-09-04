import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  const env = loadEnv("", process.cwd(), "");
  const envNames = [
    "FIREBASE_API_KEY",
    "FIREBASE_AUTH_DOMAIN",
    "FIREBASE_DATABASE_URL",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_STORAGE_BUCKET",
    "FIREBASE_MESSAGING_SENDER_ID",
    "FIREBASE_APP_ID",
    "AUTH_FIREBASE_API_KEY",
    "AUTH_FIREBASE_AUTH_DOMAIN",
    "AUTH_FIREBASE_PROJECT_ID",
    "AUTH_FIREBASE_STORAGE_BUCKET",
    "AUTH_FIREBASE_MESSAGING_SENDER_ID",
    "AUTH_FIREBASE_APP_ID",
  ];

  const getEnvs = (envs: string[]) => envs.reduce((prev, envName) => {
    return {
      ...prev,
      [`import.meta.env.${envName}`]: JSON.stringify(env[envName]),
    };
  }, {});

  return {
    build: {outDir: "build"},
    plugins: [react(), eslint(), viteTsconfigPaths()],
    define: getEnvs(envNames),
  };
});