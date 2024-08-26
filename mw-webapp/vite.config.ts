import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";
import eslint from "vite-plugin-eslint";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { cleanEnv } from 'envalid'
import { envSchema } from "./src/utils/env/envSchema";
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig(() => {
  const env = loadEnv("", process.cwd(), "");
  const validatedEnvs = cleanEnv(env, envSchema);

  const isProd = env.ENV_TYPE === "prod";

  const config = {
    build: {
      target: "esnext",
      outDir: "build",
      cache: true
    },
    plugins: [
      react(),
      eslint(
        // Exclude "virtual" and "sb-preview" to fix bug with vite-plugin-eslint and Storybook
        // https://github.com/storybookjs/builder-vite/issues/535#issuecomment-1507352550
        // https://github.com/vitejs/vite/issues/15374
        {
          exclude: ["/virtual:/**", "/sb-preview/**"], 
          failOnError: false
        },
      ),
      viteTsconfigPaths(),
    ],
    define: {
      'process.env': validatedEnvs,
    },
  };

  // there was issues with cypress e2e testing when this plugin is in plugins list
  // so i moved it only for prod mode
  // hope we will fix it one day
  if (isProd) {
    config.plugins.push(
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        // manifest: {
        //   name: 'My App',
        //   short_name: 'MyApp',
        //   description: 'My awesome app',
        //   theme_color: '#ffffff',
        //   icons: [
        //     {
        //       src: 'pwa-192x192.png',
        //       sizes: '192x192',
        //       type: 'image/png',
        //     },
        //     {
        //       src: 'pwa-512x512.png',
        //       sizes: '512x512',
        //       type: 'image/png',
        //     },
        //   ],
        // },
        // workbox: {
        //   // Если нужно, вы можете кастомизировать воркер, используя Workbox
        //   // Например, можете настроить стратегии кэширования и другие параметры.
        // }
      })
    )
  }

  return config;
});
