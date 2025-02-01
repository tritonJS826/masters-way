import { defineConfig } from "cypress";
import dotenv from "dotenv";

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

      // Load environment variables from .env file
      return config;
    },
  },
});

export default cypressConfig;
