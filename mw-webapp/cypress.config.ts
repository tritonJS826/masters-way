import { defineConfig } from "cypress";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const cypressConfig =  defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here

      config.env = {
        ...config.env,
        ...process.env
      };

      // Load environment variables from .env file
      return config;
    },
  },
});

export default cypressConfig;