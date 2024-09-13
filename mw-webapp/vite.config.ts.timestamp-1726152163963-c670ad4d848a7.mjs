// vite.config.ts
import react from "file:///home/ekaterina/projects/masters-way/mw-webapp/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.4.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///home/ekaterina/projects/masters-way/mw-webapp/node_modules/.pnpm/vite@5.4.1_@types+node@20.10.0_less@4.2.0_sass@1.70.0/node_modules/vite/dist/node/index.js";
import eslint from "file:///home/ekaterina/projects/masters-way/mw-webapp/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.56.0_vite@5.4.1/node_modules/vite-plugin-eslint/dist/index.mjs";
import viteTsconfigPaths from "file:///home/ekaterina/projects/masters-way/mw-webapp/node_modules/.pnpm/vite-tsconfig-paths@5.0.1_typescript@5.3.3_vite@5.4.1/node_modules/vite-tsconfig-paths/dist/index.js";
import { cleanEnv } from "file:///home/ekaterina/projects/masters-way/mw-webapp/node_modules/.pnpm/envalid@8.0.0/node_modules/envalid/dist/index.js";

// src/utils/env/envSchema.ts
import { str } from "file:///home/ekaterina/projects/masters-way/mw-webapp/node_modules/.pnpm/envalid@8.0.0/node_modules/envalid/dist/index.js";
var envSchema = {
  API_BASE_PATH: str(),
  API_CHAT_BASE_PATH: str(),
  GOOGLE_MEASUREMENT_ID: str(),
  ENV_TYPE: str(),
  AMPLITUDE_KEY: str(),
  API_MW_CHAT_WEBSOCKET_PATH: str()
};

// vite.config.ts
import { VitePWA } from "file:///home/ekaterina/projects/masters-way/mw-webapp/node_modules/.pnpm/vite-plugin-pwa@0.20.1_vite@5.4.1_workbox-build@7.1.1_workbox-window@7.1.0/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig(() => {
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
        }
      ),
      viteTsconfigPaths()
    ],
    define: {
      "process.env": validatedEnvs
    }
  };
  if (isProd) {
    config.plugins.push(
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"]
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
    );
  }
  return config;
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3V0aWxzL2Vudi9lbnZTY2hlbWEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9la2F0ZXJpbmEvcHJvamVjdHMvbWFzdGVycy13YXkvbXctd2ViYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9la2F0ZXJpbmEvcHJvamVjdHMvbWFzdGVycy13YXkvbXctd2ViYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2VrYXRlcmluYS9wcm9qZWN0cy9tYXN0ZXJzLXdheS9tdy13ZWJhcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQge2RlZmluZUNvbmZpZywgbG9hZEVudn0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBlc2xpbnQgZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xuaW1wb3J0IHZpdGVUc2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5pbXBvcnQgeyBjbGVhbkVudiB9IGZyb20gJ2VudmFsaWQnXG5pbXBvcnQgeyBlbnZTY2hlbWEgfSBmcm9tIFwiLi9zcmMvdXRpbHMvZW52L2VudlNjaGVtYVwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihcIlwiLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcbiAgY29uc3QgdmFsaWRhdGVkRW52cyA9IGNsZWFuRW52KGVudiwgZW52U2NoZW1hKTtcblxuICBjb25zdCBpc1Byb2QgPSBlbnYuRU5WX1RZUEUgPT09IFwicHJvZFwiO1xuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxuICAgICAgb3V0RGlyOiBcImJ1aWxkXCIsXG4gICAgICBjYWNoZTogdHJ1ZVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIGVzbGludChcbiAgICAgICAgLy8gRXhjbHVkZSBcInZpcnR1YWxcIiBhbmQgXCJzYi1wcmV2aWV3XCIgdG8gZml4IGJ1ZyB3aXRoIHZpdGUtcGx1Z2luLWVzbGludCBhbmQgU3Rvcnlib29rXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9yeWJvb2tqcy9idWlsZGVyLXZpdGUvaXNzdWVzLzUzNSNpc3N1ZWNvbW1lbnQtMTUwNzM1MjU1MFxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUvaXNzdWVzLzE1Mzc0XG4gICAgICAgIHtcbiAgICAgICAgICBleGNsdWRlOiBbXCIvdmlydHVhbDovKipcIiwgXCIvc2ItcHJldmlldy8qKlwiXSwgXG4gICAgICAgICAgZmFpbE9uRXJyb3I6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICAgdml0ZVRzY29uZmlnUGF0aHMoKSxcbiAgICBdLFxuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52JzogdmFsaWRhdGVkRW52cyxcbiAgICB9LFxuICB9O1xuXG4gIC8vIHRoZXJlIHdhcyBpc3N1ZXMgd2l0aCBjeXByZXNzIGUyZSB0ZXN0aW5nIHdoZW4gdGhpcyBwbHVnaW4gaXMgaW4gcGx1Z2lucyBsaXN0XG4gIC8vIHNvIGkgbW92ZWQgaXQgb25seSBmb3IgcHJvZCBtb2RlXG4gIC8vIGhvcGUgd2Ugd2lsbCBmaXggaXQgb25lIGRheVxuICBpZiAoaXNQcm9kKSB7XG4gICAgY29uZmlnLnBsdWdpbnMucHVzaChcbiAgICAgIFZpdGVQV0Eoe1xuICAgICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLnN2ZycsICdmYXZpY29uLmljbycsICdyb2JvdHMudHh0JywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJ10sXG4gICAgICAgIC8vIG1hbmlmZXN0OiB7XG4gICAgICAgIC8vICAgbmFtZTogJ015IEFwcCcsXG4gICAgICAgIC8vICAgc2hvcnRfbmFtZTogJ015QXBwJyxcbiAgICAgICAgLy8gICBkZXNjcmlwdGlvbjogJ015IGF3ZXNvbWUgYXBwJyxcbiAgICAgICAgLy8gICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAvLyAgIGljb25zOiBbXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgIC8vICAgICAgIHNyYzogJ3B3YS0xOTJ4MTkyLnBuZycsXG4gICAgICAgIC8vICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgIC8vICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgICAgc3JjOiAncHdhLTUxMng1MTIucG5nJyxcbiAgICAgICAgLy8gICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgLy8gICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgIF0sXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIHdvcmtib3g6IHtcbiAgICAgICAgLy8gICAvLyBcdTA0MTVcdTA0NDFcdTA0M0JcdTA0MzggXHUwNDNEXHUwNDQzXHUwNDM2XHUwNDNEXHUwNDNFLCBcdTA0MzJcdTA0NEIgXHUwNDNDXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzOFx1MDQzN1x1MDQzOFx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0M0VcdTA0NDBcdTA0M0FcdTA0MzVcdTA0NDAsIFx1MDQzOFx1MDQ0MVx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0Q1x1MDQzN1x1MDQ0M1x1MDQ0RiBXb3JrYm94XG4gICAgICAgIC8vICAgLy8gXHUwNDFEXHUwNDMwXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNDXHUwNDM1XHUwNDQwLCBcdTA0M0NcdTA0M0VcdTA0MzZcdTA0MzVcdTA0NDJcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQzNVx1MDQzM1x1MDQzOFx1MDQzOCBcdTA0M0FcdTA0NERcdTA0NDhcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM4IFx1MDQzNFx1MDQ0MFx1MDQ0M1x1MDQzM1x1MDQzOFx1MDQzNSBcdTA0M0ZcdTA0MzBcdTA0NDBcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NDBcdTA0NEIuXG4gICAgICAgIC8vIH1cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZztcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9la2F0ZXJpbmEvcHJvamVjdHMvbWFzdGVycy13YXkvbXctd2ViYXBwL3NyYy91dGlscy9lbnZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2VrYXRlcmluYS9wcm9qZWN0cy9tYXN0ZXJzLXdheS9tdy13ZWJhcHAvc3JjL3V0aWxzL2Vudi9lbnZTY2hlbWEudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZWthdGVyaW5hL3Byb2plY3RzL21hc3RlcnMtd2F5L213LXdlYmFwcC9zcmMvdXRpbHMvZW52L2VudlNjaGVtYS50c1wiO2ltcG9ydCB7c3RyfSBmcm9tIFwiZW52YWxpZFwiO1xuXG5leHBvcnQgY29uc3QgZW52U2NoZW1hID0ge1xuICBBUElfQkFTRV9QQVRIOiBzdHIoKSxcbiAgQVBJX0NIQVRfQkFTRV9QQVRIOiBzdHIoKSxcbiAgR09PR0xFX01FQVNVUkVNRU5UX0lEOiBzdHIoKSxcbiAgRU5WX1RZUEU6IHN0cigpLFxuICBBTVBMSVRVREVfS0VZOiBzdHIoKSxcbiAgQVBJX01XX0NIQVRfV0VCU09DS0VUX1BBVEg6IHN0cigpLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsT0FBTyxXQUFXO0FBQzlVLFNBQVEsY0FBYyxlQUFjO0FBQ3BDLE9BQU8sWUFBWTtBQUNuQixPQUFPLHVCQUF1QjtBQUM5QixTQUFTLGdCQUFnQjs7O0FDSnlVLFNBQVEsV0FBVTtBQUU3VyxJQUFNLFlBQVk7QUFBQSxFQUN2QixlQUFlLElBQUk7QUFBQSxFQUNuQixvQkFBb0IsSUFBSTtBQUFBLEVBQ3hCLHVCQUF1QixJQUFJO0FBQUEsRUFDM0IsVUFBVSxJQUFJO0FBQUEsRUFDZCxlQUFlLElBQUk7QUFBQSxFQUNuQiw0QkFBNEIsSUFBSTtBQUNsQzs7O0FESEEsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYSxNQUFNO0FBQ2hDLFFBQU0sTUFBTSxRQUFRLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUN6QyxRQUFNLGdCQUFnQixTQUFTLEtBQUssU0FBUztBQUU3QyxRQUFNLFNBQVMsSUFBSSxhQUFhO0FBRWhDLFFBQU0sU0FBUztBQUFBLElBQ2IsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJRTtBQUFBLFVBQ0UsU0FBUyxDQUFDLGdCQUFnQixnQkFBZ0I7QUFBQSxVQUMxQyxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixlQUFlO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBS0EsTUFBSSxRQUFRO0FBQ1YsV0FBTyxRQUFRO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsUUFDZCxlQUFlLENBQUMsZUFBZSxlQUFlLGNBQWMsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQXVCcEYsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNULENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
