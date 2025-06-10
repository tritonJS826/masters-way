import { defineConfig } from "cypress";
import dotenv from "dotenv";
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin';
// import fs from "fs-extra";
// import path from "path";

// Load environment variables from .env file
dotenv.config();

const cypressConfig = defineConfig({
  component: {
    retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      runMode: 1,
      // Configure retry attempts for `cypress open`
      // Default is 0
      openMode: 0,
    },
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      // We increased retries to 4 because e2e tests were not stable on macOS 14.2 (23C64)
      runMode: 4,
      // Configure retry attempts for `cypress open`
      // Default is 0
      openMode: 0,
    },
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      config.env = {
        ...config.env,
        ...process.env,
      };

      addMatchImageSnapshotPlugin(on);

    on('before:browser:launch', (browser, launchOptions) => {
      const targetWidth = 1920;
      const targetHeight = 1080;

      // For Electron
      if (browser.name === 'electron') {
        launchOptions.preferences.width = targetWidth;
        launchOptions.preferences.height = targetHeight;
        launchOptions.preferences.resizable = false;
      }
      // For Chrome, Edge, etc. (Chromium)
      else if (browser.family === 'chromium') {
        launchOptions.args.push(`--window-size=${targetWidth},${targetHeight}`);
        launchOptions.args.push('--start-maximized');
      }
      // For Firefox
      else if (browser.family === 'firefox') {
        launchOptions.args.push(`--width=${targetWidth}`);
        launchOptions.args.push(`--height=${targetHeight}`);
      }

      // Дополнительно отключаем автоматическое масштабирование
      // launchOptions.args.push('--force-device-scale-factor=1');
      // launchOptions.args.push('--disable-dev-shm-usage');

      return launchOptions;
    });
      // on('task', {
      //   deleteFolder(folderPath: string) {
      //     const fullPath = path.resolve(folderPath);
      //     if (fs.existsSync(fullPath)) {
      //       fs.removeSync(fullPath);
      //       return true;
      //     }
      //     return false;
      //   },
      // });

      // Load environment variables from .env file
      return config;
    },
  },
});

export default cypressConfig;
