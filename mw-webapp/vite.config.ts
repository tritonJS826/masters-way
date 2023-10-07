import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";
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
  ];

  /**
   * Return envs
   */
  const getEnvs = (envs: string[]) => envs.reduce((prev, envName) => {
    return {
      ...prev,
      [`import.meta.env.${envName}`]: JSON.stringify(env[envName]),
    };
  }, {});

  return {
    build: {target: "esnext", outDir: "build"},
    plugins: [
      react(),
      eslint(
        // Exclude "virtual" to fix bug with vite-plugin-eslint and Storybook
        // https://github.com/storybookjs/builder-vite/issues/535#issuecomment-1507352550
        {exclude: ["/virtual:/**"]},
      ),
      viteTsconfigPaths(),
    ],
    define: getEnvs(envNames),
  };
});
