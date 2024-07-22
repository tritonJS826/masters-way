import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import * as amplitude from "@amplitude/analytics-browser";
import {sessionReplayPlugin} from "@amplitude/plugin-session-replay-browser";
import {App} from "src/App";
import {reportWebVitals} from "src/reportWebVitals";
import {env} from "src/utils/env/env";
import "src/index.scss";

if (env.ENV_TYPE === "prod") {
  ReactGA.initialize(env.GOOGLE_MEASUREMENT_ID);
  amplitude.init(env.AMPLITUDE_KEY, {defaultTracking: true});
  const sessionReplayTracking = sessionReplayPlugin();
  amplitude.add(sessionReplayTracking);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// To log results (for example: reportWebVitals(console.log))
// Or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
