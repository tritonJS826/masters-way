import {useEffect} from "react";
import {env} from "src/utils/env/env";

/**
 * Hook activate amplitude analytics on the prod
 */
export const useAmplitudeActivate = () => {
  useEffect(() => {
    if (env.ENV_TYPE === "prod") {
      const addAnalyticsAmplitudeBrowserSDKScript = document.createElement("script");
      addAnalyticsAmplitudeBrowserSDKScript.src = "https://cdn.amplitude.com/libs/analytics-browser-2.9.0-min.js.gz";
      addAnalyticsAmplitudeBrowserSDKScript.async = true;
      document.head.appendChild(addAnalyticsAmplitudeBrowserSDKScript);

      const replaySessionAmplitudePluginScript = document.createElement("script");
      replaySessionAmplitudePluginScript.src = "https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.4.0-min.js.gz";
      replaySessionAmplitudePluginScript.async = true;
      document.head.appendChild(replaySessionAmplitudePluginScript);

      const key = env.AMPLITUDE_KEY;

      const initAmplitudeScript = document.createElement("script");
      initAmplitudeScript.text = `
          const sessionReplayTracking = window.sessionReplay.plugin();
          window.amplitude.add(sessionReplayTracking);
          window.amplitude.init(${key});
      `;
      document.head.appendChild(initAmplitudeScript);
    }
  }, []);
};
