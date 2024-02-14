import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";
import eslint from "vite-plugin-eslint";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { cleanEnv } from 'envalid'
import { envSchema } from "./src/utils/env/envSchema";

export default defineConfig(() => {
  const env = loadEnv("", process.cwd(), "");
  const validatedEnvs = cleanEnv(env, envSchema);

  return {
    build: {target: "esnext", outDir: "build"},
    plugins: [
      react(),
      eslint(
        // Exclude "virtual" to fix bug with vite-plugin-eslint and Storybook
        // https://github.com/storybookjs/builder-vite/issues/535#issuecomment-1507352550
        {
          exclude: ["/virtual:/**", "/sb-preview/**"], 
          failOnError: false},
      ),
      viteTsconfigPaths(),
    ],
    define: {
      'process.env': validatedEnvs,
    },
  };
});
