import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  const env = loadEnv("", process.cwd(), "");

  return {
    build: {outDir: "build"},
    plugins: [react(), eslint(), viteTsconfigPaths()],
    define: {
      "import.meta.env.AUTH_FIREBASE_API_KEY": JSON.stringify(env.AUTH_FIREBASE_API_KEY),
      "import.meta.env.AUTH_FIREBASE_AUTH_DOMAIN": JSON.stringify(env.AUTH_FIREBASE_AUTH_DOMAIN),
      "import.meta.env.AUTH_FIREBASE_PROJECT_ID": JSON.stringify(env.AUTH_FIREBASE_PROJECT_ID),
      "import.meta.env.AUTH_FIREBASE_STORAGE_BUCKET": JSON.stringify(env.AUTH_FIREBASE_STORAGE_BUCKET),
      "import.meta.env.AUTH_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(env.AUTH_FIREBASE_MESSAGING_SENDER_ID),
      "import.meta.env.AUTH_FIREBASE_APP_ID": JSON.stringify(env.AUTH_FIREBASE_APP_ID),
    },
  };
});